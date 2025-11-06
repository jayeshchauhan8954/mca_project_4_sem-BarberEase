package com.barberease.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

/**
 * Cache Configuration
 * 
 * Currently using in-memory caching with ConcurrentHashMap
 * For production, consider switching to Redis for distributed caching
 */
@Configuration
@EnableCaching
public class CacheConfig {
    
    @Bean
    public CacheManager cacheManager() {
        SimpleCacheManager cacheManager = new SimpleCacheManager();
        cacheManager.setCaches(Arrays.asList(
            new ConcurrentMapCache("shops"),
            new ConcurrentMapCache("services"),
            new ConcurrentMapCache("staff"),
            new ConcurrentMapCache("users")
        ));
        return cacheManager;
    }
}

