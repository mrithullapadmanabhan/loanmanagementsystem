package com.app.backend.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend.model.Category;
import com.app.backend.model.LoanCard;

public interface LoanCardRepository extends JpaRepository<LoanCard, UUID> {
    Optional<LoanCard> findByCategory(Category category);
}
