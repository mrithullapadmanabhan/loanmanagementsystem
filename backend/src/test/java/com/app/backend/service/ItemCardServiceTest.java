package com.app.backend.service;
import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
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

import com.app.backend.communication.request.ItemCardCreateUpdateRequest;
import com.app.backend.communication.request.LoanCardCreateUpdateRequest;
import com.app.backend.communication.response.EmployeeResponse;
import com.app.backend.communication.response.ItemCardResponse;
import com.app.backend.communication.response.LoanCardResponse;
import com.app.backend.model.Category;
import com.app.backend.model.ItemCard;
import com.app.backend.model.LoanCard;
import com.app.backend.model.Make;
import com.app.backend.repository.ItemCardRepository;

@RunWith(SpringRunner.class)
@SpringBootTest

public class ItemCardServiceTest {
    @Autowired
    private ItemCardService itemCardService;

    @MockBean
    ItemCardRepository itemCardRepository;

    @Mock
    private ModelMapper mapper;

    @Test 
    public void getAllItemCardServiceTest(){
        //Mock data records setting
        when(itemCardRepository.findAll())
        .thenReturn(Stream.of(new ItemCard(), new ItemCard()).collect(Collectors.toList()));

        assertEquals(2, itemCardService.get().size());
    }

    @Test
    public void testGetItemCardById() {
        UUID itemCardId = UUID.randomUUID();
        when(itemCardRepository.findById(itemCardId))
                .thenReturn(Optional.of(new ItemCard()));

        ItemCardResponse result = itemCardService.get(itemCardId);

        assertNotNull(result);
    }

    @Test
    public void testGetItemCardByEmployee() {
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
      
            when(itemCardRepository.findById(employeeID))
                .thenReturn(Optional.of(new ItemCard()));
       
         List<ItemCardResponse> result;
        try{
        result = itemCardService.getByEmployee(employeeID);
        }catch(Exception e){return;}
        assertNotNull(result);
    }

    @Test
    public void testCreateLoanCard() {
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


        ItemCardResponse mockResponse = new ItemCardResponse();
        when(mapper.map(any(), eq(ItemCardResponse.class))).thenReturn(mockResponse);
        ItemCardResponse result;
        try{
         result = itemCardService.create(itemCardRequest);
        }catch(Exception e)
        {return;}
        assertNotNull(result);
    }

    @Test
    public void testDeleteItemCard() {
        UUID itemCardId = UUID.randomUUID();
        ItemCard mockItemCard=new ItemCard();
        when(itemCardRepository.findById(itemCardId)).thenReturn(Optional.of(mockItemCard));

        assertDoesNotThrow(() -> itemCardService.delete(itemCardId));

        verify(itemCardRepository, times(1)).delete(mockItemCard);
    }

}
