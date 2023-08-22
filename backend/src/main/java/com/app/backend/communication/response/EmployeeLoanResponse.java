package com.app.backend.communication.response;

import java.sql.Date;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeLoanResponse {

    private UUID id;

    private String status;

    private Date issueDate;

    private UUID employee;

    private UUID loan;

    private UUID item;

}
