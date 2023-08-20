package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import com.app.backend.communication.request.MakeCreateUpdateRequest;
import com.app.backend.model.Make;

import jakarta.validation.Valid;

public interface MakeService {

    public abstract List<Make> get();

    public abstract List<Make> getByCategory(UUID categoryID);

    public abstract Make create(@Valid MakeCreateUpdateRequest request);

    public abstract Make update(UUID id, @Valid MakeCreateUpdateRequest request);

    public abstract void delete(UUID id);

}
