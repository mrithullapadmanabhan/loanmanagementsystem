package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionSystemException;

import com.app.backend.communication.request.MakeCreateUpdateRequest;
import com.app.backend.communication.response.MakeResponse;
import com.app.backend.exception.ResourceNotFoundException;
import com.app.backend.model.Category;
import com.app.backend.model.Make;
import com.app.backend.repository.CategoryRepository;
import com.app.backend.repository.MakeRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MakeServiceImplementation implements MakeService {

    private final MakeRepository makeRepository;

    private final CategoryRepository categoryRepository;

    private final ModelMapper mapper;

    @Override
    public List<MakeResponse> get() {
        return makeRepository.findAll().stream().map((make) -> mapper.map(make, MakeResponse.class)).toList();
    }

    @Override
    public MakeResponse get(UUID makeID) {
        return mapper.map(makeRepository.findById(makeID)
                .orElseThrow(() -> new ResourceNotFoundException("Make with this ID does not exist")),
                MakeResponse.class);
    }

    @Override
    public List<MakeResponse> getByCategory(UUID categoryID) {
        Category category = categoryRepository.findById(categoryID)
                .orElseThrow(() -> new ResourceNotFoundException("Category with this ID does not exist"));
        return category.getMakes().stream().map((make) -> mapper.map(make, MakeResponse.class)).toList();
    }

    @Override
    public MakeResponse create(MakeCreateUpdateRequest request) {
        Category category = categoryRepository.findById(request.getCategoryID())
                .orElseThrow(() -> new ResourceNotFoundException("Category with this ID does not exist"));

        Make make = Make.builder()
                .name(request.getName())
                .category(category)
                .build();
        try {
            return mapper.map(makeRepository.save(make), MakeResponse.class);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("Make should be unique");
        } catch (TransactionSystemException e) {
            throw new TransactionSystemException("Make can't be empty");
        }

    }

    @Override
    public MakeResponse update(UUID id, @Valid MakeCreateUpdateRequest request) {
        Make make = makeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Make with this ID does not exist"));

        make.setName(request.getName());

        try {
            return mapper.map(makeRepository.save(make), MakeResponse.class);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("Make should be unique");
        } catch (TransactionSystemException e) {
            throw new TransactionSystemException("Make can't be empty");
        }
    }

    @Override
    public void delete(UUID id) {
        Make make = makeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Make with this ID does not exist"));

        makeRepository.delete(make);
    }

}
