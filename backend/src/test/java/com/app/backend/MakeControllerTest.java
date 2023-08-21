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

import com.app.backend.communication.request.MakeCreateUpdateRequest;
import com.app.backend.model.Category;
import com.app.backend.model.Make;
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
public class MakeControllerTest {

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

        MakeCreateUpdateRequest makeRequest = new MakeCreateUpdateRequest();
        Make makeResponse = new Make();
        Category category = new Category();
        category.setId(UUID.fromString("addd070d-8c4c-4f0d-9d8a-162843c10333"));
        category.setName("Furniture");
        makeRequest.setCategoryID(UUID.fromString("addd070d-8c4c-4f0d-9d8a-162843c10333"));
        makeRequest.setName("Wood");
        makeResponse.setId(UUID.fromString("acdd070d-8c4c-4f0d-9d8a-162843c10333"));
        makeResponse.setName("Wood");
        makeResponse.setCategory(category);

        Mockito.when(makeService.create(ArgumentMatchers.any())).thenReturn(makeResponse);

        String makeRequestString = mapper.writeValueAsString(makeRequest);
        String makeResponseString = mapper.writeValueAsString(makeResponse);
        
        MvcResult requestResult = mvc.perform(post("/api/make/create")
        .contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8")
        .content(makeRequestString))
        .andExpect(status().isCreated())
        .andReturn();

        String makeRequestResult = requestResult.getResponse().getContentAsString();
        assertEquals(makeResponseString, makeRequestResult);
    }

    @Test
    public void getTest() throws Exception{

        List<Make> makeList = new ArrayList<Make>();
        Make make = new Make();
        Category category = new Category();

        make.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0e02b2c3d479"));
        make.setName("Gold");
        category.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0e02a2c3d479"));
        category.setName("Jewellery");
        make.setCategory(category);
        makeList.add(make);

        make.setId(UUID.fromString("f47ac10b-58ac-4372-a567-0e02b2c3d479"));
        make.setName("Wood");
        category.setId(UUID.fromString("f47ac10a-58cc-4372-a567-0e02b2c3d479"));
        category.setName("Furniture");
        make.setCategory(category);
        makeList.add(make);

        Mockito.when(makeService.get()).thenReturn(makeList);
        
        mvc.perform(get("/api/make")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].id",Matchers.equalTo(makeList.get(0).getId().toString())))
            .andExpect(jsonPath("$[0].category.id",Matchers.equalTo(makeList.get(0).getCategory().getId().toString())))
            .andExpect(jsonPath("$[1].id",Matchers.equalTo(makeList.get(1).getId().toString())))
            .andExpect(jsonPath("$[1].category.id",Matchers.equalTo(makeList.get(1).getCategory().getId().toString())));
    }

    @Test
    public void getByCategoryTest() throws Exception{

        List<Make> makeList = new ArrayList<Make>();
        Make make = new Make();
        Category category = new Category();

        category.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0e02a2c3d479"));
        category.setName("Jewellery");

        make.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0e02b2c3d479"));
        make.setName("Gold");
        make.setCategory(category);
        makeList.add(make);

        make.setId(UUID.fromString("f47ac10b-58ac-4372-a567-0e02b2c3d479"));
        make.setName("Silver");
        make.setCategory(category);
        makeList.add(make);

        UUID categoryID = UUID.fromString("f47ac10b-58cc-4372-a567-0e02a2c3d479");

        Mockito.when(makeService.getByCategory(ArgumentMatchers.any())).thenReturn(makeList);
        
        mvc.perform(get("/api/make/category/{categoryID}", categoryID)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].id",Matchers.equalTo(makeList.get(0).getId().toString())))
            .andExpect(jsonPath("$[0].category.id",Matchers.equalTo(makeList.get(0).getCategory().getId().toString())))
            .andExpect(jsonPath("$[1].id",Matchers.equalTo(makeList.get(1).getId().toString())))
            .andExpect(jsonPath("$[1].category.id",Matchers.equalTo(makeList.get(1).getCategory().getId().toString())));
    }

}

