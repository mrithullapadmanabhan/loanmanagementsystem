package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.app.backend.communication.request.MakeCreateUpdateRequest;
import com.app.backend.exception.ResourceNotFoundException;
import com.app.backend.model.Category;
import com.app.backend.model.Make;
import com.app.backend.repository.CategoryRepository;
import com.app.backend.repository.MakeRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MakeServiceImplementation implements MakeService {

    private final MakeRepository makeRepository;

    private final CategoryRepository categoryRepository;

    @Override
    public List<Make> get() {
        return makeRepository.findAll();
    }

    @Override
    public List<Make> getByCategory(UUID categoryID) {
        Category category = categoryRepository.findById(categoryID)
                .orElseThrow(() -> new ResourceNotFoundException("Category with this ID does not exist"));
        return category.getMakes();
    }

    @Transactional
    @Override
    public Make create(MakeCreateUpdateRequest request) {
        Category category = categoryRepository.findById(request.getCategoryID())
                .orElseThrow(() -> new ResourceNotFoundException("Category with this ID does not exist"));

        Make make = Make.builder()
                .name(request.getName())
                .category(category)
                .build();

        return makeRepository.save(make);
    }

    @Transactional
    @Override
    public Make update(UUID id, @Valid MakeCreateUpdateRequest request) {
        Make make = makeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Make with this ID does not exist"));

        make.setName(request.getName());

        return makeRepository.save(make);
    }

    @Override
    public void delete(UUID id) {
        Make make = makeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Make with this ID does not exist"));

        makeRepository.delete(make);
    }

}
