package com.barberease.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDateTime;

@Document(collection = "services")
public class Service {
    @Id
    private String id;
    
    @NotBlank(message = "Service name is required")
    private String name;
    
    private String description;
    
    @NotNull(message = "Duration is required")
    @Positive(message = "Duration must be positive")
    private Integer durationMinutes;
    
    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private Double price;
    
    @Positive(message = "Buffer time must be positive")
    private Integer bufferTimeMinutes = 5; // Default 5 minutes
    
    // Shop reference
    private String shopId;
    
    // Category
    private ServiceCategory category;
    
    private boolean active = true;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public enum ServiceCategory {
        HAIRCUT,
        BEARD_TRIM,
        SHAVE,
        STYLING,
        COLORING,
        TREATMENT,
        OTHER
    }
    
    // Constructors
    public Service() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public Service(String name, String description, Integer durationMinutes, Double price, String shopId) {
        this();
        this.name = name;
        this.description = description;
        this.durationMinutes = durationMinutes;
        this.price = price;
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
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Integer getDurationMinutes() {
        return durationMinutes;
    }
    
    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }
    
    public Double getPrice() {
        return price;
    }
    
    public void setPrice(Double price) {
        this.price = price;
    }
    
    public Integer getBufferTimeMinutes() {
        return bufferTimeMinutes;
    }
    
    public void setBufferTimeMinutes(Integer bufferTimeMinutes) {
        this.bufferTimeMinutes = bufferTimeMinutes;
    }
    
    public String getShopId() {
        return shopId;
    }
    
    public void setShopId(String shopId) {
        this.shopId = shopId;
    }
    
    public ServiceCategory getCategory() {
        return category;
    }
    
    public void setCategory(ServiceCategory category) {
        this.category = category;
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

