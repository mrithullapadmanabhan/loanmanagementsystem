package com.app.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.app.backend.communication.request.ItemCardCreateUpdateRequest;
import com.app.backend.communication.response.ItemCardResponse;
import com.app.backend.model.Category;
import com.app.backend.model.Make;
import com.app.backend.repository.CategoryRepository;
import com.app.backend.repository.EmployeeLoanRepository;
import com.app.backend.repository.EmployeeRepository;
import com.app.backend.repository.ItemCardRepository;
import com.app.backend.repository.LoanCardRepository;
import com.app.backend.repository.MakeRepository;
import com.app.backend.repository.RoleRepository;
import com.app.backend.repository.UserRepository;
import com.app.backend.service.CategoryService;
import com.app.backend.service.EmployeeLoanService;
import com.app.backend.service.EmployeeService;
import com.app.backend.service.ItemCardService;
import com.app.backend.service.LoanCardService;
import com.app.backend.service.MakeService;
import com.app.backend.service.auth.AuthenticationService;
import com.app.backend.service.auth.JWTService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

@RunWith(SpringRunner.class)
@WebMvcTest
@AutoConfigureMockMvc(addFilters = false)
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
        public void createTest() throws Exception {

                ItemCardCreateUpdateRequest itemCardRequest = new ItemCardCreateUpdateRequest();
                ItemCardResponse itemCardResponse = new ItemCardResponse();
                Category category = new Category();
                Make make = new Make();

                itemCardRequest.setMakeID(UUID.fromString("addd070d-8c4c-4f0d-9d8a-162843c10333"));
                itemCardRequest.setDescription("Wardrobe");
                itemCardRequest.setValue(1000.00);

                itemCardResponse.setId(UUID.fromString("acdd070d-8c4c-4f0d-9d8a-162843c10333"));
                itemCardResponse.setDescription("Wardrobe");
                itemCardResponse.setValue(1000.00);
                category.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0e02a2c3d479"));
                category.setName("Furniture");
                make.setId(UUID.fromString("addd070d-8c4c-4f0d-9d8a-162843c10333"));
                make.setName("Wood");
                make.setCategory(category);
                itemCardResponse.setMake(make.getId());

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
        public void getTest() throws Exception {

                List<ItemCardResponse> itemCardList = new ArrayList<ItemCardResponse>();
                ItemCardResponse itemCard = new ItemCardResponse();
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
                itemCard.setMake(make.getId());
                itemCardList.add(itemCard);

                itemCard.setId(UUID.fromString("f47aa10b-58cc-4372-a567-0e02b2c3d479"));
                itemCard.setDescription("Bracelet");
                itemCard.setValue(10000.00);
                category.setId(UUID.fromString("f47aa10b-58cc-4372-a567-0e02a2c3d479"));
                category.setName("Jewellery");
                make.setId(UUID.fromString("f47aa10b-58cc-4372-a567-0e02a2c3d479"));
                make.setName("Gold");
                make.setCategory(category);
                itemCard.setMake(make.getId());
                itemCardList.add(itemCard);

                Mockito.when(itemCardService.get()).thenReturn(itemCardList);

                mvc.perform(get("/api/itemcard")
                                .contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$[0].id",
                                                Matchers.equalTo(itemCardList.get(0).getId().toString())))
                                .andExpect(jsonPath("$[0].make",
                                                Matchers.equalTo(itemCardList.get(0).getMake())))
                                .andExpect(jsonPath("$[1].id",
                                                Matchers.equalTo(itemCardList.get(1).getId().toString())))
                                .andExpect(jsonPath("$[1].make",
                                                Matchers.equalTo(itemCardList.get(1).getMake())));
        }

        @Test
        public void getByEmployeeTest() throws Exception {

                List<ItemCardResponse> itemCardList = new ArrayList<ItemCardResponse>();
                ItemCardResponse itemCard = new ItemCardResponse();
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
                itemCard.setMake(make.getId());
                itemCardList.add(itemCard);

                itemCard.setId(UUID.fromString("f47aa10b-58cc-4372-a567-0e02b2c3d479"));
                itemCard.setDescription("Bracelet");
                itemCard.setValue(10000.00);
                category.setId(UUID.fromString("f47aa10b-58cc-4372-a567-0e02a2c3d479"));
                category.setName("Jewellery");
                make.setId(UUID.fromString("f47aa10b-58cc-4372-a567-0e02a2c3d479"));
                make.setName("Gold");
                make.setCategory(category);
                itemCard.setMake(make.getId());
                itemCardList.add(itemCard);

                Mockito.when(itemCardService.getByEmployee(ArgumentMatchers.any())).thenReturn(itemCardList);

                mvc.perform(get("/api/itemcard/employee/{employeeID}", employeeID)
                                .contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$[0].id",
                                                Matchers.equalTo(itemCardList.get(0).getId().toString())))
                                .andExpect(jsonPath("$[0].make",
                                                Matchers.equalTo(itemCardList.get(0).getMake())))
                                .andExpect(jsonPath("$[1].id",
                                                Matchers.equalTo(itemCardList.get(1).getId().toString())))
                                .andExpect(jsonPath("$[1].make",
                                                Matchers.equalTo(itemCardList.get(1).getMake())));
        }

        @Test
        public void getByMakeTest() throws Exception {

                ItemCardResponse itemCard = new ItemCardResponse();
                Make make = new Make();
                Category category = new Category();

                UUID makeID = UUID.fromString("f47ac10b-58cc-4372-a567-0a02a2c3d479");

                category.setId(UUID.fromString("f47aa10b-58cc-4372-a567-0e02a2c3d479"));
                category.setName("Furniture");
                make.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0a02a2c3d479"));
                make.setName("Wood");
                make.setCategory(category);
                itemCard.setMake(make.getId());

                itemCard.setId(UUID.fromString("f47ac10b-58cc-4372-a567-0e02b2c3d479"));
                itemCard.setDescription("Wardrobe");
                itemCard.setValue(1000.00);

                Mockito.when(itemCardService.getByMake(ArgumentMatchers.any())).thenReturn(itemCard);

                mvc.perform(get("/api/itemcard/make/{makeID}", makeID)
                                .contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.id", Matchers.equalTo(itemCard.getId().toString())))
                                .andExpect(jsonPath("$.make",
                                                Matchers.equalTo(itemCard.getMake())));
        }

        @Test
        public void deleteTest() throws Exception {
                UUID num = UUID.fromString("acde070d-8c4c-4f0d-9d8a-162843c10333");
                itemCardService.delete(num);
                mvc.perform(delete("/api/itemcard/{num}", num)
                                .contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isNoContent());
        }
}