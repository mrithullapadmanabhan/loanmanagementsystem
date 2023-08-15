package com.app.backend.service;

import com.app.backend.communication.request.ItemCreationRequest;
import com.app.backend.communication.response.ItemCreationResponse;
import com.app.backend.model.Employee;
import com.app.backend.model.Item;
import com.app.backend.model.ItemMake;
import com.app.backend.repository.EmployeeRepository;
import com.app.backend.repository.ItemMakeRepository;
import com.app.backend.repository.ItemRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemService {

	private final ItemRepository itemRepository;

	private final ItemMakeRepository itemMakeRepository;
	private final EmployeeRepository employeeRepository;


	public ItemCreationResponse saveItem(ItemCreationRequest request) {
		ItemMake make = itemMakeRepository.findById(request.getMakeID()).orElseThrow();
		Item item = Item.builder()
			.description(request.getDescription())
			.value(request.getValue())
			.make(make)
			.build();
		
		itemRepository.save(item);

		return ItemCreationResponse.builder()
			.itemID(item.getId())
			.build();
	}

	public List<Item> getItems(UUID employeeID) {
		Employee employee = employeeRepository.findById(employeeID).orElseThrow();
		return employee.getLoans().stream().map(loan -> loan.getItem()).toList();
	}

	public List<Item> getItems() {
		return itemRepository.findAll();
	}
	
}