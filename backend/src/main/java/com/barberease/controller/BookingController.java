package com.barberease.controller;

import com.barberease.dto.BookingRequest;
import com.barberease.model.Booking;
import com.barberease.service.BookingService;
import com.barberease.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class BookingController {
    
    @Autowired
    private BookingService bookingService;
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/bookings")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody BookingRequest bookingRequest) {
        Booking booking = bookingService.createBooking(bookingRequest, authService.getCurrentUser().getId());
        return ResponseEntity.ok(booking);
    }
    
    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getBookings() {
        List<Booking> bookings = bookingService.getBookingsByUser(authService.getCurrentUser().getId());
        return ResponseEntity.ok(bookings);
    }
    
    @GetMapping("/bookings/{id}")
    public ResponseEntity<Booking> getBooking(@PathVariable String id) {
        Booking booking = bookingService.getBookingById(id);
        return ResponseEntity.ok(booking);
    }
    
    @PutMapping("/bookings/{id}/cancel")
    public ResponseEntity<Booking> cancelBooking(@PathVariable String id, @RequestParam(required = false) String reason) {
        Booking booking = bookingService.cancelBooking(id, reason);
        return ResponseEntity.ok(booking);
    }
    
    @PutMapping("/bookings/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP_OWNER') or hasRole('STAFF')")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable String id, @RequestParam Booking.BookingStatus status) {
        Booking booking = bookingService.updateBookingStatus(id, status);
        return ResponseEntity.ok(booking);
    }
    
    @GetMapping("/shops/{shopId}/bookings")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP_OWNER') or hasRole('STAFF')")
    public ResponseEntity<List<Booking>> getBookingsByShop(@PathVariable String shopId,
                                                          @RequestParam(required = false) LocalDateTime startDate,
                                                          @RequestParam(required = false) LocalDateTime endDate) {
        List<Booking> bookings = bookingService.getBookingsByShop(shopId, startDate, endDate);
        return ResponseEntity.ok(bookings);
    }
    
    @GetMapping("/staff/{staffId}/bookings")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP_OWNER') or hasRole('STAFF')")
    public ResponseEntity<List<Booking>> getBookingsByStaff(@PathVariable String staffId,
                                                           @RequestParam(required = false) LocalDateTime startDate,
                                                           @RequestParam(required = false) LocalDateTime endDate) {
        List<Booking> bookings = bookingService.getBookingsByStaff(staffId, startDate, endDate);
        return ResponseEntity.ok(bookings);
    }
    
    @GetMapping("/shops/{shopId}/available-slots")
    public ResponseEntity<List<LocalDateTime>> getAvailableSlots(@PathVariable String shopId,
                                                                @RequestParam String staffId,
                                                                @RequestParam String serviceId,
                                                                @RequestParam LocalDateTime date) {
        List<LocalDateTime> slots = bookingService.getAvailableSlots(shopId, staffId, serviceId, date);
        return ResponseEntity.ok(slots);
    }
}

