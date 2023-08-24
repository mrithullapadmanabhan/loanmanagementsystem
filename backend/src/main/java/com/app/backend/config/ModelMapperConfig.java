package com.app.backend.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.app.backend.communication.response.CategoryResponse;
import com.app.backend.communication.response.EmployeeLoanResponse;
import com.app.backend.communication.response.EmployeeResponse;
import com.app.backend.communication.response.ItemCardResponse;
import com.app.backend.communication.response.LoanCardResponse;
import com.app.backend.communication.response.MakeResponse;
import com.app.backend.model.Category;
import com.app.backend.model.Employee;
import com.app.backend.model.EmployeeLoan;
import com.app.backend.model.ItemCard;
import com.app.backend.model.LoanCard;
import com.app.backend.model.Make;

@Configuration
public class ModelMapperConfig {

        @Bean
        public ModelMapper modelMapper() {
                ModelMapper modelMapper = new ModelMapper();

                modelMapper.typeMap(Category.class, CategoryResponse.class)
                                .addMappings((mapper) -> {
                                        mapper.map(Category::getId, CategoryResponse::setId);
                                });

                modelMapper.typeMap(EmployeeLoan.class, EmployeeLoanResponse.class)
                                .addMappings((mapper) -> {
                                        mapper.map(loan -> loan.getEmployee().getId(),
                                                        EmployeeLoanResponse::setEmployee);
                                        mapper.map(loan -> loan.getItem().getId(), EmployeeLoanResponse::setItem);
                                        mapper.map(loan -> loan.getLoan().getId(), EmployeeLoanResponse::setLoan);
                                });

                modelMapper.typeMap(Employee.class, EmployeeResponse.class)
                                .addMappings((mapper) -> {
                                        mapper.map(employee -> employee.getUser().getEmail(),
                                                        EmployeeResponse::setEmail);
                                });

                modelMapper.typeMap(ItemCard.class, ItemCardResponse.class)
                                .addMappings((mapper) -> {
                                        mapper.map(itemCard -> itemCard.getMake().getId(),
                                                        ItemCardResponse::setMake);
                                });

                modelMapper.typeMap(LoanCard.class, LoanCardResponse.class)
                                .addMappings((mapper) -> {
                                        mapper.map(loanCard -> loanCard.getCategory().getId(),
                                                        LoanCardResponse::setCategory);
                                });

                modelMapper.typeMap(Make.class, MakeResponse.class)
                                .addMappings((mapper) -> {
                                        mapper.map(make -> make.getCategory().getId(), MakeResponse::setCategory);
                                });

                return modelMapper;
        }

}
