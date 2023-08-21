package com.app.backend.service;

import java.util.List;
import java.util.UUID;

import com.app.backend.communication.request.LoanCardCreateUpdateRequest;
import com.app.backend.model.LoanCard;

import jakarta.validation.Valid;

public interface LoanCardService {

    public abstract List<LoanCard> get();

    public abstract LoanCard get(UUID id);

    public abstract LoanCard create(@Valid LoanCardCreateUpdateRequest request);

    public abstract LoanCard update(UUID id, @Valid LoanCardCreateUpdateRequest request);

    public abstract void delete(UUID id);

}
