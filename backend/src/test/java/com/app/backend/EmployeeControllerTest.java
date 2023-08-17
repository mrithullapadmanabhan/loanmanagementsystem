// package com.app.backend;

// import java.awt.PageAttributes.MediaType;

// import org.junit.Test;
// import org.junit.runner.RunWith;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.test.context.junit4.SpringRunner;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
// import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

// import com.app.backend.service.EmployeeService;
// import com.app.backend.model.Employee;
// import com.app.backend.repository.EmployeeLoanRepository;
// import com.app.backend.repository.EmployeeRepository;
// import com.fasterxml.jackson.databind.ObjectMapper;

// @RunWith(SpringRunner.class)
// @WebMvcTest
// public class EmployeeControllerTest {
 
//   @Autowired
//   private MockMvc mvc;
  
//   @MockBean
//   EmployeeService employeeService;

//   @MockBean
//   EmployeeRepository employeeRepository;
  
//   @Test
//   public void createEmployeeAPI() throws Exception 
//   {
//     Employee emp= new Employee();
//     mvc.perform( MockMvcRequestBuilders
//   	      .post("/employees")
//   	      .content(asJsonString(new EmployeeVO(null, "firstName4", "lastName4", "email4@mail.com")))
//   	      .contentType(MediaType.APPLICATION_JSON)
//   	      .accept(MediaType.APPLICATION_JSON))
//         .andExpect(status().isOk())
//         .andExpect(MockMvcResultMatchers.jsonPath("$.employeeId").exists());
//   }
   
//   public static String asJsonString(final Object obj) {
//       try {
//           return new ObjectMapper().writeValueAsString(obj);
//       } catch (Exception e) {
//           throw new RuntimeException(e);
//       }
//   }
 
// }