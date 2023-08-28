package com.app.backend.service;

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

import com.app.backend.communication.request.MakeCreateUpdateRequest;
import com.app.backend.communication.response.MakeResponse;
import com.app.backend.model.Category;
import com.app.backend.model.Make;
import com.app.backend.repository.MakeRepository;

@RunWith(SpringRunner.class)
@SpringBootTest

public class MakeServiceTest {
    @Autowired
    private MakeService makeService;

    @MockBean
    MakeRepository makeRepository;

    @Mock
    private ModelMapper mapper;

    @Test 
    public void getAllMakesServiceTest(){
        //Mock data records setting
        when(makeRepository.findAll())
        .thenReturn(Stream.of(new Make(), new Make()).collect(Collectors.toList()));

        assertEquals(2, makeService.get().size());
    }

    @Test
    public void testGetMakeById() {
        UUID makeId = UUID.randomUUID();
        when(makeRepository.findById(makeId))
                .thenReturn(Optional.of(new Make()));

        MakeResponse result = makeService.get(makeId);

        assertNotNull(result);
    }

    // @Test
    // public void testGetMakeByCategory() throws Exception{
    // UUID categoryId = UUID.randomUUID();
    // when(makeRepository.findByCategory(categoryId).stream().map((make) => ))
    // .thenReturn(Stream.of(new MakeResponse(), new
    // MakeResponse()).collect(Collectors.toList()));

    // MakeResponse result;
    // try {
    // result= makeService.get(categoryId);

    // } catch (Exception e) {
    // return;
    // }
    // assertNotNull(result);
    // }

    @Test
    public void testCreateMake() throws Exception {
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

        Make mockMake = new Make();
        when(makeRepository.save(any())).thenReturn(mockMake);

        MakeResponse mockResponse = new MakeResponse();
        when(mapper.map(any(), eq(MakeResponse.class))).thenReturn(mockResponse);
        MakeResponse result;
        try {
            result = makeService.create(makeRequest);
        } catch (Exception e) {
            return;
        }

        assertNotNull(result);
    }

    @Test
    public void testUpdateMake() {
        UUID makeId = UUID.randomUUID();
        MakeCreateUpdateRequest request = new MakeCreateUpdateRequest();

        Make mockMake = new Make();
        when(makeRepository.findById(makeId)).thenReturn(Optional.of(mockMake));

        Make updatedMockMake = new Make();
        when(makeRepository.save(any())).thenReturn(updatedMockMake);

        MakeResponse mockResponse = new MakeResponse();
        when(mapper.map(any(), eq(MakeResponse.class))).thenReturn(mockResponse);

        MakeResponse result = makeService.update(makeId, request);
        assertNotNull(result);
    }

    @Test
    public void testDeleteMake() {
        UUID makeId = UUID.randomUUID();
        Make mockMake = new Make();
        when(makeRepository.findById(makeId)).thenReturn(Optional.of(mockMake));

        assertDoesNotThrow(() -> makeService.delete(makeId));

        verify(makeRepository, times(1)).delete(mockMake);
    }

}
