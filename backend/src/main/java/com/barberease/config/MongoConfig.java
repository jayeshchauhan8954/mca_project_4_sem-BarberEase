package com.barberease.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;

import java.util.ArrayList;

@Configuration
public class MongoConfig {
    
    @Bean
    public MongoTransactionManager transactionManager(MongoDatabaseFactory dbFactory) {
        return new MongoTransactionManager(dbFactory);
    }
    
    @Bean
    public MongoCustomConversions customConversions() {
        return new MongoCustomConversions(new ArrayList<>());
    }
}

