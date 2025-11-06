package com.barberease.repository;

import com.barberease.model.Shop;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShopRepository extends MongoRepository<Shop, String> {
    List<Shop> findByOwnerId(String ownerId);
    List<Shop> findByActive(boolean active);
    Optional<Shop> findByNameAndActive(String name, boolean active);
}

