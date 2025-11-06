package com.barberease.service;

import com.barberease.dto.BookingRequest;
import com.barberease.model.Booking;
import com.barberease.model.Service;
import com.barberease.repository.BookingRepository;
import com.barberease.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private ServiceRepository serviceRepository;
    
    @Autowired
    private NotificationService notificationService;
    
    public Booking createBooking(BookingRequest bookingRequest, String userId) {
        // Get service details for pricing
        com.barberease.model.Service service = serviceRepository.findById(bookingRequest.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service not found"));
        
        // Check for conflicts
        List<Booking> conflicts = bookingRepository.findActiveBookingsByStaffAndDateRange(
                bookingRequest.getStaffId(),
                bookingRequest.getAppointmentDateTime(),
                bookingRequest.getAppointmentDateTime().plusMinutes(service.getDurationMinutes())
        );
        
        if (!conflicts.isEmpty()) {
            throw new RuntimeException("Time slot is already booked");
        }
        
        Booking booking = new Booking();
        booking.setShopId(bookingRequest.getShopId());
        booking.setStaffId(bookingRequest.getStaffId());
        booking.setUserId(userId);
        booking.setServiceId(bookingRequest.getServiceId());
        booking.setAppointmentDateTime(bookingRequest.getAppointmentDateTime());
        booking.setNotes(bookingRequest.getNotes());
        booking.setTotalAmount(service.getPrice());
        booking.setStatus(Booking.BookingStatus.PENDING);
        booking.setPaymentStatus(Booking.PaymentStatus.PENDING);
        booking.setCreatedAt(LocalDateTime.now());
        booking.setUpdatedAt(LocalDateTime.now());
        
        Booking savedBooking = bookingRepository.save(booking);
        
        // Send notification
        try {
            notificationService.sendBookingConfirmation(savedBooking);
        } catch (Exception e) {
            // Log error but don't fail booking creation
            System.err.println("Failed to send notification: " + e.getMessage());
        }
        
        return savedBooking;
    }
    
    public List<Booking> getBookingsByUser(String userId) {
        return bookingRepository.findByUserId(userId);
    }
    
    public Booking getBookingById(String id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
    }
    
    public Booking cancelBooking(String id, String reason) {
        Booking booking = getBookingById(id);
        booking.setStatus(Booking.BookingStatus.CANCELLED);
        booking.setCancellationReason(reason);
        booking.setCancelledAt(LocalDateTime.now());
        booking.setUpdatedAt(LocalDateTime.now());
        
        Booking savedBooking = bookingRepository.save(booking);
        
        // Send cancellation notification
        try {
            notificationService.sendBookingCancellation(savedBooking);
        } catch (Exception e) {
            System.err.println("Failed to send cancellation notification: " + e.getMessage());
        }
        
        return savedBooking;
    }
    
    public Booking updateBookingStatus(String id, Booking.BookingStatus status) {
        Booking booking = getBookingById(id);
        booking.setStatus(status);
        booking.setUpdatedAt(LocalDateTime.now());
        return bookingRepository.save(booking);
    }
    
    public List<Booking> getBookingsByShop(String shopId, LocalDateTime startDate, LocalDateTime endDate) {
        if (startDate != null && endDate != null) {
            return bookingRepository.findByShopIdAndAppointmentDateTimeBetween(shopId, startDate, endDate);
        }
        return bookingRepository.findByShopId(shopId);
    }
    
    public List<Booking> getBookingsByStaff(String staffId, LocalDateTime startDate, LocalDateTime endDate) {
        if (startDate != null && endDate != null) {
            return bookingRepository.findByStaffIdAndAppointmentDateTimeBetween(staffId, startDate, endDate);
        }
        return bookingRepository.findByStaffId(staffId);
    }
    
    public List<LocalDateTime> getAvailableSlots(String shopId, String staffId, String serviceId, LocalDateTime date) {
        // Get service duration
        com.barberease.model.Service service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("Service not found"));
        
        int serviceDuration = service.getDurationMinutes() + service.getBufferTimeMinutes();
        
        // Get existing bookings for the day
        LocalDateTime startOfDay = date.toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = date.toLocalDate().atTime(23, 59, 59);
        
        List<Booking> existingBookings = bookingRepository.findActiveBookingsByStaffAndDateRange(
                staffId, startOfDay, endOfDay
        );
        
        // Generate time slots (9 AM to 6 PM, 30-minute intervals)
        List<LocalDateTime> availableSlots = new ArrayList<>();
        LocalDateTime slot = date.toLocalDate().atTime(9, 0);
        LocalDateTime endTime = date.toLocalDate().atTime(18, 0);
        
        while (slot.isBefore(endTime)) {
            LocalDateTime slotEnd = slot.plusMinutes(serviceDuration);
            
            // Check if slot conflicts with existing bookings
            boolean isAvailable = true;
            for (Booking booking : existingBookings) {
                LocalDateTime bookingEnd = booking.getAppointmentDateTime()
                        .plusMinutes(serviceDuration);
                
                if ((slot.isBefore(bookingEnd) && slotEnd.isAfter(booking.getAppointmentDateTime()))) {
                    isAvailable = false;
                    break;
                }
            }
            
            if (isAvailable && slot.isAfter(LocalDateTime.now())) {
                availableSlots.add(slot);
            }
            
            slot = slot.plusMinutes(30); // 30-minute intervals
        }
        
        return availableSlots;
    }
}

