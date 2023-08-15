package com.app.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend.model.ItemCategory;


public interface ItemCategoryRepository extends JpaRepository<ItemCategory, UUID> {}
