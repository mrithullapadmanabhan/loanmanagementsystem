import { createEntityAdapter, createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { createAsyncThunk } from "app/hooks";

import { selectCategoryEntities } from "features/Category/categorySlice";
import { initialStateType } from "features/common/initialStateType";
import { createLoanCard, deleteLoanCard, getLoanCard, getLoanCards, updateLoanCard, } from "./loanCardApi";
import { loanCardObjectType, loanCardType } from "./loanCardType";


const loanCardAdapter = createEntityAdapter<loanCardType>();
const initialState = loanCardAdapter.getInitialState({
  status: "idle",
} as initialStateType);


export const get = createAsyncThunk<loanCardType[]>(
  "loanCard/get",
  async () => await getLoanCards()
);

export const getById = createAsyncThunk<loanCardType, string>(
  "loanCard/getById",
  async (id) => await getLoanCard(id)
);

export const create = createAsyncThunk<loanCardType, loanCardObjectType>(
  "loanCard/create",
  async (data) => createLoanCard(data)
);

export const update = createAsyncThunk<loanCardType, loanCardType>(
  "loanCard/update",
  async (data) => await updateLoanCard(data.id, data)
);

export const remove = createAsyncThunk<string, string>(
  "loanCard/delete",
  async (id) => {
    await deleteLoanCard(id);
    return id;
  }
);


const loanCardSlice = createSlice({
  name: "loanCards",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(get.fulfilled, loanCardAdapter.setAll)
      .addCase(getById.fulfilled, loanCardAdapter.setOne)
      .addCase(create.fulfilled, loanCardAdapter.addOne)
      .addCase(update.fulfilled, loanCardAdapter.setOne)
      .addCase(remove.fulfilled, loanCardAdapter.removeOne)
      .addCase('RESET', (_state) => initialState)
      .addMatcher(
        isAnyOf(
          get.pending, getById.pending, create.pending, update.pending, remove.pending
        ), (state, _) => {
          state.status = "loading";
        })
      .addMatcher(
        isAnyOf(
          get.fulfilled, getById.fulfilled, create.fulfilled, update.fulfilled, remove.fulfilled
        ), (state, _) => {
          state.status = "succeeded";
        })
      .addMatcher(
        isAnyOf(
          get.rejected, getById.rejected, create.rejected, update.rejected, remove.rejected
        ), (state, _) => {
          state.status = "failed";
        });
  },
});


export default loanCardSlice.reducer;

export const { selectAll: selectAllLoanCard, selectById: selectLoanCardById, selectEntities: selectLoanEntities } =
  loanCardAdapter.getSelectors((state: RootState) => state.loanCard);

export const selectLoanCardTableData = createSelector(
  [selectAllLoanCard, selectCategoryEntities],
  (loanCards, categories) =>
    loanCards.map((loanCard) => {
      return {
        ...loanCard,
        category: categories[loanCard.category]?.name,
      };
    })
);

export const loanCardStatus = (state: RootState) => state.loanCard.status;
