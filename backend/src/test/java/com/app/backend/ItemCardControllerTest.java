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

import com.app.backend.communication.request.ItemCardCreationRequest;
import com.app.backend.communication.response.ItemCardCreationResponse;
import com.app.backend.model.Category;
import com.app.backend.model.ItemCard;
import com.app.backend.model.Make;
import com.app.backend.repository.*;
import com.app.backend.service.*;
import com.app.backend.service.auth.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.util.UUID;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;

@RunWith(SpringRunner.class)
@WebMvcTest
@AutoConfigureMockMvc(addFilters=false)
public class ItemCardControllerTest {

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

        ItemCardCreationRequest itemCardRequest = new ItemCardCreationRequest();
        ItemCardCreationResponse itemCardResponse = new ItemCardCreationResponse();
        itemCardRequest.setMakeID(UUID.fromString("addd070d-8c4c-4f0d-9d8a-162843c10333"));
        itemCardRequest.setDescription("Wardrobe");
        itemCardRequest.setValue(1000.00);
        itemCardResponse.setItemCardID(UUID.fromString("acdd070d-8c4c-4f0d-9d8a-162843c10333"));

        Mockito.when(itemCardService.create(ArgumentMatchers.any())).thenReturn(itemCardResponse);

        String itemCardRequestString = mapper.writeValueAsString(itemCardRequest);
        String itemCardResponseString = mapper.writeValueAsString(itemCardResponse);
        
        MvcResult requestResult = mvc.perform(post("/api/itemcard/create")
        .contentType(MediaType.APPLICATION_JSON)
        .characterEncoding("utf-8")
        .content(itemCardRequestString))
        .andExpect(status().isCreated())
        .andReturn();

        String itemCardRequestResult = requestResult.getResponse().getContentAsString();
        assertEquals(itemCardResponseString, itemCardRequestResult);
    }

    @Test
    public void getTest() throws Exception{

        List<ItemCard> itemCardList = new ArrayList<ItemCard>();
        ItemCard itemCard = new ItemCard();
        Make make = new Make();
        Category category = new Category();

        itemCard.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0e02b2c3d479"));
        itemCard.setDescription("Wardrobe");
        itemCard.setValue(1000.00);
        category.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0e02a2c3d479"));
        category.setName("Furniture");
        make.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0a02a2c3d479"));
        make.setName("Wood");
        make.setCategory(category);
        itemCard.setMake(make);
        itemCardList.add(itemCard);

        itemCard.setId(UUID.fromString("f47aa10b-58cc-4372-a567-0e02b2c3d479"));
        itemCard.setDescription("Bracelet");
        itemCard.setValue(10000.00);
        category.setId(UUID.fromString("f47aa10b-58cc-4372-a567-0e02a2c3d479"));
        category.setName("Jewellery");
        make.setId(UUID.fromString("f47aa10b-58cc-4372-a567-0e02a2c3d479"));
        make.setName("Gold");
        make.setCategory(category);
        itemCard.setMake(make);
        itemCardList.add(itemCard);

        Mockito.when(itemCardService.get()).thenReturn(itemCardList);
        
        mvc.perform(get("/api/itemcard/")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].id",Matchers.equalTo(itemCardList.get(0).getId().toString())))
            .andExpect(jsonPath("$[0].make.id",Matchers.equalTo(itemCardList.get(0).getMake().getId().toString())))
            .andExpect(jsonPath("$[1].id",Matchers.equalTo(itemCardList.get(1).getId().toString())))
            .andExpect(jsonPath("$[1].make.id",Matchers.equalTo(itemCardList.get(1).getMake().getId().toString())));
    }

    @Test
    public void getByEmployeeIDTest() throws Exception{

        List<ItemCard> itemCardList = new ArrayList<ItemCard>();
        ItemCard itemCard = new ItemCard();
        Make make = new Make();
        Category category = new Category();

        UUID employeeID = UUID.fromString("f47ac10b-58cc-4372-a567-0e02a2c3d479");

        itemCard.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0e02b2c3d479"));
        itemCard.setDescription("Wardrobe");
        itemCard.setValue(1000.00);
        category.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0e02a2c3d479"));
        category.setName("Furniture");
        make.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0a02a2c3d479"));
        make.setName("Wood");
        make.setCategory(category);
        itemCard.setMake(make);
        itemCardList.add(itemCard);

        itemCard.setId(UUID.fromString("f47aa10b-58cc-4372-a567-0e02b2c3d479"));
        itemCard.setDescription("Bracelet");
        itemCard.setValue(10000.00);
        category.setId(UUID.fromString("f47aa10b-58cc-4372-a567-0e02a2c3d479"));
        category.setName("Jewellery");
        make.setId(UUID.fromString("f47aa10b-58cc-4372-a567-0e02a2c3d479"));
        make.setName("Gold");
        make.setCategory(category);
        itemCard.setMake(make);
        itemCardList.add(itemCard);

        Mockito.when(itemCardService.getByEmployeeID(ArgumentMatchers.any())).thenReturn(itemCardList);
        
        mvc.perform(get("/api/itemcard/employee/{employeeID}", employeeID)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].id",Matchers.equalTo(itemCardList.get(0).getId().toString())))
            .andExpect(jsonPath("$[0].make.id",Matchers.equalTo(itemCardList.get(0).getMake().getId().toString())))
            .andExpect(jsonPath("$[1].id",Matchers.equalTo(itemCardList.get(1).getId().toString())))
            .andExpect(jsonPath("$[1].make.id",Matchers.equalTo(itemCardList.get(1).getMake().getId().toString())));
    }

    @Test
    public void getByMakeIDTest() throws Exception{

        ItemCard itemCard = new ItemCard();
        Make make = new Make();
        Category category = new Category();

        UUID makeID = UUID.fromString("f47ac10b-58cc-4372-a567-0e02a2c3d479");

        category.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0e02a2c3d479"));
        category.setName("Furniture");
        make.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0a02a2c3d479"));
        make.setName("Wood");
        make.setCategory(category);
        itemCard.setMake(make);

        itemCard.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0e02b2c3d479"));
        itemCard.setDescription("Wardrobe");
        itemCard.setValue(1000.00);

        Optional<ItemCard> itemCardList = Optional.of(itemCard);

        Mockito.when(itemCardService.getByMakeID(ArgumentMatchers.any())).thenReturn(itemCardList);
        
        mvc.perform(get("/api/itemcard/make/{makeID}", makeID)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id",Matchers.equalTo(itemCardList.get().getId().toString())))
            .andExpect(jsonPath("$.make.id",Matchers.equalTo(itemCardList.get().getMake().getId().toString())));
    }

}