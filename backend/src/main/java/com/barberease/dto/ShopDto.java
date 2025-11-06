package com.barberease.dto;

import com.barberease.model.Shop;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ShopDto {
    @NotBlank(message = "Shop name is required")
    @Size(min = 2, max = 100, message = "Shop name must be between 2 and 100 characters")
    private String name;
    
    @NotBlank(message = "Address is required")
    private String address;
    
    @NotBlank(message = "Phone is required")
    private String phone;
    
    @Email(message = "Email should be valid")
    private String email;
    
    private String description;
    private Shop.BusinessHours businessHours;
    private Shop.ShopSettings settings;
    
    // Constructors
    public ShopDto() {}
    
    public ShopDto(String name, String address, String phone) {
        this.name = name;
        this.address = address;
        this.phone = phone;
    }
    
    // Getters and Setters
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
    
    public Shop.BusinessHours getBusinessHours() {
        return businessHours;
    }
    
    public void setBusinessHours(Shop.BusinessHours businessHours) {
        this.businessHours = businessHours;
    }
    
    public Shop.ShopSettings getSettings() {
        return settings;
    }
    
    public void setSettings(Shop.ShopSettings settings) {
        this.settings = settings;
    }
}

