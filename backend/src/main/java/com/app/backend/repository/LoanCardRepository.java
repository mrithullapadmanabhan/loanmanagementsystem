package com.app.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend.model.LoanCard;


public interface LoanCardRepository extends JpaRepository <LoanCard, UUID> {
    List<LoanCard> findByMake(Make make);
}
