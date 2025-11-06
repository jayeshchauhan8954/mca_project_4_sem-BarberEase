package com.barberease;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class BarberEaseApplication {
    public static void main(String[] args) {
        SpringApplication.run(BarberEaseApplication.class, args);
    }
}

