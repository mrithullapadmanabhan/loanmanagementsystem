package com.app.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "com")
@SpringBootTest(classes = {CategoryControllerTest.class, EmployeeControllerTest.class, MakeControllerTest.class, LoanCardControllerTest.class, ItemCardControllerTest.class})
class BackendApplicationTests {

	@Test
	void contextLoads() {
	}
}
