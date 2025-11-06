package com.barberease.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "shops")
public class Shop {
    @Id
    private String id;
    
    @NotBlank(message = "Shop name is required")
    @Size(min = 2, max = 100)
    private String name;
    
    @NotBlank(message = "Address is required")
    private String address;
    
    @NotBlank(message = "Phone is required")
    private String phone;
    
    private String email;
    private String description;
    
    // Business hours
    private BusinessHours businessHours;
    
    // Shop settings
    private ShopSettings settings;
    
    // Owner information
    @Field("owner_id")
    private String ownerId;
    
    // Staff list
    private List<String> staffIds;
    
    private boolean active = true;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Inner classes for nested objects
    public static class BusinessHours {
        private String monday;
        private String tuesday;
        private String wednesday;
        private String thursday;
        private String friday;
        private String saturday;
        private String sunday;
        
        // Constructors
        public BusinessHours() {}
        
        // Getters and Setters
        public String getMonday() { return monday; }
        public void setMonday(String monday) { this.monday = monday; }
        
        public String getTuesday() { return tuesday; }
        public void setTuesday(String tuesday) { this.tuesday = tuesday; }
        
        public String getWednesday() { return wednesday; }
        public void setWednesday(String wednesday) { this.wednesday = wednesday; }
        
        public String getThursday() { return thursday; }
        public void setThursday(String thursday) { this.thursday = thursday; }
        
        public String getFriday() { return friday; }
        public void setFriday(String friday) { this.friday = friday; }
        
        public String getSaturday() { return saturday; }
        public void setSaturday(String saturday) { this.saturday = saturday; }
        
        public String getSunday() { return sunday; }
        public void setSunday(String sunday) { this.sunday = sunday; }
    }
    
    public static class ShopSettings {
        private int advancePaymentPercentage = 20; // Default 20%
        private int slotDurationMinutes = 30;
        private int bufferTimeMinutes = 5;
        private boolean allowOnlineBooking = true;
        private int maxAdvanceBookingDays = 30;
        
        // Constructors
        public ShopSettings() {}
        
        // Getters and Setters
        public int getAdvancePaymentPercentage() { return advancePaymentPercentage; }
        public void setAdvancePaymentPercentage(int advancePaymentPercentage) { 
            this.advancePaymentPercentage = advancePaymentPercentage; 
        }
        
        public int getSlotDurationMinutes() { return slotDurationMinutes; }
        public void setSlotDurationMinutes(int slotDurationMinutes) { 
            this.slotDurationMinutes = slotDurationMinutes; 
        }
        
        public int getBufferTimeMinutes() { return bufferTimeMinutes; }
        public void setBufferTimeMinutes(int bufferTimeMinutes) { 
            this.bufferTimeMinutes = bufferTimeMinutes; 
        }
        
        public boolean isAllowOnlineBooking() { return allowOnlineBooking; }
        public void setAllowOnlineBooking(boolean allowOnlineBooking) { 
            this.allowOnlineBooking = allowOnlineBooking; 
        }
        
        public int getMaxAdvanceBookingDays() { return maxAdvanceBookingDays; }
        public void setMaxAdvanceBookingDays(int maxAdvanceBookingDays) { 
            this.maxAdvanceBookingDays = maxAdvanceBookingDays; 
        }
    }
    
    // Constructors
    public Shop() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.settings = new ShopSettings();
        this.businessHours = new BusinessHours();
    }
    
    public Shop(String name, String address, String phone, String ownerId) {
        this();
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.ownerId = ownerId;
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
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
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
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public BusinessHours getBusinessHours() {
        return businessHours;
    }
    
    public void setBusinessHours(BusinessHours businessHours) {
        this.businessHours = businessHours;
    }
    
    public ShopSettings getSettings() {
        return settings;
    }
    
    public void setSettings(ShopSettings settings) {
        this.settings = settings;
    }
    
    public String getOwnerId() {
        return ownerId;
    }
    
    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }
    
    public List<String> getStaffIds() {
        return staffIds;
    }
    
    public void setStaffIds(List<String> staffIds) {
        this.staffIds = staffIds;
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

