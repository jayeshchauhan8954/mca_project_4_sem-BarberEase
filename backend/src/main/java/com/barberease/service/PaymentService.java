package com.barberease.service;

import com.barberease.model.Booking;
import com.barberease.model.Payment;
import com.barberease.repository.BookingRepository;
import com.barberease.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Value("${razorpay.key-id:}")
    private String razorpayKeyId;
    
    @Value("${razorpay.key-secret:}")
    private String razorpayKeySecret;
    
    public Payment createPayment(String bookingId, String userId, Double amount) {
        Payment payment = new Payment();
        payment.setBookingId(bookingId);
        payment.setUserId(userId);
        payment.setAmount(amount);
        payment.setMethod(Payment.PaymentMethod.RAZORPAY);
        payment.setStatus(Payment.PaymentStatus.PENDING);
        payment.setCreatedAt(LocalDateTime.now());
        payment.setUpdatedAt(LocalDateTime.now());
        
        return paymentRepository.save(payment);
    }
    
    public String createRazorpayOrder(String bookingId, Double amount) throws RazorpayException {
        if (razorpayKeyId == null || razorpayKeyId.isEmpty() || 
            razorpayKeyId.startsWith("rzp_test_your")) {
            // Mock order ID for development
            return "order_mock_" + System.currentTimeMillis();
        }
        
        try {
            RazorpayClient client = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", (int)(amount * 100)); // Amount in paise
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "booking_" + bookingId);
            
            Order order = client.orders.create(orderRequest);
            
            // Update payment record
            Payment payment = paymentRepository.findByBookingId(bookingId)
                    .orElseGet(() -> createPayment(bookingId, "", amount));
            payment.setRazorpayOrderId(order.get("id"));
            payment.setStatus(Payment.PaymentStatus.PROCESSING);
            payment.setUpdatedAt(LocalDateTime.now());
            paymentRepository.save(payment);
            
            return order.get("id");
        } catch (Exception e) {
            throw new RazorpayException("Failed to create Razorpay order: " + e.getMessage());
        }
    }
    
    public boolean verifyPayment(String orderId, String paymentId, String signature) {
        if (razorpayKeyId == null || razorpayKeyId.isEmpty() || 
            razorpayKeyId.startsWith("rzp_test_your")) {
            // Mock verification for development
            return true;
        }
        
        try {
            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", orderId);
            options.put("razorpay_payment_id", paymentId);
            options.put("razorpay_signature", signature);
            
            boolean isValid = Utils.verifyPaymentSignature(options, razorpayKeySecret);
            
            if (isValid) {
                Payment payment = paymentRepository.findByRazorpayOrderId(orderId)
                        .orElseThrow(() -> new RuntimeException("Payment not found"));
                
                payment.setRazorpayPaymentId(paymentId);
                payment.setRazorpaySignature(signature);
                payment.setStatus(Payment.PaymentStatus.COMPLETED);
                payment.setUpdatedAt(LocalDateTime.now());
                paymentRepository.save(payment);
                
                // Update booking status
                Booking booking = bookingRepository.findById(payment.getBookingId())
                        .orElseThrow(() -> new RuntimeException("Booking not found"));
                booking.setPaymentStatus(Booking.PaymentStatus.COMPLETED);
                booking.setPaymentId(payment.getId());
                booking.setStatus(Booking.BookingStatus.CONFIRMED);
                booking.setUpdatedAt(LocalDateTime.now());
                bookingRepository.save(booking);
            }
            
            return isValid;
        } catch (Exception e) {
            return false;
        }
    }
    
    public Payment getPaymentByBookingId(String bookingId) {
        return paymentRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new RuntimeException("Payment not found for booking"));
    }
    
    public List<Payment> getPaymentsByUser(String userId) {
        return paymentRepository.findByUserId(userId);
    }
    
    public Payment refundPayment(String paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        
        payment.setStatus(Payment.PaymentStatus.REFUNDED);
        payment.setUpdatedAt(LocalDateTime.now());
        
        return paymentRepository.save(payment);
    }
}

