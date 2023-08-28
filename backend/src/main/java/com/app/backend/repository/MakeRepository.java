package com.app.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend.model.Make;

public interface MakeRepository extends JpaRepository<Make, UUID> {
    // List<Make> findByCategory(UUID u);
}
