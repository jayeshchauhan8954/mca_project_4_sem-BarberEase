package com.barberease.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Document(collection = "notifications")
public class Notification {
    @Id
    private String id;
    
    @Field("user_id")
    private String userId;
    
    @Field("booking_id")
    private String bookingId;
    
    @NotBlank(message = "Message is required")
    private String message;
    
    private NotificationType type;
    private NotificationChannel channel;
    private NotificationStatus status;
    
    private String recipientEmail;
    private String recipientPhone;
    private String recipientWhatsApp;
    
    // Delivery tracking
    private LocalDateTime sentAt;
    private LocalDateTime deliveredAt;
    private String deliveryResponse;
    private String failureReason;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public enum NotificationType {
        BOOKING_CONFIRMED,
        BOOKING_REMINDER,
        BOOKING_CANCELLED,
        PAYMENT_SUCCESS,
        PAYMENT_FAILED,
        APPOINTMENT_REMINDER,
        STAFF_ASSIGNED,
        GENERAL
    }
    
    public enum NotificationChannel {
        EMAIL,
        SMS,
        WHATSAPP,
        PUSH_NOTIFICATION,
        WEB_NOTIFICATION
    }
    
    public enum NotificationStatus {
        PENDING,
        SENT,
        DELIVERED,
        FAILED,
        CANCELLED
    }
    
    // Constructors
    public Notification() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.status = NotificationStatus.PENDING;
    }
    
    public Notification(String userId, String bookingId, String message, NotificationType type, NotificationChannel channel) {
        this();
        this.userId = userId;
        this.bookingId = bookingId;
        this.message = message;
        this.type = type;
        this.channel = channel;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public String getBookingId() {
        return bookingId;
    }
    
    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public NotificationType getType() {
        return type;
    }
    
    public void setType(NotificationType type) {
        this.type = type;
    }
    
    public NotificationChannel getChannel() {
        return channel;
    }
    
    public void setChannel(NotificationChannel channel) {
        this.channel = channel;
    }
    
    public NotificationStatus getStatus() {
        return status;
    }
    
    public void setStatus(NotificationStatus status) {
        this.status = status;
    }
    
    public String getRecipientEmail() {
        return recipientEmail;
    }
    
    public void setRecipientEmail(String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }
    
    public String getRecipientPhone() {
        return recipientPhone;
    }
    
    public void setRecipientPhone(String recipientPhone) {
        this.recipientPhone = recipientPhone;
    }
    
    public String getRecipientWhatsApp() {
        return recipientWhatsApp;
    }
    
    public void setRecipientWhatsApp(String recipientWhatsApp) {
        this.recipientWhatsApp = recipientWhatsApp;
    }
    
    public LocalDateTime getSentAt() {
        return sentAt;
    }
    
    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }
    
    public LocalDateTime getDeliveredAt() {
        return deliveredAt;
    }
    
    public void setDeliveredAt(LocalDateTime deliveredAt) {
        this.deliveredAt = deliveredAt;
    }
    
    public String getDeliveryResponse() {
        return deliveryResponse;
    }
    
    public void setDeliveryResponse(String deliveryResponse) {
        this.deliveryResponse = deliveryResponse;
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

