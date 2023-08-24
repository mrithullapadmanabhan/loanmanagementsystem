package com.app.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;

import com.app.backend.controller.CategoryControllerTest;
import com.app.backend.controller.EmployeeControllerTest;
import com.app.backend.controller.EmployeeLoanControllerTest;
import com.app.backend.controller.ItemCardControllerTest;
import com.app.backend.controller.LoanCardControllerTest;
import com.app.backend.controller.MakeControllerTest;

@ComponentScan(basePackages = "com")
@SpringBootTest(classes = { CategoryControllerTest.class, EmployeeControllerTest.class, MakeControllerTest.class,
		LoanCardControllerTest.class, ItemCardControllerTest.class, EmployeeLoanControllerTest.class })
class BackendApplicationTests {

	@Test
	void contextLoads() {
	}

}
