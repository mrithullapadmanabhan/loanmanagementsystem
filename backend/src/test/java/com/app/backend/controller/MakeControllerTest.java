package com.app.backend.controller;

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

import com.app.backend.communication.request.MakeCreateUpdateRequest;
import com.app.backend.communication.response.MakeResponse;
import com.app.backend.model.Category;
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

        ObjectMapper mapper = new ObjectMapper()
                        .findAndRegisterModules()
                        .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        @Test
        public void createTest() throws Exception {

                MakeCreateUpdateRequest makeRequest = new MakeCreateUpdateRequest();
                MakeResponse makeResponse = new MakeResponse();
                Category category = new Category();
                UUID categoryID = UUID.randomUUID();
                category.setId(categoryID);
                category.setName("Furniture");
                makeRequest.setCategoryID(categoryID);
                makeRequest.setName("Wood");
                makeResponse.setId(UUID.randomUUID());
                makeResponse.setName("Wood");
                makeResponse.setCategory(category.getId());

                Mockito.when(makeService.create(ArgumentMatchers.any())).thenReturn(makeResponse);

                String makeRequestString = mapper.writeValueAsString(makeRequest);
                String makeResponseString = mapper.writeValueAsString(makeResponse);

                MvcResult requestResult = mvc.perform(post("/api/make")
                                .contentType(MediaType.APPLICATION_JSON)
                                .characterEncoding("utf-8")
                                .content(makeRequestString))
                                .andExpect(status().isCreated())
                                .andReturn();

                String makeRequestResult = requestResult.getResponse().getContentAsString();
                assertEquals(makeResponseString, makeRequestResult);
        }

        @Test
        public void getTest() throws Exception {

                List<MakeResponse> makeList = new ArrayList<MakeResponse>();
                MakeResponse make = new MakeResponse();
                Category category = new Category();

                make.setId(UUID.randomUUID());
                make.setName("Gold");
                category.setId(UUID.randomUUID());
                category.setName("Jewellery");
                make.setCategory(category.getId());
                makeList.add(make);

                make.setId(UUID.randomUUID());
                make.setName("Wood");
                category.setId(UUID.randomUUID());
                category.setName("Furniture");
                make.setCategory(category.getId());
                makeList.add(make);

                Mockito.when(makeService.get()).thenReturn(makeList);

                mvc.perform(get("/api/make")
                                .contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$[0].id", Matchers.equalTo(makeList.get(0).getId().toString())))
                                .andExpect(jsonPath("$[0].category",
                                                Matchers.equalTo(makeList.get(0).getCategory().toString())))
                                .andExpect(jsonPath("$[1].id", Matchers.equalTo(makeList.get(1).getId().toString())))
                                .andExpect(jsonPath("$[1].category",
                                                Matchers.equalTo(makeList.get(1).getCategory().toString())));
        }

        @Test
        public void getByCategoryTest() throws Exception {

                List<MakeResponse> makeList = new ArrayList<MakeResponse>();
                MakeResponse make = new MakeResponse();
                Category category = new Category();

                UUID categoryID = UUID.randomUUID();

                category.setId(categoryID);
                category.setName("Jewellery");

                make.setId(UUID.randomUUID());
                make.setName("Gold");
                make.setCategory(category.getId());
                makeList.add(make);

                make.setId(UUID.randomUUID());
                make.setName("Silver");
                make.setCategory(category.getId());
                makeList.add(make);

                Mockito.when(makeService.getByCategory(ArgumentMatchers.any())).thenReturn(makeList);

                mvc.perform(get("/api/make/category/{categoryID}", categoryID)
                                .contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$[0].id", Matchers.equalTo(makeList.get(0).getId().toString())))
                                .andExpect(jsonPath("$[0].category",
                                                Matchers.equalTo(makeList.get(0).getCategory().toString())))
                                .andExpect(jsonPath("$[1].id", Matchers.equalTo(makeList.get(1).getId().toString())))
                                .andExpect(jsonPath("$[1].category",
                                                Matchers.equalTo(makeList.get(1).getCategory().toString())));
        }

        @Test
        public void updateTest() throws Exception {

                MakeCreateUpdateRequest makeRequest = new MakeCreateUpdateRequest();
                MakeResponse makeResponse = new MakeResponse();
                Category category = new Category();
                UUID categoryID = UUID.randomUUID();
                category.setId(categoryID);
                category.setName("Furniture");
                makeRequest.setCategoryID(categoryID);
                makeRequest.setName("Wood");

                UUID id = UUID.randomUUID();
                makeResponse.setId(id);
                makeResponse.setName("Wood");
                makeResponse.setCategory(category.getId());

                Mockito.when(makeService.update(ArgumentMatchers.any(), ArgumentMatchers.any()))
                                .thenReturn(makeResponse);

                String makeRequestString = mapper.writeValueAsString(makeRequest);
                String makeResponseString = mapper.writeValueAsString(makeResponse);

                MvcResult requestResult = mvc.perform(put("/api/make/{id}", id)
                                .contentType(MediaType.APPLICATION_JSON)
                                .characterEncoding("utf-8")
                                .content(makeRequestString))
                                .andExpect(status().isOk())
                                .andReturn();

                String makeRequestResult = requestResult.getResponse().getContentAsString();
                assertEquals(makeResponseString, makeRequestResult);
        }

        @Test
        public void deleteTest() throws Exception {

                UUID id = UUID.randomUUID();

                mvc.perform(delete("/api/make/{id}", id)
                                .contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isNoContent());

                verify(makeService, times(1)).delete(id);
        }

}
