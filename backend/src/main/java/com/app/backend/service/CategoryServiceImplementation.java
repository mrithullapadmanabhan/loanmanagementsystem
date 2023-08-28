package com.app.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionSystemException;

import com.app.backend.communication.request.CategoryCreateUpdateRequest;
import com.app.backend.communication.response.CategoryResponse;
import com.app.backend.exception.ResourceNotFoundException;
import com.app.backend.model.Category;
import com.app.backend.model.LoanCard;
import com.app.backend.model.Make;
import com.app.backend.repository.CategoryRepository;
import com.app.backend.repository.LoanCardRepository;
import com.app.backend.repository.MakeRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImplementation implements CategoryService {

    private final CategoryRepository categoryRepository;

    private final LoanCardRepository loanCardRepository;

    private final MakeServiceImplementation makeService;

    private final MakeRepository makeRepository;

    private final LoanCardService loanCardService;

    private final ModelMapper mapper;

    @Override
    public List<CategoryResponse> get() {
        return categoryRepository.findAll().stream()
                .map((category) -> mapper.map(category, CategoryResponse.class)).toList();

    }

    @Override
    public CategoryResponse get(UUID categoryID) {
        return mapper.map(
                categoryRepository.findById(categoryID)
                        .orElseThrow(() -> new ResourceNotFoundException("Item card with this ID does not exist")),
                CategoryResponse.class);
    }

    @Override
    public CategoryResponse create(CategoryCreateUpdateRequest request) {
        try {
            Category category = Category.builder()
                    .name(request.getName())
                    .build();

            return mapper.map(categoryRepository.save(category), CategoryResponse.class);

        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("Category name should be unique");
        } catch (TransactionSystemException e) {
            throw new TransactionSystemException("Category name can't be empty");
        }
    }

    @Override
    public CategoryResponse update(UUID id, @Valid CategoryCreateUpdateRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category with this ID does not exist"));

        category.setName(request.getName());

        try {
            return mapper.map(categoryRepository.save(category), CategoryResponse.class);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("Category should be unique");
        } catch (TransactionSystemException e) {
            throw new TransactionSystemException("Category can't be empty");
        }

    }

    @Override
    public void delete(UUID id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category with this ID does not exist"));

        List<Make> makes = makeRepository.findByCategory(category);

        for (Make make : makes) {

            makeService.delete(make.getId());
        }

        Optional<LoanCard> loanCard = loanCardRepository.findByCategory(category);
        if (loanCard.isPresent()) {
            loanCardService.delete(loanCard.get().getId());
        }
        categoryRepository.delete(category);

    }

}
