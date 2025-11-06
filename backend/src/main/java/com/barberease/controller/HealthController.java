package com.barberease.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {
    
    @Autowired(required = false)
    private MongoTemplate mongoTemplate;
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("timestamp", LocalDateTime.now());
        health.put("application", "BarberEase Backend");
        health.put("version", "1.0.0");
        
        // Check MongoDB connection
        try {
            if (mongoTemplate != null) {
                mongoTemplate.getDb().getName();
                health.put("database", "CONNECTED");
            } else {
                health.put("database", "NOT_CONFIGURED");
            }
        } catch (Exception e) {
            health.put("database", "DISCONNECTED");
            health.put("status", "DEGRADED");
        }
        
        return ResponseEntity.ok(health);
    }
    
    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("pong");
    }
}

