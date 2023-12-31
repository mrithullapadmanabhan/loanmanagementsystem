package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.app.backend.communication.request.ItemCardCreateUpdateRequest;
import com.app.backend.communication.response.ItemCardResponse;
import com.app.backend.exception.ResourceNotFoundException;
import com.app.backend.model.Employee;
import com.app.backend.model.EmployeeLoan;
import com.app.backend.model.ItemCard;
import com.app.backend.model.Make;
import com.app.backend.repository.EmployeeLoanRepository;
import com.app.backend.repository.EmployeeRepository;
import com.app.backend.repository.ItemCardRepository;
import com.app.backend.repository.MakeRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemCardServiceImplementation implements ItemCardService {

	private final ItemCardRepository itemCardRepository;

	private final MakeRepository makeRepository;
	private final EmployeeRepository employeeRepository;

	private final EmployeeLoanRepository employeeLoanRepository;

	private final ModelMapper mapper;

	@Override
	public List<ItemCardResponse> get() {
		return itemCardRepository.findAll().stream().map(itemCard -> mapper.map(itemCard, ItemCardResponse.class))
				.toList();
	}

	@Override
	public ItemCardResponse get(UUID itemCardID) {
		return mapper.map(itemCardRepository.findById(itemCardID)
				.orElseThrow(() -> new ResourceNotFoundException("Item card with this ID does not exist")),
				ItemCardResponse.class);
	}

	@Override
	public ItemCardResponse getByMake(UUID makeID) {
		Make make = makeRepository.findById(makeID)
				.orElseThrow(() -> new ResourceNotFoundException("Make with this ID does not exist"));
		return mapper.map(itemCardRepository.findByMake(make)
				.orElseThrow(() -> new ResourceNotFoundException("ItemCard with this make does not exist")),
				ItemCardResponse.class);
	}

	@Override
	public List<ItemCardResponse> getByEmployee(UUID employeeID) {
		Employee employee = employeeRepository.findById(employeeID)
				.orElseThrow(() -> new ResourceNotFoundException("Employee with this ID does not exist"));
		return employee.getLoans().stream().map(loan -> mapper.map(loan.getItem(), ItemCardResponse.class)).toList();
	}

	@Override
	public ItemCardResponse create(ItemCardCreateUpdateRequest request) {
		Make make = makeRepository.findById(request.getMakeID())
				.orElseThrow(() -> new ResourceNotFoundException("Make with this ID does not exist"));

		ItemCard itemCard = ItemCard.builder()
				.description(request.getDescription())
				.value(request.getValue())
				.make(make)
				.build();

		try {
			return mapper.map(itemCardRepository.save(itemCard), ItemCardResponse.class);
		} catch (Exception e) {
			throw new DataIntegrityViolationException("Itemcard with selected Make already exists");
		}
	}

	@Override
	public ItemCardResponse update(UUID id, @Valid ItemCardCreateUpdateRequest request) {
		ItemCard itemCard = itemCardRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ItemCard with this ID does not exist"));

		itemCard.setDescription(request.getDescription());
		itemCard.setValue(request.getValue());

		return mapper.map(itemCardRepository.save(itemCard), ItemCardResponse.class);
	}

	@Override
	public void delete(UUID id) {
		ItemCard itemCard = itemCardRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ItemCard with this ID does not exist"));

		List<EmployeeLoan> employeeLoans = employeeLoanRepository.findByItem(itemCard);
		for (EmployeeLoan employeeLoan : employeeLoans) {
			employeeLoanRepository.delete(employeeLoan);
		}
		itemCardRepository.delete(itemCard);
	}

}