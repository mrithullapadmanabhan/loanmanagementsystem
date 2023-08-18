package com.app.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
@ComponentScan(basePackages = "com")
@SpringBootTest(classes = com.app.backend.CategoryControllerTest.class)
class BackendApplicationTests {

	@Test
	void contextLoads() {
	}

}
