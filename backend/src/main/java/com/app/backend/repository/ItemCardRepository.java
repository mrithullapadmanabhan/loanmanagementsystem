package com.app.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend.model.ItemCard;


public interface ItemCardRepository extends JpaRepository<ItemCard, UUID> {}
