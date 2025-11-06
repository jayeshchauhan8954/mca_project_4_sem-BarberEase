package com.barberease.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class BookingRequest {
    @NotNull(message = "Shop ID is required")
    private String shopId;
    
    @NotNull(message = "Staff ID is required")
    private String staffId;
    
    @NotNull(message = "Service ID is required")
    private String serviceId;
    
    @NotNull(message = "Appointment date and time is required")
    private LocalDateTime appointmentDateTime;
    
    private String notes;
    
    // Constructors
    public BookingRequest() {}
    
    public BookingRequest(String shopId, String staffId, String serviceId, LocalDateTime appointmentDateTime) {
        this.shopId = shopId;
        this.staffId = staffId;
        this.serviceId = serviceId;
        this.appointmentDateTime = appointmentDateTime;
    }
    
    // Getters and Setters
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
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
}

