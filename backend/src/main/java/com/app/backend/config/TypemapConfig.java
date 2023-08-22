package com.app.backend.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
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
public class TypemapConfig {

    @Bean
    public TypeMap<Category, CategoryResponse> categoryTypeMap() {
        return new ModelMapper().createTypeMap(Category.class,
                CategoryResponse.class);
    }

    @Bean
    public TypeMap<EmployeeLoan, EmployeeLoanResponse> employeeLoanTypeMap() {
        ModelMapper modelMapper = new ModelMapper();
        TypeMap<EmployeeLoan, EmployeeLoanResponse> mapper = modelMapper.createTypeMap(EmployeeLoan.class,
                EmployeeLoanResponse.class);
        mapper.addMapping(loan -> loan.getEmployee().getId(), EmployeeLoanResponse::setEmployee);
        mapper.addMapping(loan -> loan.getItem().getId(), EmployeeLoanResponse::setItem);
        mapper.addMapping(loan -> loan.getLoan().getId(), EmployeeLoanResponse::setLoan);
        mapper.addMapping(loan -> loan.getStatus().name(), EmployeeLoanResponse::setStatus);
        return mapper;
    }

    @Bean
    public TypeMap<Employee, EmployeeResponse> employeeTypeMap() {
        TypeMap<Employee, EmployeeResponse> mapper = new ModelMapper().createTypeMap(Employee.class,
                EmployeeResponse.class);
        mapper.addMapping(employee -> employee.getUser().getId(), EmployeeResponse::setUser);
        return mapper;
    }

    @Bean
    public TypeMap<ItemCard, ItemCardResponse> itemCardTypeMap() {
        TypeMap<ItemCard, ItemCardResponse> mapper = new ModelMapper().createTypeMap(ItemCard.class,
                ItemCardResponse.class);
        mapper.addMapping(itemCard -> itemCard.getMake().getId(), ItemCardResponse::setMake);
        return mapper;
    }

    @Bean
    public TypeMap<LoanCard, LoanCardResponse> loanCardTypeMap() {
        TypeMap<LoanCard, LoanCardResponse> mapper = new ModelMapper().createTypeMap(LoanCard.class,
                LoanCardResponse.class);
        mapper.addMapping(loanCard -> loanCard.getCategory().getId(), LoanCardResponse::setCategory);
        return mapper;
    }

    @Bean
    public TypeMap<Make, MakeResponse> makTypeMap() {
        TypeMap<Make, MakeResponse> mapper = new ModelMapper().createTypeMap(Make.class,
                MakeResponse.class);
        mapper.addMapping(make -> make.getCategory().getId(), MakeResponse::setCategory);
        return mapper;
    }

}
