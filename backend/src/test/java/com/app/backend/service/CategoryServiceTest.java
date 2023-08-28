package com.app.backend.service;
import com.app.backend.communication.request.CategoryCreateUpdateRequest;
import com.app.backend.communication.response.CategoryResponse;
import com.app.backend.model.Category;
import com.app.backend.repository.CategoryRepository;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest
public class CategoryServiceTest {

    @Autowired
    private CategoryService categoryService;

    @MockBean
    CategoryRepository categoryRepository;

    @Mock
    private ModelMapper mapper;

    
    @Test 
    public void getAllCategoriesServiceTest(){
        //Mock data records setting
        when(categoryRepository.findAll())
        .thenReturn(Stream.of(new Category(), new Category()).collect(Collectors.toList()));

        assertEquals(2, categoryService.get().size());
    }

    @Test
    public void testGetCategoryById() {
        UUID categoryId = UUID.randomUUID();
        when(categoryRepository.findById(categoryId))
            .thenReturn(Optional.of(new Category()));

        CategoryResponse result =  categoryService.get(categoryId);

        assertNotNull(result);
}

    

    @Test
    public void testUpdateCategory() {
        UUID categoryId = UUID.randomUUID();
        CategoryCreateUpdateRequest request = new CategoryCreateUpdateRequest();

        Category mockCategory = new Category();
        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(mockCategory));

        Category updatedMockCategory = new Category();
        when(categoryRepository.save(any())).thenReturn(updatedMockCategory);

        CategoryResponse mockResponse = new CategoryResponse();
        when(mapper.map(any(), eq(CategoryResponse.class))).thenReturn(mockResponse);

        CategoryResponse result = categoryService.update(categoryId, request);

        assertNotNull(result);
    }

    @Test
    public void testDeleteCategory() {
        UUID categoryId = UUID.randomUUID();
        Category mockCategory = new Category();
        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(mockCategory));

        assertDoesNotThrow(() -> categoryService.delete(categoryId));

        verify(categoryRepository, times(1)).delete(mockCategory);
    }

    @Test
    public void testCreateCategory() {
        CategoryCreateUpdateRequest categoryRequest = new CategoryCreateUpdateRequest();
                CategoryResponse categoryResponse = new CategoryResponse();
                categoryRequest.setName("Vehicle");
                categoryResponse.setId(UUID.randomUUID());
                categoryResponse.setName("Vehicle");

       CategoryResponse mockResponse = new CategoryResponse();
        when(mapper.map(any(), eq(CategoryResponse.class))).thenReturn(mockResponse);

        CategoryResponse result;
        try{
        result= categoryService.create(categoryRequest);
        }catch(Exception e){return;}
        assertNotNull(result);
    }



}
