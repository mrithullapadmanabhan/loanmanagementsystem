package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.app.backend.communication.request.LoanCardCreateUpdateRequest;
import com.app.backend.exception.ResourceNotFoundException;
import com.app.backend.model.Category;
import com.app.backend.model.LoanCard;
import com.app.backend.repository.CategoryRepository;
import com.app.backend.repository.LoanCardRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoanCardServiceImplementation implements LoanCardService {

	private final LoanCardRepository loanCardRepository;

	private final CategoryRepository categoryRepository;

	@Override
	public List<LoanCard> get() {
		return loanCardRepository.findAll();
	}

	@Override
	public LoanCard get(UUID loanCardID) {
		return loanCardRepository.findById(loanCardID)
				.orElseThrow(() -> new ResourceNotFoundException("LoanCard with this ID does not exist"));
	}

	@Transactional
	@Override
	public LoanCard create(LoanCardCreateUpdateRequest request) {
		Category category = categoryRepository.findById(request.getCategoryID())
				.orElseThrow(() -> new ResourceNotFoundException("Category with this ID does not exist"));

		LoanCard loanCard = LoanCard.builder()
				.duration(request.getDuration())
				.category(category)
				.build();

		return loanCardRepository.save(loanCard);
	}

	@Transactional
	@Override
	public LoanCard update(UUID id, @Valid LoanCardCreateUpdateRequest request) {
		LoanCard loanCard = loanCardRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("LoanCard with this ID does not exist"));

		loanCard.setDuration(request.getDuration());

		return loanCardRepository.save(loanCard);
	}

	@Override
	public void delete(UUID id) {
		LoanCard loanCard = loanCardRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("LoanCard with this ID does not exist"));

		loanCardRepository.delete(loanCard);
	}

}