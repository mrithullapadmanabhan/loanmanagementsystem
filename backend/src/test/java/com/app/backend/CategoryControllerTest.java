package com.app.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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

import com.app.backend.communication.request.CategoryCreateUpdateRequest;
import com.app.backend.model.Category;
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
        public void createTest() throws Exception {

                CategoryCreateUpdateRequest categoryRequest = new CategoryCreateUpdateRequest();
                Category categoryResponse = new Category();
                categoryRequest.setName("Vehicle");
                categoryResponse.setId(UUID.randomUUID());
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
        public void getTest() throws Exception {

                List<Category> categoryList = new ArrayList<Category>();
                Category category = new Category();
                category.setId(UUID.randomUUID());
                category.setName("Furniture");
                categoryList.add(category);
                category.setId(UUID.randomUUID());
                category.setName("Jewellery");
                categoryList.add(category);

                Mockito.when(categoryService.get()).thenReturn(categoryList);

                mvc.perform(get("/api/category")
                                .contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$[0].id",
                                                Matchers.equalTo(categoryList.get(0).getId().toString())))
                                .andExpect(jsonPath("$[1].id",
                                                Matchers.equalTo(categoryList.get(1).getId().toString())));
        }

        @Test
        public void getCategoryByIDtTest() throws Exception {

                Category category = new Category();
                UUID id = UUID.randomUUID();
                category.setId(id);
                category.setName("Furniture");

                Mockito.when(categoryService.get(ArgumentMatchers.any())).thenReturn(category);

                mvc.perform(get("/api/category/{id}", id)
                                .contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.id", Matchers.equalTo(category.getId().toString())))
                                .andExpect(jsonPath("$.name", Matchers.equalTo(category.getName())));
        }

        @Test
        public void updateTest() throws Exception {

                CategoryCreateUpdateRequest categoryRequest = new CategoryCreateUpdateRequest();
                Category categoryResponse = new Category();
                categoryRequest.setName("Vehicle");
                UUID id = UUID.randomUUID();
                categoryResponse.setId(id);
                categoryResponse.setName("Vehicle");

                Mockito.when(categoryService.update(ArgumentMatchers.any(), ArgumentMatchers.any()))
                                .thenReturn(categoryResponse);

                String categoryRequestString = mapper.writeValueAsString(categoryRequest);
                String categoryResponseString = mapper.writeValueAsString(categoryResponse);

                MvcResult requestResult = mvc.perform(put("/api/category/{id}", id)
                                .contentType(MediaType.APPLICATION_JSON)
                                .characterEncoding("utf-8")
                                .content(categoryRequestString))
                                .andExpect(status().isOk())
                                .andReturn();

                String categoryRequestResult = requestResult.getResponse().getContentAsString();
                assertEquals(categoryResponseString, categoryRequestResult);
        }

        @Test
        public void deleteTest() throws Exception {

                UUID id = UUID.randomUUID();

                mvc.perform(delete("/api/category/{id}", id)
                                .contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isNoContent());

                verify(categoryService, times(1)).delete(id);
        }

}