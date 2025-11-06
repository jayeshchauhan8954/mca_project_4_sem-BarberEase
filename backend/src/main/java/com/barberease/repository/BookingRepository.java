package com.barberease.repository;

import com.barberease.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {
    List<Booking> findByUserId(String userId);
    List<Booking> findByShopId(String shopId);
    List<Booking> findByStaffId(String staffId);
    List<Booking> findByShopIdAndAppointmentDateTimeBetween(String shopId, LocalDateTime start, LocalDateTime end);
    List<Booking> findByStaffIdAndAppointmentDateTimeBetween(String staffId, LocalDateTime start, LocalDateTime end);
    List<Booking> findByStatus(Booking.BookingStatus status);
    List<Booking> findByPaymentStatus(Booking.PaymentStatus paymentStatus);
    
    @Query("{ 'shopId': ?0, 'appointmentDateTime': { $gte: ?1, $lt: ?2 }, 'status': { $nin: ['CANCELLED', 'NO_SHOW'] } }")
    List<Booking> findActiveBookingsByShopAndDateRange(String shopId, LocalDateTime start, LocalDateTime end);
    
    @Query("{ 'staffId': ?0, 'appointmentDateTime': { $gte: ?1, $lt: ?2 }, 'status': { $nin: ['CANCELLED', 'NO_SHOW'] } }")
    List<Booking> findActiveBookingsByStaffAndDateRange(String staffId, LocalDateTime start, LocalDateTime end);
}

