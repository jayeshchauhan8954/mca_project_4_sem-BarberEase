package com.barberease.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Document(collection = "staff")
public class Staff {
    @Id
    private String id;
    
    @NotBlank(message = "Staff name is required")
    @Size(min = 2, max = 50)
    private String name;
    
    @NotBlank(message = "Phone is required")
    private String phone;
    
    private String email;
    private String specialization;
    private String profileImage;
    
    // Shop reference
    @Field("shop_id")
    private String shopId;
    
    // User reference
    @Field("user_id")
    private String userId;
    
    // Availability schedule (day of week -> time slots)
    private Map<String, List<TimeSlot>> availability;
    
    // Services offered by this staff member
    private List<String> serviceIds;
    
    // Rating and reviews
    private double rating = 0.0;
    private int totalReviews = 0;
    
    private boolean active = true;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Inner class for time slots
    public static class TimeSlot {
        private String startTime;
        private String endTime;
        private boolean available = true;
        
        public TimeSlot() {}
        
        public TimeSlot(String startTime, String endTime) {
            this.startTime = startTime;
            this.endTime = endTime;
        }
        
        // Getters and Setters
        public String getStartTime() { return startTime; }
        public void setStartTime(String startTime) { this.startTime = startTime; }
        
        public String getEndTime() { return endTime; }
        public void setEndTime(String endTime) { this.endTime = endTime; }
        
        public boolean isAvailable() { return available; }
        public void setAvailable(boolean available) { this.available = available; }
    }
    
    // Constructors
    public Staff() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public Staff(String name, String phone, String shopId) {
        this();
        this.name = name;
        this.phone = phone;
        this.shopId = shopId;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getSpecialization() {
        return specialization;
    }
    
    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
    
    public String getProfileImage() {
        return profileImage;
    }
    
    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
    
    public String getShopId() {
        return shopId;
    }
    
    public void setShopId(String shopId) {
        this.shopId = shopId;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public Map<String, List<TimeSlot>> getAvailability() {
        return availability;
    }
    
    public void setAvailability(Map<String, List<TimeSlot>> availability) {
        this.availability = availability;
    }
    
    public List<String> getServiceIds() {
        return serviceIds;
    }
    
    public void setServiceIds(List<String> serviceIds) {
        this.serviceIds = serviceIds;
    }
    
    public double getRating() {
        return rating;
    }
    
    public void setRating(double rating) {
        this.rating = rating;
    }
    
    public int getTotalReviews() {
        return totalReviews;
    }
    
    public void setTotalReviews(int totalReviews) {
        this.totalReviews = totalReviews;
    }
    
    public boolean isActive() {
        return active;
    }
    
    public void setActive(boolean active) {
        this.active = active;
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

