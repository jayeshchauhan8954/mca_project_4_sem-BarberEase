package com.barberease.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDateTime;

@Document(collection = "payments")
public class Payment {
    @Id
    private String id;
    
    @Field("booking_id")
    private String bookingId;
    
    @Field("user_id")
    private String userId;
    
    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private Double amount;
    
    private PaymentMethod method;
    private PaymentStatus status;
    private String transactionId;
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
    
    // Payment gateway response
    private String gatewayResponse;
    private String failureReason;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public enum PaymentMethod {
        RAZORPAY,
        PAYTM,
        CASH,
        CARD
    }
    
    public enum PaymentStatus {
        PENDING,
        PROCESSING,
        COMPLETED,
        FAILED,
        CANCELLED,
        REFUNDED
    }
    
    // Constructors
    public Payment() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.status = PaymentStatus.PENDING;
    }
    
    public Payment(String bookingId, String userId, Double amount, PaymentMethod method) {
        this();
        this.bookingId = bookingId;
        this.userId = userId;
        this.amount = amount;
        this.method = method;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getBookingId() {
        return bookingId;
    }
    
    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public Double getAmount() {
        return amount;
    }
    
    public void setAmount(Double amount) {
        this.amount = amount;
    }
    
    public PaymentMethod getMethod() {
        return method;
    }
    
    public void setMethod(PaymentMethod method) {
        this.method = method;
    }
    
    public PaymentStatus getStatus() {
        return status;
    }
    
    public void setStatus(PaymentStatus status) {
        this.status = status;
    }
    
    public String getTransactionId() {
        return transactionId;
    }
    
    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
    
    public String getRazorpayOrderId() {
        return razorpayOrderId;
    }
    
    public void setRazorpayOrderId(String razorpayOrderId) {
        this.razorpayOrderId = razorpayOrderId;
    }
    
    public String getRazorpayPaymentId() {
        return razorpayPaymentId;
    }
    
    public void setRazorpayPaymentId(String razorpayPaymentId) {
        this.razorpayPaymentId = razorpayPaymentId;
    }
    
    public String getRazorpaySignature() {
        return razorpaySignature;
    }
    
    public void setRazorpaySignature(String razorpaySignature) {
        this.razorpaySignature = razorpaySignature;
    }
    
    public String getGatewayResponse() {
        return gatewayResponse;
    }
    
    public void setGatewayResponse(String gatewayResponse) {
        this.gatewayResponse = gatewayResponse;
    }
    
    public String getFailureReason() {
        return failureReason;
    }
    
    public void setFailureReason(String failureReason) {
        this.failureReason = failureReason;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}

