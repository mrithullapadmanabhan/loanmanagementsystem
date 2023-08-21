package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.app.backend.communication.request.ItemCardCreateUpdateRequest;
import com.app.backend.exception.ResourceNotFoundException;
import com.app.backend.model.Employee;
import com.app.backend.model.ItemCard;
import com.app.backend.model.Make;
import com.app.backend.repository.EmployeeRepository;
import com.app.backend.repository.ItemCardRepository;
import com.app.backend.repository.MakeRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemCardServiceImplementation implements ItemCardService {

	private final ItemCardRepository itemCardRepository;

	private final MakeRepository makeRepository;
	private final EmployeeRepository employeeRepository;

	@Override
	public List<ItemCard> get() {
		return itemCardRepository.findAll();
	}

	@Override
	public ItemCard get(UUID itemCardID) {
		return itemCardRepository.findById(itemCardID)
				.orElseThrow(() -> new ResourceNotFoundException("Item card with this ID does not exist"));
	}

	@Override
	public ItemCard getByMake(UUID makeID) {
		Make make = makeRepository.findById(makeID)
				.orElseThrow(() -> new ResourceNotFoundException("Make with this ID does not exist"));
		return itemCardRepository.findByMake(make)
				.orElseThrow(() -> new ResourceNotFoundException("ItemCard with this make does not exist"));
	}

	@Override
	public List<ItemCard> getByEmployee(UUID employeeID) {
		Employee employee = employeeRepository.findById(employeeID)
				.orElseThrow(() -> new ResourceNotFoundException("Employee with this ID does not exist"));
		return employee.getLoans().stream().map(loan -> loan.getItem()).toList();
	}

	@Transactional
	@Override
	public ItemCard create(ItemCardCreateUpdateRequest request) {
		Make make = makeRepository.findById(request.getMakeID())
				.orElseThrow(() -> new ResourceNotFoundException("Make with this ID does not exist"));

		ItemCard itemCard = ItemCard.builder()
				.description(request.getDescription())
				.value(request.getValue())
				.make(make)
				.build();

		return itemCardRepository.save(itemCard);
	}

	@Transactional
	@Override
	public ItemCard update(UUID id, @Valid ItemCardCreateUpdateRequest request) {
		ItemCard itemCard = itemCardRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ItemCard with this ID does not exist"));

		itemCard.setDescription(request.getDescription());
		itemCard.setValue(request.getValue());

		return itemCardRepository.save(itemCard);
	}

	@Override
	public void delete(UUID id) {
		ItemCard itemCard = itemCardRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ItemCard with this ID does not exist"));

		itemCardRepository.delete(itemCard);
	}

}