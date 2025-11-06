package com.barberease.dto;

import com.barberease.model.User;

public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private User user;
    
    // Constructors
    public AuthResponse() {}
    
    public AuthResponse(String accessToken, User user) {
        this.accessToken = accessToken;
        this.user = user;
    }
    
    // Getters and Setters
    public String getAccessToken() {
        return accessToken;
    }
    
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
    
    public String getTokenType() {
        return tokenType;
    }
    
    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
}

