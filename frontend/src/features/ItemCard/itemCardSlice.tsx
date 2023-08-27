import { createEntityAdapter, createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";

import { createAsyncThunk } from "app/hooks";
import { RootState } from "app/store";
import { initialStateType } from "features/common/initialStateType";


import { selectCategoryEntities } from "features/Category/categorySlice";
import { selectAllLoanCard } from "features/LoanCard/loanCardSlice";
import { selectMakeEntities, selectMakeSelected } from "features/Make/makeSlice";
import { createItemCard, deleteItemCard, getItemCard, getItemCards, getItemCardsByEmployee, getItemCardsByMake, updateItemCard, } from "./itemCardApi";
import { itemCardObjectType, itemCardType } from "./itemCardType";


const itemCardAdapter = createEntityAdapter<itemCardType>();
const initialState = itemCardAdapter.getInitialState({
  status: "idle",
} as initialStateType);

export const get = createAsyncThunk<itemCardType[]>(
  "itemCard/get",
  async () => await getItemCards()
);

export const getByEmployee = createAsyncThunk<itemCardType[], string>(
  "itemCard/getByEmployee",
  async (employeeID) => await getItemCardsByEmployee(employeeID)
);

export const getByMake = createAsyncThunk<itemCardType[], string>(
  "itemCard/getByMake",
  async (makeId) => await getItemCardsByMake(makeId)
);

export const getById = createAsyncThunk<itemCardType, string>(
  "itemCard/getById",
  async (id) => await getItemCard(id)
);

export const create = createAsyncThunk<itemCardType, itemCardObjectType>(
  "itemCard/create",
  async (data) => await createItemCard(data)
);

export const update = createAsyncThunk<itemCardType, itemCardType>(
  "itemCard/update",
  async (data) => await updateItemCard(data.id, data)
);

export const remove = createAsyncThunk<string, string>(
  "itemCard/delete",
  async (id) => {
    await deleteItemCard(id);
    return id;
  }
);


const itemCardSlice = createSlice({
  name: "itemCards",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(get.fulfilled, itemCardAdapter.setAll)
      .addCase(getById.fulfilled, itemCardAdapter.setOne)
      .addCase(getByEmployee.fulfilled, itemCardAdapter.setMany)
      .addCase(getByMake.fulfilled, itemCardAdapter.setMany)
      .addCase(create.fulfilled, itemCardAdapter.addOne)
      .addCase(update.fulfilled, itemCardAdapter.setOne)
      .addCase(remove.fulfilled, itemCardAdapter.removeOne)
      .addCase('RESET', (_state) => initialState)
      .addMatcher(
        isAnyOf(
          get.pending, getById.pending, getByEmployee.pending, getByMake.pending, create.pending, update.pending, remove.pending
        ), (state, _) => {
          state.status = "loading";
        })
      .addMatcher(
        isAnyOf(
          get.fulfilled, getById.fulfilled, getByEmployee.fulfilled, getByMake.fulfilled, create.fulfilled, update.fulfilled, remove.fulfilled
        ), (state, _) => {
          state.status = "succeeded";
        })
      .addMatcher(
        isAnyOf(
          get.rejected, getById.rejected, getByEmployee.rejected, getByMake.rejected, create.rejected, update.rejected, remove.rejected
        ), (state, _) => {
          state.status = "failed";
        });
  },
});


export default itemCardSlice.reducer;


export const { selectAll: selectAllItemCard, selectById: selectItemCardById, selectEntities: selectItemEntites } =
  itemCardAdapter.getSelectors((state: RootState) => state.itemCard);

export const selectItemCardByMake = createSelector(
  [selectAllItemCard, selectMakeSelected],
  (items, make) => {
    return make !== "" && make !== undefined && items.filter((item) => item.make === make.id).at(0)
  }
)

export const selectItemCardTableData = createSelector(
  [
    selectAllItemCard,
    selectMakeEntities,
    selectCategoryEntities,
    selectAllLoanCard,
    (_state, employeeId) => employeeId
  ],
  (itemCards, makes, categories, loans, employeeID) => {
    const l = loans.map((loan) => loan.category)

    const finalitems = employeeID !== null ? itemCards : itemCards.filter((item) => makes[item.make]?.category && makes[item.make]!.category in l)

    return finalitems.map((itemCard) => {
      return {
        ...itemCard,
        make: makes[itemCard.make]?.name,
        category: makes[itemCard.make] && categories[makes[itemCard.make]!.category]?.name
      };
    })
  }
);

export const itemCardStatus = (state: RootState) => state.itemCard.status;