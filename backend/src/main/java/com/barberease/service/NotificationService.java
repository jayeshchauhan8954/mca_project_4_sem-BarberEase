package com.barberease.service;

import com.barberease.model.Booking;
import com.barberease.model.Notification;
import com.barberease.model.User;
import com.barberease.repository.NotificationRepository;
import com.barberease.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired(required = false)
    private JavaMailSender mailSender;
    
    @Value("${spring.mail.username:noreply@barberease.com}")
    private String fromEmail;
    
    public Notification createNotification(Notification notification) {
        notification.setCreatedAt(LocalDateTime.now());
        notification.setUpdatedAt(LocalDateTime.now());
        return notificationRepository.save(notification);
    }
    
    public List<Notification> getNotificationsByUser(String userId) {
        return notificationRepository.findByUserId(userId);
    }
    
    public void sendBookingConfirmation(Booking booking) {
        User user = userRepository.findById(booking.getUserId()).orElse(null);
        if (user == null) return;
        
        Notification notification = new Notification();
        notification.setUserId(booking.getUserId());
        notification.setBookingId(booking.getId());
        notification.setMessage("Your booking has been confirmed for " + booking.getAppointmentDateTime());
        notification.setType(Notification.NotificationType.BOOKING_CONFIRMED);
        notification.setChannel(Notification.NotificationChannel.EMAIL);
        notification.setRecipientEmail(user.getEmail());
        
        Notification savedNotification = createNotification(notification);
        
        // Send email
        try {
            sendEmail(
                user.getEmail(),
                "Booking Confirmation - BarberEase",
                "Hello " + user.getName() + ",\n\n" +
                "Your booking has been confirmed!\n" +
                "Date & Time: " + booking.getAppointmentDateTime() + "\n" +
                "Booking ID: " + booking.getId() + "\n\n" +
                "Thank you for choosing BarberEase!\n\n" +
                "Best regards,\n" +
                "BarberEase Team"
            );
            
            savedNotification.setStatus(Notification.NotificationStatus.SENT);
            savedNotification.setSentAt(LocalDateTime.now());
        } catch (Exception e) {
            savedNotification.setStatus(Notification.NotificationStatus.FAILED);
            savedNotification.setFailureReason(e.getMessage());
        }
        
        notificationRepository.save(savedNotification);
    }
    
    public void sendBookingCancellation(Booking booking) {
        User user = userRepository.findById(booking.getUserId()).orElse(null);
        if (user == null) return;
        
        Notification notification = new Notification();
        notification.setUserId(booking.getUserId());
        notification.setBookingId(booking.getId());
        notification.setMessage("Your booking has been cancelled");
        notification.setType(Notification.NotificationType.BOOKING_CANCELLED);
        notification.setChannel(Notification.NotificationChannel.EMAIL);
        notification.setRecipientEmail(user.getEmail());
        
        Notification savedNotification = createNotification(notification);
        
        // Send email
        try {
            sendEmail(
                user.getEmail(),
                "Booking Cancellation - BarberEase",
                "Hello " + user.getName() + ",\n\n" +
                "Your booking has been cancelled.\n" +
                "Booking ID: " + booking.getId() + "\n" +
                "Reason: " + (booking.getCancellationReason() != null ? booking.getCancellationReason() : "N/A") + "\n\n" +
                "If you have any questions, please contact us.\n\n" +
                "Best regards,\n" +
                "BarberEase Team"
            );
            
            savedNotification.setStatus(Notification.NotificationStatus.SENT);
            savedNotification.setSentAt(LocalDateTime.now());
        } catch (Exception e) {
            savedNotification.setStatus(Notification.NotificationStatus.FAILED);
            savedNotification.setFailureReason(e.getMessage());
        }
        
        notificationRepository.save(savedNotification);
    }
    
    public void sendBookingReminder(Booking booking) {
        User user = userRepository.findById(booking.getUserId()).orElse(null);
        if (user == null) return;
        
        Notification notification = new Notification();
        notification.setUserId(booking.getUserId());
        notification.setBookingId(booking.getId());
        notification.setMessage("Reminder: You have an appointment tomorrow");
        notification.setType(Notification.NotificationType.BOOKING_REMINDER);
        notification.setChannel(Notification.NotificationChannel.EMAIL);
        notification.setRecipientEmail(user.getEmail());
        
        Notification savedNotification = createNotification(notification);
        
        // Send email
        try {
            sendEmail(
                user.getEmail(),
                "Appointment Reminder - BarberEase",
                "Hello " + user.getName() + ",\n\n" +
                "This is a reminder about your upcoming appointment.\n" +
                "Date & Time: " + booking.getAppointmentDateTime() + "\n" +
                "Booking ID: " + booking.getId() + "\n\n" +
                "We look forward to seeing you!\n\n" +
                "Best regards,\n" +
                "BarberEase Team"
            );
            
            savedNotification.setStatus(Notification.NotificationStatus.SENT);
            savedNotification.setSentAt(LocalDateTime.now());
        } catch (Exception e) {
            savedNotification.setStatus(Notification.NotificationStatus.FAILED);
            savedNotification.setFailureReason(e.getMessage());
        }
        
        notificationRepository.save(savedNotification);
    }
    
    private void sendEmail(String to, String subject, String body) {
        if (mailSender == null) {
            System.out.println("Mail sender not configured. Email not sent.");
            return;
        }
        
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        
        mailSender.send(message);
    }
}

