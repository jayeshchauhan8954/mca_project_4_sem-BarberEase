package com.barberease.controller;

import com.barberease.model.Notification;
import com.barberease.service.NotificationService;
import com.barberease.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {
    
    @Autowired
    private NotificationService notificationService;
    
    @Autowired
    private AuthService authService;
    
    @GetMapping
    public ResponseEntity<List<Notification>> getUserNotifications() {
        String userId = authService.getCurrentUser().getId();
        List<Notification> notifications = notificationService.getNotificationsByUser(userId);
        return ResponseEntity.ok(notifications);
    }
    
    @PostMapping
    public ResponseEntity<Notification> createNotification(@RequestBody Notification notification) {
        Notification createdNotification = notificationService.createNotification(notification);
        return ResponseEntity.ok(createdNotification);
    }
}

