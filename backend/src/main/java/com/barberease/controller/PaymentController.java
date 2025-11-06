package com.barberease.controller;

import com.barberease.model.Payment;
import com.barberease.service.PaymentService;
import com.barberease.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {
    
    @Autowired
    private PaymentService paymentService;
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/create-order")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> createOrder(@RequestBody Map<String, Object> request) {
        try {
            String bookingId = (String) request.get("bookingId");
            Double amount = ((Number) request.get("amount")).doubleValue();
            
            String orderId = paymentService.createRazorpayOrder(bookingId, amount);
            
            Map<String, String> response = new HashMap<>();
            response.put("orderId", orderId);
            response.put("amount", String.valueOf(amount));
            response.put("currency", "INR");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PostMapping("/verify")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> verifyPayment(@RequestBody Map<String, String> request) {
        String orderId = request.get("orderId");
        String paymentId = request.get("paymentId");
        String signature = request.get("signature");
        
        boolean isValid = paymentService.verifyPayment(orderId, paymentId, signature);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", isValid);
        response.put("message", isValid ? "Payment verified successfully" : "Payment verification failed");
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/booking/{bookingId}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN') or hasRole('SHOP_OWNER')")
    public ResponseEntity<Payment> getPaymentByBooking(@PathVariable String bookingId) {
        Payment payment = paymentService.getPaymentByBookingId(bookingId);
        return ResponseEntity.ok(payment);
    }
    
    @GetMapping("/user")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    public ResponseEntity<List<Payment>> getUserPayments() {
        String userId = authService.getCurrentUser().getId();
        List<Payment> payments = paymentService.getPaymentsByUser(userId);
        return ResponseEntity.ok(payments);
    }
    
    @PostMapping("/{paymentId}/refund")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP_OWNER')")
    public ResponseEntity<Payment> refundPayment(@PathVariable String paymentId) {
        Payment payment = paymentService.refundPayment(paymentId);
        return ResponseEntity.ok(payment);
    }
}

