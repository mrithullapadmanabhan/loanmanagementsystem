package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import org.modelmapper.TypeMap;
import org.springframework.stereotype.Service;

import com.app.backend.communication.request.CategoryCreateUpdateRequest;
import com.app.backend.communication.response.CategoryResponse;
import com.app.backend.exception.ResourceNotFoundException;
import com.app.backend.model.Category;
import com.app.backend.repository.CategoryRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImplementation implements CategoryService {

    private final CategoryRepository categoryRepository;

    private final TypeMap<Category, CategoryResponse> mapper;

    @Override
    public List<CategoryResponse> get() {
        return categoryRepository.findAll().stream()
                .map((category) -> mapper.map(category)).toList();

    }

    @Override
    public CategoryResponse get(UUID categoryID) {
        return mapper.map(
                categoryRepository.findById(categoryID)
                        .orElseThrow(() -> new ResourceNotFoundException("Item card with this ID does not exist")));
    }

    @Transactional
    @Override
    public CategoryResponse create(CategoryCreateUpdateRequest request) {
        Category category = Category.builder()
                .name(request.getName())
                .build();

        return mapper.map(categoryRepository.save(category));
    }

    @Transactional
    @Override
    public CategoryResponse update(UUID id, @Valid CategoryCreateUpdateRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category with this ID does not exist"));

        category.setName(request.getName());

        return mapper.map(categoryRepository.save(category));
    }

    @Override
    public void delete(UUID id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category with this ID does not exist"));

        categoryRepository.delete(category);
    }

}
