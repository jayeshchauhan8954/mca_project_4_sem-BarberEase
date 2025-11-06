package com.barberease.controller;

import com.barberease.model.Service;
import com.barberease.service.ServiceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/owner")
@CrossOrigin(origins = "*")
public class ServiceController {
    
    @Autowired
    private ServiceService serviceService;
    
    @PostMapping("/shops/{shopId}/services")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP_OWNER')")
    public ResponseEntity<Service> createService(@PathVariable String shopId, @Valid @RequestBody Service service) {
        Service createdService = serviceService.createService(service, shopId);
        return ResponseEntity.ok(createdService);
    }
    
    @GetMapping("/shops/{shopId}/services")
    public ResponseEntity<List<Service>> getServicesByShop(@PathVariable String shopId) {
        List<Service> services = serviceService.getServicesByShop(shopId);
        return ResponseEntity.ok(services);
    }
    
    @GetMapping("/services/{id}")
    public ResponseEntity<Service> getService(@PathVariable String id) {
        Service service = serviceService.getServiceById(id);
        return ResponseEntity.ok(service);
    }
    
    @PutMapping("/services/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP_OWNER')")
    public ResponseEntity<Service> updateService(@PathVariable String id, @Valid @RequestBody Service service) {
        Service updatedService = serviceService.updateService(id, service);
        return ResponseEntity.ok(updatedService);
    }
    
    @DeleteMapping("/services/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP_OWNER')")
    public ResponseEntity<Void> deleteService(@PathVariable String id) {
        serviceService.deleteService(id);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/services/category/{category}")
    public ResponseEntity<List<Service>> getServicesByCategory(@PathVariable Service.ServiceCategory category) {
        List<Service> services = serviceService.getServicesByCategory(category);
        return ResponseEntity.ok(services);
    }
}

