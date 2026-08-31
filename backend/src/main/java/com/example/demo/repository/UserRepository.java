package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    // =====================================================
    // FIND USER BY EMAIL
    // =====================================================

    Optional<User> findByEmailIgnoreCase(String email);


    // =====================================================
    // CHECK EMAIL
    // =====================================================

    boolean existsByEmailIgnoreCase(String email);


    // =====================================================
    // FIND USER BY PHONE
    // =====================================================

    Optional<User> findByPhone(String phone);
}