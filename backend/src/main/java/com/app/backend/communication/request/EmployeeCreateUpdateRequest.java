package com.app.backend.communication.request;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeCreateUpdateRequest {

	@Email(message = "Email is invalid")
	// @NotNull(message = "Email must not be Null")
	private String email;

	// one number, one lowercase character, one uppercase character, one symbol, and
	// minlength 8
	@Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,}$", message = "Password must have atleast one lowercase character, one uppercase character, one number, one symbol and minimum length of 8")
	private String password;

	@NotBlank(message = "Name cannot be blank")
	@Size(min = 5, max = 28, message = "Name can only be from 5 to 15 characters")
	private String name;

	@NotBlank(message = "Designation cannot be blank")
	private String designation;

	@NotBlank(message = "Department cannot be blank")
	private String department;

	@NotBlank(message = "Gender cannot be blank")
	private String gender;

	@JsonFormat(pattern = "dd-mm-yyyy")
	private Date dob;

	@JsonFormat(pattern = "dd-mm-yyyy")
	private Date doj;

}
