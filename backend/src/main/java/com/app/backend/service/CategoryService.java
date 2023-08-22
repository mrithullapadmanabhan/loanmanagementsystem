package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import com.app.backend.communication.request.CategoryCreateUpdateRequest;
import com.app.backend.communication.response.CategoryResponse;

import jakarta.validation.Valid;

public interface CategoryService {

    public abstract List<CategoryResponse> get();

    public abstract CategoryResponse get(UUID id);

    public abstract CategoryResponse create(@Valid CategoryCreateUpdateRequest request);

    public abstract CategoryResponse update(UUID id, @Valid CategoryCreateUpdateRequest request);

    public abstract void delete(UUID id);

}
