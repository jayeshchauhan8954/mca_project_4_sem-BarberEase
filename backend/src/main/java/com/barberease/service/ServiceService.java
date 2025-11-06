package com.barberease.service;

import com.barberease.model.Service;
import com.barberease.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;

@org.springframework.stereotype.Service
public class ServiceService {
    
    @Autowired
    private ServiceRepository serviceRepository;
    
    public Service createService(Service service, String shopId) {
        service.setShopId(shopId);
        service.setCreatedAt(LocalDateTime.now());
        service.setUpdatedAt(LocalDateTime.now());
        return serviceRepository.save(service);
    }
    
    public List<Service> getServicesByShop(String shopId) {
        return serviceRepository.findByShopIdAndActive(shopId, true);
    }
    
    public Service getServiceById(String id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));
    }
    
    public Service updateService(String id, Service serviceDetails) {
        Service service = getServiceById(id);
        
        service.setName(serviceDetails.getName());
        service.setDescription(serviceDetails.getDescription());
        service.setDurationMinutes(serviceDetails.getDurationMinutes());
        service.setPrice(serviceDetails.getPrice());
        service.setBufferTimeMinutes(serviceDetails.getBufferTimeMinutes());
        service.setCategory(serviceDetails.getCategory());
        service.setUpdatedAt(LocalDateTime.now());
        
        return serviceRepository.save(service);
    }
    
    public void deleteService(String id) {
        Service service = getServiceById(id);
        service.setActive(false);
        service.setUpdatedAt(LocalDateTime.now());
        serviceRepository.save(service);
    }
    
    public List<Service> getServicesByCategory(Service.ServiceCategory category) {
        return serviceRepository.findByCategoryAndActive(category, true);
    }
}

