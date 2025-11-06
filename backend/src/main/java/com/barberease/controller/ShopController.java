package com.barberease.controller;

import com.barberease.model.Shop;
import com.barberease.service.ShopService;
import com.barberease.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/owner")
@CrossOrigin(origins = "*")
public class ShopController {
    
    @Autowired
    private ShopService shopService;
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/shops")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP_OWNER')")
    public ResponseEntity<Shop> createShop(@Valid @RequestBody Shop shop) {
        Shop createdShop = shopService.createShop(shop, authService.getCurrentUser().getId());
        return ResponseEntity.ok(createdShop);
    }
    
    @GetMapping("/shops")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP_OWNER')")
    public ResponseEntity<List<Shop>> getShops() {
        List<Shop> shops = shopService.getShopsByOwner(authService.getCurrentUser().getId());
        return ResponseEntity.ok(shops);
    }
    
    @GetMapping("/shops/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP_OWNER')")
    public ResponseEntity<Shop> getShop(@PathVariable String id) {
        Shop shop = shopService.getShopById(id);
        return ResponseEntity.ok(shop);
    }
    
    @PutMapping("/shops/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP_OWNER')")
    public ResponseEntity<Shop> updateShop(@PathVariable String id, @Valid @RequestBody Shop shop) {
        Shop updatedShop = shopService.updateShop(id, shop);
        return ResponseEntity.ok(updatedShop);
    }
    
    @DeleteMapping("/shops/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP_OWNER')")
    public ResponseEntity<Void> deleteShop(@PathVariable String id) {
        shopService.deleteShop(id);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/public/shops")
    public ResponseEntity<List<Shop>> getPublicShops() {
        List<Shop> shops = shopService.getActiveShops();
        return ResponseEntity.ok(shops);
    }
}

