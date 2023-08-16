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

import com.app.backend.communication.request.ItemCardCreationRequest;
import com.app.backend.communication.response.ItemCardCreationResponse;
import com.app.backend.model.ItemCard;
import com.app.backend.service.ItemCardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/itemcard")
@CrossOrigin
@RequiredArgsConstructor
public class ItemCardController {
	
	private final ItemCardService itemCardService;

	@GetMapping("/")
	public List<ItemCard> get(){
		return itemCardService.get();
	}

	@GetMapping("/employee/{employeeID}")
	public List<ItemCard> get(@PathVariable("employeeID") UUID employeeID){
		return itemCardService.get(employeeID);
	}
	
	@PostMapping("/create")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<ItemCardCreationResponse> saveItem(@RequestBody ItemCardCreationRequest item)
	{
		return ResponseEntity.status(HttpStatus.CREATED).body(itemCardService.create(item));
	}

}