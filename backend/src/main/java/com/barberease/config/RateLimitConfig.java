package com.barberease.config;

import org.springframework.context.annotation.Configuration;

/**
 * Rate Limiting Configuration
 * 
 * For production, integrate with Redis or use a library like Bucket4j
 * This is a placeholder for future implementation
 */
@Configuration
public class RateLimitConfig {
    
    // Rate limiting configuration
    // TODO: Implement with Redis and Bucket4j
    
    /**
     * API rate limits:
     * - Public endpoints: 100 requests per minute
     * - Authenticated endpoints: 1000 requests per hour
     * - Login endpoint: 5 requests per minute (prevent brute force)
     */
    
    public static final int PUBLIC_RATE_LIMIT = 100;
    public static final int AUTH_RATE_LIMIT = 1000;
    public static final int LOGIN_RATE_LIMIT = 5;
}

