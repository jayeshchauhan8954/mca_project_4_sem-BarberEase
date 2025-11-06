package com.barberease.service;

import com.barberease.model.Shop;
import com.barberease.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ShopService {
    
    @Autowired
    private ShopRepository shopRepository;
    
    public Shop createShop(Shop shop, String ownerId) {
        shop.setOwnerId(ownerId);
        shop.setCreatedAt(LocalDateTime.now());
        shop.setUpdatedAt(LocalDateTime.now());
        return shopRepository.save(shop);
    }
    
    public List<Shop> getShopsByOwner(String ownerId) {
        return shopRepository.findByOwnerId(ownerId);
    }
    
    @Cacheable(value = "shops", key = "#id")
    public Shop getShopById(String id) {
        return shopRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shop not found with id: " + id));
    }
    
    @CacheEvict(value = "shops", key = "#id")
    public Shop updateShop(String id, Shop shopDetails) {
        Shop shop = getShopById(id);
        
        shop.setName(shopDetails.getName());
        shop.setAddress(shopDetails.getAddress());
        shop.setPhone(shopDetails.getPhone());
        shop.setEmail(shopDetails.getEmail());
        shop.setDescription(shopDetails.getDescription());
        shop.setBusinessHours(shopDetails.getBusinessHours());
        shop.setSettings(shopDetails.getSettings());
        shop.setUpdatedAt(LocalDateTime.now());
        
        return shopRepository.save(shop);
    }
    
    @CacheEvict(value = "shops", key = "#id")
    public void deleteShop(String id) {
        Shop shop = getShopById(id);
        shop.setActive(false);
        shop.setUpdatedAt(LocalDateTime.now());
        shopRepository.save(shop);
    }
    
    public List<Shop> getActiveShops() {
        return shopRepository.findByActive(true);
    }
}

