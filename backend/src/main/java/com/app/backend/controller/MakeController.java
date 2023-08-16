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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.communication.request.MakeCreationRequest;
import com.app.backend.communication.response.MakeCreationResponse;
import com.app.backend.model.Make;
import com.app.backend.service.MakeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/make")
@CrossOrigin
@RequiredArgsConstructor
public class MakeController {
    
    private final MakeService makeService;

    @GetMapping("/")
	public List<Make> get(){
		return makeService.get();
	}

    @GetMapping("/category/{categoryID}")
	public List<Make> get(@PathVariable("categoryID") UUID categoryID){
		return makeService.get(categoryID);
	}

	@PostMapping("/create")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<MakeCreationResponse> create(MakeCreationRequest request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(makeService.create(request));
	}

}
