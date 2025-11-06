package com.barberease.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "bookings")
public class Booking {
    @Id
    private String id;
    
    @Field("shop_id")
    private String shopId;
    
    @Field("staff_id")
    private String staffId;
    
    @Field("user_id")
    private String userId;
    
    @Field("service_id")
    private String serviceId;
    
    @NotNull(message = "Appointment date and time is required")
    private LocalDateTime appointmentDateTime;
    
    private BookingStatus status;
    private String notes;
    
    // Payment information
    private String paymentId;
    private Double advanceAmount;
    private Double totalAmount;
    private PaymentStatus paymentStatus;
    
    // Notification status
    private boolean notificationSent = false;
    private LocalDateTime notificationSentAt;
    
    // Cancellation information
    private String cancellationReason;
    private LocalDateTime cancelledAt;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public enum BookingStatus {
        PENDING,
        CONFIRMED,
        IN_PROGRESS,
        COMPLETED,
        CANCELLED,
        NO_SHOW
    }
    
    public enum PaymentStatus {
        PENDING,
        COMPLETED,
        FAILED,
        REFUNDED
    }
    
    // Constructors
    public Booking() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.status = BookingStatus.PENDING;
        this.paymentStatus = PaymentStatus.PENDING;
    }
    
    public Booking(String shopId, String staffId, String userId, String serviceId, LocalDateTime appointmentDateTime) {
        this();
        this.shopId = shopId;
        this.staffId = staffId;
        this.userId = userId;
        this.serviceId = serviceId;
        this.appointmentDateTime = appointmentDateTime;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getShopId() {
        return shopId;
    }
    
    public void setShopId(String shopId) {
        this.shopId = shopId;
    }
    
    public String getStaffId() {
        return staffId;
    }
    
    public void setStaffId(String staffId) {
        this.staffId = staffId;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public String getServiceId() {
        return serviceId;
    }
    
    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }
    
    public LocalDateTime getAppointmentDateTime() {
        return appointmentDateTime;
    }
    
    public void setAppointmentDateTime(LocalDateTime appointmentDateTime) {
        this.appointmentDateTime = appointmentDateTime;
    }
    
    public BookingStatus getStatus() {
        return status;
    }
    
    public void setStatus(BookingStatus status) {
        this.status = status;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
    
    public String getPaymentId() {
        return paymentId;
    }
    
    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }
    
    public Double getAdvanceAmount() {
        return advanceAmount;
    }
    
    public void setAdvanceAmount(Double advanceAmount) {
        this.advanceAmount = advanceAmount;
    }
    
    public Double getTotalAmount() {
        return totalAmount;
    }
    
    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }
    
    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }
    
    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
    
    public boolean isNotificationSent() {
        return notificationSent;
    }
    
    public void setNotificationSent(boolean notificationSent) {
        this.notificationSent = notificationSent;
    }
    
    public LocalDateTime getNotificationSentAt() {
        return notificationSentAt;
    }
    
    public void setNotificationSentAt(LocalDateTime notificationSentAt) {
        this.notificationSentAt = notificationSentAt;
    }
    
    public String getCancellationReason() {
        return cancellationReason;
    }
    
    public void setCancellationReason(String cancellationReason) {
        this.cancellationReason = cancellationReason;
    }
    
    public LocalDateTime getCancelledAt() {
        return cancelledAt;
    }
    
    public void setCancelledAt(LocalDateTime cancelledAt) {
        this.cancelledAt = cancelledAt;
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

