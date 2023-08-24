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
public class EmployeeResponse {

    private UUID id;

    private String name;

    private String designation;

    private String department;

    private String gender;

    private Date dob;

    private Date doj;

    private String email;

}
