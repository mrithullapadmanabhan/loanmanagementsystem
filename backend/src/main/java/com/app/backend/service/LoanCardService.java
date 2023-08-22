package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import com.app.backend.communication.request.LoanCardCreateUpdateRequest;
import com.app.backend.communication.response.LoanCardResponse;

import jakarta.validation.Valid;

public interface LoanCardService {

    public abstract List<LoanCardResponse> get();

    public abstract LoanCardResponse get(UUID id);

    public abstract LoanCardResponse create(@Valid LoanCardCreateUpdateRequest request);

    public abstract LoanCardResponse update(UUID id, @Valid LoanCardCreateUpdateRequest request);

    public abstract void delete(UUID id);

}
