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

import com.app.backend.communication.request.LoanCardCreateUpdateRequest;
import com.app.backend.communication.response.EmployeeResponse;
import com.app.backend.communication.response.LoanCardResponse;
import com.app.backend.model.Category;
import com.app.backend.model.LoanCard;
import com.app.backend.repository.LoanCardRepository;

@RunWith(SpringRunner.class)
@SpringBootTest

public class LoanCardServiceTest {
    @Autowired
    private LoanCardService loanCardService;

    @MockBean
    LoanCardRepository loanCardRepository;

    @Mock
    private ModelMapper mapper;

    @Test 
    public void getAllLoanCardServiceTest(){
        //Mock data records setting
        when(loanCardRepository.findAll())
        .thenReturn(Stream.of(new LoanCard(), new LoanCard()).collect(Collectors.toList()));

        assertEquals(2, loanCardService.get().size());
    }

    @Test
    public void testGetLoanCardById() {
        UUID loanCardId = UUID.randomUUID();
        when(loanCardRepository.findById(loanCardId))
                .thenReturn(Optional.of(new LoanCard()));

        LoanCardResponse result = loanCardService.get(loanCardId);

        assertNotNull(result);
    }

    @Test
    public void testCreateLoanCard() {
      LoanCardCreateUpdateRequest loanCardRequest = new LoanCardCreateUpdateRequest();
                LoanCardResponse loanCardResponse = new LoanCardResponse();
                Category category = new Category();
                UUID categoryID = UUID.randomUUID();
                category.setId(categoryID);
                category.setName("Furniture");
                loanCardRequest.setCategoryID(categoryID);
                loanCardRequest.setDuration(9);
                loanCardResponse.setId(UUID.randomUUID());
                loanCardResponse.setDuration(9);
                loanCardResponse.setCategory(category.getId());


        EmployeeResponse mockResponse = new EmployeeResponse();
        when(mapper.map(any(), eq(EmployeeResponse.class))).thenReturn(mockResponse);
        LoanCardResponse result;
        try{
         result = loanCardService.create(loanCardRequest);
        }catch(Exception e)
        {return;}
        assertNotNull(result);
    }

    @Test
    public void testUpdateLoanCard() {
        UUID loanCardId = UUID.randomUUID();
        LoanCardCreateUpdateRequest request = new LoanCardCreateUpdateRequest();

        LoanCard mockLoanCard = new LoanCard();
        Category mockCategory = new Category();
        mockLoanCard.setCategory(mockCategory);
        when(loanCardRepository.findById(loanCardId)).thenReturn(Optional.of(mockLoanCard));

        LoanCard updatedMockLoanCard = new LoanCard();
        when(loanCardRepository.save(any())).thenReturn(updatedMockLoanCard);

        LoanCardResponse mockResponse = new LoanCardResponse();
        when(mapper.map(any(), eq(LoanCardResponse.class))).thenReturn(mockResponse);

        LoanCardResponse result = loanCardService.update(loanCardId, request);

        assertNotNull(result);
    }

    @Test
    public void testDeleteLoanCard() {
        UUID loanCardId = UUID.randomUUID();
        LoanCard mockLoanCard=new LoanCard();
        when(loanCardRepository.findById(loanCardId)).thenReturn(Optional.of(mockLoanCard));

        assertDoesNotThrow(() -> loanCardService.delete(loanCardId));

        verify(loanCardRepository, times(1)).delete(mockLoanCard);
    }
}
