package com.barberease.service;

import com.barberease.model.Shop;
import com.barberease.repository.ShopRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ShopServiceTest {
    
    @Mock
    private ShopRepository shopRepository;
    
    @InjectMocks
    private ShopService shopService;
    
    private Shop testShop;
    private String testOwnerId;
    
    @BeforeEach
    void setUp() {
        testOwnerId = "owner123";
        testShop = new Shop();
        testShop.setId("shop123");
        testShop.setName("Test Barbershop");
        testShop.setAddress("123 Test Street");
        testShop.setPhone("9876543210");
        testShop.setOwnerId(testOwnerId);
        testShop.setActive(true);
        testShop.setCreatedAt(LocalDateTime.now());
        testShop.setUpdatedAt(LocalDateTime.now());
    }
    
    @Test
    void testCreateShop_Success() {
        // Arrange
        when(shopRepository.save(any(Shop.class))).thenReturn(testShop);
        
        // Act
        Shop result = shopService.createShop(testShop, testOwnerId);
        
        // Assert
        assertNotNull(result);
        assertEquals("Test Barbershop", result.getName());
        assertEquals(testOwnerId, result.getOwnerId());
        verify(shopRepository, times(1)).save(any(Shop.class));
    }
    
    @Test
    void testGetShopsByOwner_Success() {
        // Arrange
        List<Shop> expectedShops = Arrays.asList(testShop);
        when(shopRepository.findByOwnerId(testOwnerId)).thenReturn(expectedShops);
        
        // Act
        List<Shop> result = shopService.getShopsByOwner(testOwnerId);
        
        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Barbershop", result.get(0).getName());
        verify(shopRepository, times(1)).findByOwnerId(testOwnerId);
    }
    
    @Test
    void testGetShopById_Success() {
        // Arrange
        when(shopRepository.findById("shop123")).thenReturn(Optional.of(testShop));
        
        // Act
        Shop result = shopService.getShopById("shop123");
        
        // Assert
        assertNotNull(result);
        assertEquals("shop123", result.getId());
        assertEquals("Test Barbershop", result.getName());
    }
    
    @Test
    void testGetShopById_NotFound() {
        // Arrange
        when(shopRepository.findById("invalid")).thenReturn(Optional.empty());
        
        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            shopService.getShopById("invalid");
        });
        
        assertTrue(exception.getMessage().contains("Shop not found"));
    }
    
    @Test
    void testUpdateShop_Success() {
        // Arrange
        Shop updatedDetails = new Shop();
        updatedDetails.setName("Updated Shop");
        updatedDetails.setAddress("456 New Street");
        updatedDetails.setPhone("8765432109");
        
        when(shopRepository.findById("shop123")).thenReturn(Optional.of(testShop));
        when(shopRepository.save(any(Shop.class))).thenReturn(testShop);
        
        // Act
        Shop result = shopService.updateShop("shop123", updatedDetails);
        
        // Assert
        assertNotNull(result);
        verify(shopRepository, times(1)).save(any(Shop.class));
    }
    
    @Test
    void testDeleteShop_Success() {
        // Arrange
        when(shopRepository.findById("shop123")).thenReturn(Optional.of(testShop));
        when(shopRepository.save(any(Shop.class))).thenReturn(testShop);
        
        // Act
        shopService.deleteShop("shop123");
        
        // Assert
        verify(shopRepository, times(1)).save(any(Shop.class));
    }
    
    @Test
    void testGetActiveShops_Success() {
        // Arrange
        List<Shop> activeShops = Arrays.asList(testShop);
        when(shopRepository.findByActive(true)).thenReturn(activeShops);
        
        // Act
        List<Shop> result = shopService.getActiveShops();
        
        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertTrue(result.get(0).isActive());
    }
}

