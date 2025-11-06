package com.barberease.repository;

import com.barberease.model.Staff;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StaffRepository extends MongoRepository<Staff, String> {
    List<Staff> findByShopId(String shopId);
    List<Staff> findByShopIdAndActive(String shopId, boolean active);
    Optional<Staff> findByUserId(String userId);
    List<Staff> findByActive(boolean active);
}

