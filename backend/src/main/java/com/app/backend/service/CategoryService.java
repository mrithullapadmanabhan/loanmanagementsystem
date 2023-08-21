package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import com.app.backend.communication.request.CategoryCreateUpdateRequest;
import com.app.backend.model.Category;

import jakarta.validation.Valid;

public interface CategoryService {

    public abstract List<Category> get();

    public abstract Category create(@Valid CategoryCreateUpdateRequest request);

    public abstract Category update(UUID id, @Valid CategoryCreateUpdateRequest request);

    public abstract void delete(UUID id);

}
