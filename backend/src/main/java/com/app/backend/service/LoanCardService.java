package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.app.backend.communication.request.LoanCardCreationRequest;
import com.app.backend.communication.response.LoanCardCreationResponse;
import com.app.backend.model.LoanCard;
import com.app.backend.model.Make;
import com.app.backend.repository.LoanCardRepository;
import com.app.backend.repository.MakeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoanCardService {
	
	private final LoanCardRepository loanCardRepository;

	private final MakeRepository makeRepository;


	public List<LoanCard> get() {
		return loanCardRepository.findAll();
	}

	public LoanCard get(UUID loanCardID) {
		return loanCardRepository.findById(loanCardID).orElseThrow();
	}

	public LoanCardCreationResponse create(LoanCardCreationRequest request) {
		Make make = makeRepository.findById(request.getMakeID()).orElseThrow();

		LoanCard loanCard = LoanCard.builder()
			.duration(request.getDuration())
			.make(make)
			.build();
		loanCardRepository.save(loanCard);

		return LoanCardCreationResponse.builder()
			.loanCardID(loanCard.getId())
			.build();
	}

}