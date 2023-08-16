package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.app.backend.communication.request.MakeCreationRequest;
import com.app.backend.communication.response.MakeCreationResponse;
import com.app.backend.model.Category;
import com.app.backend.model.Make;
import com.app.backend.repository.CategoryRepository;
import com.app.backend.repository.MakeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MakeService {
    
    private final MakeRepository makeRepository;

    private final CategoryRepository categoryRepository;


    public List<Make> get() {
        return makeRepository.findAll();
    }

    public List<Make> get(UUID categoryID) {
        Category category = categoryRepository.findById(categoryID).orElseThrow();
        return category.getMakes();
    }

    public MakeCreationResponse create(MakeCreationRequest request) {
        Category category = categoryRepository.findById(request.getCategoryID()).orElseThrow();

        Make make = Make.builder()
            .name(request.getName())
            .category(category)
            .build();

        makeRepository.save(make);

        return MakeCreationResponse.builder()
            .makeID(make.getId())
            .build();
    }

}
