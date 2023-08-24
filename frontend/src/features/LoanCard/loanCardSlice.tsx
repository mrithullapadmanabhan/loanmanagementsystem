import {
  createEntityAdapter,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { createAsyncThunk } from "app/hooks";

import { initialStateType } from "features/common/initialStateType";
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
    return await getLoanCards();
  }
);
export const getById = createAsyncThunk<loanCardType, string>(
  "loanCard/getById",
  async (id) => {
    return await getLoanCard(id);
  }
);
export const create = createAsyncThunk<loanCardType, loanCardObjectType>(
  "loanCard/create",
  async (data) => {
    return await createLoanCard(data);
  }
);
export const update = createAsyncThunk<
  loanCardType,
  { id: string; data: loanCardType }
>("loanCard/update", async ({ id, data }) => {
  return await updateLoanCard(id, data);
});
export const remove = createAsyncThunk<string, string>(
  "loanCard/delete",
  async (id) => {
    await deleteLoanCard(id);
    return id;
  }
);

const loanCardSlice = createSlice({
  name: "loanCards",
  initialState: loanCardAdapter.getInitialState({
    status: "idle",
    error: "",
  } as initialStateType),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(get.fulfilled, loanCardAdapter.setAll)
      .addCase(getById.fulfilled, loanCardAdapter.setOne)
      .addCase(create.fulfilled, loanCardAdapter.addOne)
      .addCase(update.fulfilled, loanCardAdapter.setOne)
      .addCase(remove.fulfilled, loanCardAdapter.removeOne)
      .addMatcher(isPending, (state, _) => {
        state.status = "loading";
      })
      .addMatcher(isFulfilled, (state, _) => {
        state.status = "succeeded";
      })
      .addMatcher(isRejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ? action.error.message : null;
      });
  },
});

export default loanCardSlice.reducer;

export const { selectAll: selectAllLoanCard, selectById: selectLoanCardById } =
  loanCardAdapter.getSelectors((state: RootState) => state.loanCard);

export const loanCardStatus = (state: RootState) => state.loanCard.status;
export const loanCardError = (state: RootState) => state.loanCard.error;