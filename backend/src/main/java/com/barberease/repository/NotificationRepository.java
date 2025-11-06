package com.barberease.repository;

import com.barberease.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByUserId(String userId);
    List<Notification> findByBookingId(String bookingId);
    List<Notification> findByStatus(Notification.NotificationStatus status);
    List<Notification> findByType(Notification.NotificationType type);
    List<Notification> findByChannel(Notification.NotificationChannel channel);
}

