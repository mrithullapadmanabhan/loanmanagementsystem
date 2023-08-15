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

import com.app.backend.communication.request.ItemCreationRequest;
import com.app.backend.communication.response.ItemCreationResponse;
import com.app.backend.model.Item;
import com.app.backend.service.ItemService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/item")
@CrossOrigin
@RequiredArgsConstructor
public class ItemController {
	
	private final ItemService itemService;

	@GetMapping("/")
	public List<Item> getItems(){
		return itemService.getItems();
	}

	@GetMapping("/employee/{employee_id}")
	public List<Item> getItems(@PathVariable("employee_id") UUID employeeID){
		return itemService.getItems(employeeID);
	}
	
	@PostMapping("/add")
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<ItemCreationResponse> saveItem(@RequestBody ItemCreationRequest item)
	{
		return ResponseEntity.status(HttpStatus.CREATED).body(itemService.saveItem(item));
	}

}