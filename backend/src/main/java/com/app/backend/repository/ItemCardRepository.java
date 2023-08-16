package com.app.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend.model.ItemCard;
import com.app.backend.model.Make;


public interface ItemCardRepository extends JpaRepository<ItemCard, UUID> {
    List<ItemCard> findByMake(Make make);
}
