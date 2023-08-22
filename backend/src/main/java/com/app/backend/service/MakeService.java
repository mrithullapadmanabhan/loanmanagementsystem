package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import com.app.backend.communication.request.MakeCreateUpdateRequest;
import com.app.backend.communication.response.MakeResponse;

import jakarta.validation.Valid;

public interface MakeService {

    public abstract List<MakeResponse> get();

    public abstract MakeResponse get(UUID id);

    public abstract List<MakeResponse> getByCategory(UUID categoryID);

    public abstract MakeResponse create(@Valid MakeCreateUpdateRequest request);

    public abstract MakeResponse update(UUID id, @Valid MakeCreateUpdateRequest request);

    public abstract void delete(UUID id);

}
