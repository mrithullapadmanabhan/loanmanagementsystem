package com.app.backend;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import com.app.backend.communication.request.CategoryCreateUpdateRequest;
import com.app.backend.model.Category;
import com.app.backend.repository.*;
import com.app.backend.service.*;
import com.app.backend.service.auth.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.util.UUID;
import java.util.ArrayList;
import java.util.List;

import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;

@RunWith(SpringRunner.class)
@WebMvcTest
@AutoConfigureMockMvc(addFilters=false)
public class CategoryControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private CategoryService categoryService;

    @MockBean
    private EmployeeLoanService employeeLoanService;

    @MockBean
    private EmployeeService employeeService;

    @MockBean
    private ItemCardService itemCardService;

    @MockBean
    private LoanCardService loanCardService;

    @MockBean
    private MakeService makeService;

    @MockBean
    private AuthenticationService authenticationService;

    @MockBean
    private JWTService jwtService;
    
    @MockBean
    private CategoryRepository categoryRepository;

    @MockBean
    private EmployeeRepository employeeRepository;

    @MockBean
    private EmployeeLoanRepository employeeLoanRepository;

    @MockBean
    private ItemCardRepository itemCardRepository;

    @MockBean
    private LoanCardRepository loanCardRepository;

    @MockBean
    private MakeRepository makeRepository;

    @MockBean
    private RoleRepository roleRepository;

    @MockBean
    private UserRepository userRepository;

    ObjectMapper mapper = new ObjectMapper()
                        .findAndRegisterModules()
                        .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
 
    @Test
    public void createTest() throws Exception{

        CategoryCreateUpdateRequest categoryRequest = new CategoryCreateUpdateRequest();
        Category categoryResponse = new Category();
        categoryRequest.setName("Vehicle");
        categoryResponse.setId(UUID.fromString("acdd070d-8c4c-4f0d-9d8a-162843c10333"));
        categoryResponse.setName("Vehicle");

        Mockito.when(categoryService.create(ArgumentMatchers.any())).thenReturn(categoryResponse);

        String categoryRequestString = mapper.writeValueAsString(categoryRequest);
        String categoryResponseString = mapper.writeValueAsString(categoryResponse);
        
        MvcResult requestResult = mvc.perform(post("/api/category")
        .contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8")
        .content(categoryRequestString))
        .andExpect(status().isCreated())
        .andReturn();

        String categoryRequestResult = requestResult.getResponse().getContentAsString();
        assertEquals(categoryResponseString, categoryRequestResult);
    }

    @Test
    public void getTest() throws Exception{

        List<Category> categoryList = new ArrayList<Category>();
        Category category = new Category();
        category.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0e02b2c3d479"));
        category.setName("Furniture");
        categoryList.add(category);
        category.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0a02b2c3d479"));
        category.setName("Jewellery");
        categoryList.add(category);

        Mockito.when(categoryService.get()).thenReturn(categoryList);
        
        mvc.perform(get("/api/category")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].id",Matchers.equalTo(categoryList.get(0).getId().toString())))
            .andExpect(jsonPath("$[1].id",Matchers.equalTo(categoryList.get(1).getId().toString())));
    }

}