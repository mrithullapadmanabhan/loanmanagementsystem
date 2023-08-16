package com.app.backend.service;

import com.app.backend.communication.request.ItemCardCreationRequest;
import com.app.backend.communication.response.ItemCardCreationResponse;
import com.app.backend.model.Employee;
import com.app.backend.model.ItemCard;
import com.app.backend.model.Make;
import com.app.backend.repository.EmployeeRepository;
import com.app.backend.repository.MakeRepository;
import com.app.backend.repository.ItemCardRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemCardService {

	private final ItemCardRepository itemCardRepository;

	private final MakeRepository makeRepository;
	private final EmployeeRepository employeeRepository;

	
	public List<ItemCard> get() {
		return itemCardRepository.findAll();
	}

	public List<ItemCard> getByMakeID(UUID makeID) {
		Make make = makeRepository.findById(makeID).orElseThrow();
		return itemCardRepository.findByMake(make);
	}

	public List<ItemCard> getByEmployeeID(UUID employeeID) {
		Employee employee = employeeRepository.findById(employeeID).orElseThrow();
		return employee.getLoans().stream().map(loan -> loan.getItem()).toList();
	}

	public ItemCardCreationResponse create(ItemCardCreationRequest request) {
		Make make = makeRepository.findById(request.getMakeID()).orElseThrow();

		ItemCard itemCard = ItemCard.builder()
			.description(request.getDescription())
			.value(request.getValue())
			.make(make)
			.build();
		itemCardRepository.save(itemCard);

		return ItemCardCreationResponse.builder()
			.itemCardID(itemCard.getId())
			.build();
	}
	
}