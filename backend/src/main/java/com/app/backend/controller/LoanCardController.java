package com.app.backend.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.communication.request.LoanCardCreationRequest;
import com.app.backend.communication.response.LoanCardCreationResponse;
import com.app.backend.model.LoanCard;
import com.app.backend.service.LoanCardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/loancard")
@CrossOrigin
@RequiredArgsConstructor
public class LoanCardController {

	private final LoanCardService loanCardService;

	@GetMapping("/")
	public List<LoanCard> get(){
		return loanCardService.get();
	}

	@GetMapping("/{loanID}")
	public LoanCard get(@PathVariable("loanID") UUID loanCardID){
		return loanCardService.get(loanCardID);
	}

	@PostMapping("/add")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<LoanCardCreationResponse> create(@RequestBody LoanCardCreationRequest request)
	{
		return ResponseEntity.status(HttpStatus.CREATED).body((loanCardService.create(request)));
	}

}