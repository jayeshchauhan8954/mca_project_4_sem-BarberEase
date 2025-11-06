package com.barberease.service;

import com.barberease.dto.AuthResponse;
import com.barberease.dto.LoginRequest;
import com.barberease.dto.RegisterRequest;
import com.barberease.model.User;
import com.barberease.repository.UserRepository;
import com.barberease.security.JwtTokenProvider;
import com.barberease.security.UserPrincipal;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {
    
    @Mock
    private AuthenticationManager authenticationManager;
    
    @Mock
    private UserRepository userRepository;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    
    @Mock
    private JwtTokenProvider tokenProvider;
    
    @InjectMocks
    private AuthService authService;
    
    private User testUser;
    private LoginRequest loginRequest;
    private RegisterRequest registerRequest;
    
    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId("user123");
        testUser.setName("John Doe");
        testUser.setEmail("john@example.com");
        testUser.setPassword("hashedPassword");
        testUser.setPhone("9876543210");
        testUser.setRole(User.UserRole.CUSTOMER);
        
        loginRequest = new LoginRequest();
        loginRequest.setEmail("john@example.com");
        loginRequest.setPassword("password123");
        
        registerRequest = new RegisterRequest();
        registerRequest.setName("John Doe");
        registerRequest.setEmail("john@example.com");
        registerRequest.setPassword("password123");
        registerRequest.setPhone("9876543210");
        registerRequest.setRole(User.UserRole.CUSTOMER);
    }
    
    @Test
    void testLogin_Success() {
        // Arrange
        Authentication authentication = mock(Authentication.class);
        UserPrincipal userPrincipal = UserPrincipal.create(testUser);
        
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(userPrincipal);
        when(tokenProvider.generateToken(authentication)).thenReturn("jwt-token");
        when(userRepository.findById("user123")).thenReturn(Optional.of(testUser));
        
        // Act
        AuthResponse result = authService.login(loginRequest);
        
        // Assert
        assertNotNull(result);
        assertEquals("jwt-token", result.getAccessToken());
        assertNotNull(result.getUser());
        assertEquals("john@example.com", result.getUser().getEmail());
        
        verify(authenticationManager, times(1)).authenticate(any());
        verify(tokenProvider, times(1)).generateToken(any());
    }
    
    @Test
    void testRegister_Success() {
        // Arrange
        when(userRepository.existsByEmail("john@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("hashedPassword");
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        when(tokenProvider.generateTokenFromUserId("user123")).thenReturn("jwt-token");
        
        // Act
        AuthResponse result = authService.register(registerRequest);
        
        // Assert
        assertNotNull(result);
        assertEquals("jwt-token", result.getAccessToken());
        assertNotNull(result.getUser());
        assertEquals("John Doe", result.getUser().getName());
        
        verify(userRepository, times(1)).existsByEmail("john@example.com");
        verify(passwordEncoder, times(1)).encode("password123");
        verify(userRepository, times(1)).save(any(User.class));
    }
    
    @Test
    void testRegister_EmailAlreadyExists() {
        // Arrange
        when(userRepository.existsByEmail("john@example.com")).thenReturn(true);
        
        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            authService.register(registerRequest);
        });
        
        assertTrue(exception.getMessage().contains("Email is already taken"));
        verify(userRepository, times(1)).existsByEmail("john@example.com");
        verify(userRepository, never()).save(any(User.class));
    }
}

