package com.barberease.repository;

import com.barberease.model.Service;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends MongoRepository<Service, String> {
    List<Service> findByShopId(String shopId);
    List<Service> findByShopIdAndActive(String shopId, boolean active);
    List<Service> findByCategoryAndActive(Service.ServiceCategory category, boolean active);
}

