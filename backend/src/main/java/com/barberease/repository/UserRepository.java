package com.barberease.repository;

import com.barberease.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    List<User> findByRole(User.UserRole role);
    List<User> findByShopId(String shopId);
    List<User> findByActive(boolean active);
}

