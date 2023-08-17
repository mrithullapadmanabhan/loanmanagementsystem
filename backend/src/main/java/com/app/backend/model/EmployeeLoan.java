package com.app.backend.model;

import java.sql.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class EmployeeLoan {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.STRING)
    @NotNull
    private LoanStatusEnum status;

    @JsonFormat(pattern = "dd-mm-yyyy")
	private Date issueDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonManagedReference
    private Employee employee;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonManagedReference
    private LoanCard loan;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonManagedReference
    private ItemCard item;

}