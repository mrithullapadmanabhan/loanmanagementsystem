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

import com.app.backend.communication.request.LoanCardCreateUpdateRequest;
import com.app.backend.model.Category;
import com.app.backend.model.LoanCard;
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
public class LoanCardControllerTest {

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

        LoanCardCreateUpdateRequest loanCardRequest = new LoanCardCreateUpdateRequest();
        LoanCard loanCardResponse = new LoanCard();
        Category category = new Category();
        category.setId(UUID.fromString("addd070d-8c4c-4f0d-9d8a-162843c10333"));
        category.setName("Furniture");
        loanCardRequest.setCategoryID(UUID.fromString("addd070d-8c4c-4f0d-9d8a-162843c10333"));
        loanCardRequest.setDuration(9);
        loanCardResponse.setId(UUID.fromString("acdd070d-8c4c-4f0d-9d8a-162843c10333"));
        loanCardResponse.setDuration(9);
        loanCardResponse.setCategory(category);

        Mockito.when(loanCardService.create(ArgumentMatchers.any())).thenReturn(loanCardResponse);

        String loanCardRequestString = mapper.writeValueAsString(loanCardRequest);
        String loanCardResponseString = mapper.writeValueAsString(loanCardResponse);
        
        MvcResult requestResult = mvc.perform(post("/api/loancard")
        .contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8")
        .content(loanCardRequestString))
        .andExpect(status().isCreated())
        .andReturn();

        String loanCardRequestResult = requestResult.getResponse().getContentAsString();
        assertEquals(loanCardResponseString, loanCardRequestResult);
    }

    @Test
    public void getTest() throws Exception{

        List<LoanCard> loanCardList = new ArrayList<LoanCard>();
        LoanCard loanCard = new LoanCard();
        Category category = new Category();

        category.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0e02a2c3d479"));
        category.setName("Jewellery");

        loanCard.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0e02b2c3d479"));
        loanCard.setDuration(9);
        loanCard.setCategory(category);
        loanCardList.add(loanCard);

        category.setId(UUID.fromString("f47ac10b-58ac-4372-a567-0e02a2c3d479"));
        category.setName("Furniture");

        loanCard.setId(UUID.fromString("f47ac10b-58ac-4372-a567-0a02b2c3d479"));
        loanCard.setDuration(5);
        loanCard.setCategory(category);
        loanCardList.add(loanCard);

        Mockito.when(loanCardService.get()).thenReturn(loanCardList);
        
        mvc.perform(get("/api/loancard")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].id",Matchers.equalTo(loanCardList.get(0).getId().toString())))
            .andExpect(jsonPath("$[0].category.id",Matchers.equalTo(loanCardList.get(0).getCategory().getId().toString())))
            .andExpect(jsonPath("$[1].id",Matchers.equalTo(loanCardList.get(1).getId().toString())))
            .andExpect(jsonPath("$[1].category.id",Matchers.equalTo(loanCardList.get(1).getCategory().getId().toString())));
    }

    @Test
    public void getLoanCardTest() throws Exception{

        LoanCard loanCard = new LoanCard();
        Category category = new Category();

        UUID ID = UUID.fromString("f47ac10b-58cc-4372-a567-0e02a2c3d479");

        loanCard.setId(ID);
        loanCard.setDuration(10);
        category.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0e02b2c3d479"));
        category.setName("Furniture");
        loanCard.setCategory(category);

        Mockito.when(loanCardService.get(ArgumentMatchers.any())).thenReturn(loanCard);
        
        mvc.perform(get("/api/loancard/{ID}", ID)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id",Matchers.equalTo(loanCard.getId().toString())))
            .andExpect(jsonPath("$.duration",Matchers.equalTo(loanCard.getDuration())))
            .andExpect(jsonPath("$.category.id",Matchers.equalTo(loanCard.getCategory().getId().toString())))
            ;
    }

}