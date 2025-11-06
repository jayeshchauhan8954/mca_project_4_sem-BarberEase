package com.barberease.dto;

import com.barberease.model.Service;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ServiceDto {
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
    private Integer bufferTimeMinutes;
    
    private Service.ServiceCategory category;
    
    // Constructors
    public ServiceDto() {}
    
    public ServiceDto(String name, Integer durationMinutes, Double price) {
        this.name = name;
        this.durationMinutes = durationMinutes;
        this.price = price;
    }
    
    // Getters and Setters
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
    
    public Service.ServiceCategory getCategory() {
        return category;
    }
    
    public void setCategory(Service.ServiceCategory category) {
        this.category = category;
    }
}

