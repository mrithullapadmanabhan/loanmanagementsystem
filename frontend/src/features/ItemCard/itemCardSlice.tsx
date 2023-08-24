import {
  createEntityAdapter,
  createSelector,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { createAsyncThunk } from "app/hooks";

import { selectCategoryById } from "features/Category/categorySlice";
import { selectMakeById } from "features/Make/makeSlice";
import { initialStateType } from "features/common/initialStateType";
import {
  createItemCard,
  deleteItemCard,
  getItemCard,
  getItemCards,
  getItemCardsByEmployee,
  getItemCardsByMake,
  updateItemCard,
} from "./itemCardApi";
import { itemCardObjectType, itemCardType } from "./itemCardType";

const itemCardAdapter = createEntityAdapter<itemCardType>();

export const get = createAsyncThunk<itemCardType[]>(
  "itemCard/get",
  async () => {
    return await getItemCards();
  }
);
export const getById = createAsyncThunk<itemCardType, string>(
  "itemCard/getById",
  async (id) => {
    return await getItemCard(id);
  }
);
export const getByEmployee = createAsyncThunk<itemCardType[], string>(
  "itemCard/getByEmployee",
  async (employeeID) => {
    return await getItemCardsByEmployee(employeeID);
  }
);
export const getByMake = createAsyncThunk<itemCardType[], string>(
  "itemCard/getByMake",
  async (makeId) => {
    return await getItemCardsByMake(makeId);
  }
);
export const create = createAsyncThunk<itemCardType, itemCardObjectType>(
  "itemCard/create",
  async (data) => {
    return await createItemCard(data);
  }
);
export const update = createAsyncThunk<
  itemCardType,
  { id: string; data: itemCardType }
>("itemCard/update", async ({ id, data }) => {
  return await updateItemCard(id, data);
});
export const remove = createAsyncThunk<string, string>(
  "itemCard/delete",
  async (id) => {
    await deleteItemCard(id);
    return id;
  }
);

const itemCardSlice = createSlice({
  name: "itemCards",
  initialState: itemCardAdapter.getInitialState({
    status: "idle",
    error: "",
  } as initialStateType),
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

export default itemCardSlice.reducer;

export const { selectAll: selectAllItemCard, selectById: selectItemCardById } =
  itemCardAdapter.getSelectors((state: RootState) => state.itemCard);

export const selectItemCardTableData = createSelector(
  [selectAllItemCard, (state) => state],
  (itemCards, state) =>
    itemCards.map((itemCard) => {
      const make = selectMakeById(state, itemCard.make)
      return {
        ...itemCard,
        make: make?.name,
        category: selectCategoryById(state, (make?.category)!)?.name
      };
    })
);

export const itemCardStatus = (state: RootState) => state.itemCard.status;
export const itemCardError = (state: RootState) => state.itemCard.error;
