package com.app.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.app.backend.communication.request.CategoryCreationRequest;
import com.app.backend.communication.response.CategoryCreationResponse;
import com.app.backend.model.Category;
import com.app.backend.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {
    
    private final CategoryRepository categoryRepository;

    public List<Category> get() {
        return categoryRepository.findAll();
    }

    public CategoryCreationResponse create(CategoryCreationRequest request) {
        Category category = Category.builder()
            .name(request.getName())
            .build();

        categoryRepository.save(category);

        return CategoryCreationResponse.builder()
            .categoryID(category.getId())
            .build();
    }
    
}
