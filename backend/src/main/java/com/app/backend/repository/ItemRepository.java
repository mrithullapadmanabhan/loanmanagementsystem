package com.app.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend.model.Item;


public interface ItemRepository extends JpaRepository<Item, UUID> {}
