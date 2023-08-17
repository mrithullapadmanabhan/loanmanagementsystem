package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.app.backend.communication.request.LoanCardCreationRequest;
import com.app.backend.communication.response.LoanCardCreationResponse;
import com.app.backend.model.Category;
import com.app.backend.model.LoanCard;
import com.app.backend.repository.CategoryRepository;
import com.app.backend.repository.LoanCardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoanCardService {
	
	private final LoanCardRepository loanCardRepository;

	private final CategoryRepository categoryRepository;


	public List<LoanCard> get() {
		return loanCardRepository.findAll();
	}

	public LoanCard get(UUID loanCardID) {
		return loanCardRepository.findById(loanCardID).orElseThrow();
	}

	public LoanCardCreationResponse create(LoanCardCreationRequest request) {
		Category category = categoryRepository.findById(request.getCategoryID()).orElseThrow();

		LoanCard loanCard = LoanCard.builder()
			.duration(request.getDuration())
			.category(category)
			.build();
		loanCardRepository.save(loanCard);

		return LoanCardCreationResponse.builder()
			.loanCardID(loanCard.getId())
			.build();
	}

}