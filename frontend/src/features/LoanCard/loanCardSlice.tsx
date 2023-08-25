import {
  createEntityAdapter,
  createSelector,
  createSlice,
  isAnyOf
} from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { createAsyncThunk } from "app/hooks";

import { selectCategoryEntities } from "features/Category/categorySlice";
import { initialStateType } from "features/common/initialStateType";
import { toast } from "react-toastify";
import {
  createLoanCard,
  deleteLoanCard,
  getLoanCard,
  getLoanCards,
  updateLoanCard,
} from "./loanCardApi";
import { loanCardObjectType, loanCardType } from "./loanCardType";

const loanCardAdapter = createEntityAdapter<loanCardType>();

export const get = createAsyncThunk<loanCardType[]>(
  "loanCard/get",
  async () => {
    return await toast.promise(getLoanCards(), {
      pending: "Fetching LoanCards",
      success: "Fetched LoanCards succesfully",
      error: "Error while fetching LoanCards",
    });
  }
);
export const getById = createAsyncThunk<loanCardType, string>(
  "loanCard/getById",
  async (id) => {
    return await toast.promise(getLoanCard(id), {
      pending: "Fetching LoanCard",
      error: "Error while fetching LoanCard",
    });
  }
);
export const create = createAsyncThunk<loanCardType, loanCardObjectType>(
  "loanCard/create",
  async (data) => {
    return await toast.promise(createLoanCard(data), {
      pending: "Creating LoanCard",
      success: "Created LoanCard succesfully",
      error: "Error while creating LoanCard ",
    });
  }
);
export const update = createAsyncThunk<
  loanCardType,
  { id: string; data: loanCardType }
>("loanCard/update", async ({ id, data }) => {
  return await toast.promise(updateLoanCard(id, data), {
    pending: "Updating LoanCard ",
    success: "Updated LoanCard succesfully",
    error: "Error while updating LoanCard ",
  });
});
export const remove = createAsyncThunk<string, string>(
  "loanCard/delete",
  async (id) => {
    await toast.promise(deleteLoanCard(id), {
      pending: "Deleting LoanCard",
      success: "Deleted LoanCard succesfully",
      error: "Error while deleting LoanCard ",
    });
    return id;
  }
);

const loanCardSlice = createSlice({
  name: "loanCards",
  initialState: loanCardAdapter.getInitialState({
    status: "idle",
  } as initialStateType),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(get.fulfilled, loanCardAdapter.setAll)
      .addCase(getById.fulfilled, loanCardAdapter.setOne)
      .addCase(create.fulfilled, loanCardAdapter.addOne)
      .addCase(update.fulfilled, loanCardAdapter.setOne)
      .addCase(remove.fulfilled, loanCardAdapter.removeOne)
      .addMatcher(isAnyOf(get.pending, getById.pending, create.pending, update.pending, remove.pending), (state, _) => {
        state.status = "loading";
      })
      .addMatcher(isAnyOf(get.fulfilled, getById.fulfilled, create.fulfilled, update.fulfilled, remove.fulfilled), (state, _) => {
        state.status = "succeeded";
      })
      .addMatcher(isAnyOf(get.rejected, getById.rejected, create.rejected, update.rejected, remove.rejected), (state, _) => {
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
export const loanCardError = (state: RootState) => state.loanCard.error;
