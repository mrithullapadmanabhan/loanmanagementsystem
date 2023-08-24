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
import { toast } from "react-toastify";
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
    return await toast.promise(getItemCards(), {
      pending: "Fetching ItemCards",
      error: "Error while fetching ItemCards",
    });
  }
);
export const getById = createAsyncThunk<itemCardType, string>(
  "itemCard/getById",
  async (id) => {
    return await toast.promise(getItemCard(id), {
      pending: "Fetching ItemCard",
      error: "Error while fetching ItemCard",
    });
  }
);
export const getByEmployee = createAsyncThunk<itemCardType[], string>(
  "itemCard/getByEmployee",
  async (employeeID) => {
    return await toast.promise(getItemCardsByEmployee(employeeID), {
      pending: "Fetching ItemCards",
      error: "Error while fetching ItemCards",
    });
  }
);
export const getByMake = createAsyncThunk<itemCardType[], string>(
  "itemCard/getByMake",
  async (makeId) => {
    return await toast.promise(getItemCardsByMake(makeId), {
      pending: "Fetching ItemCards",
      error: "Error while fetching ItemCards",
    });
  }
);
export const create = createAsyncThunk<itemCardType, itemCardObjectType>(
  "itemCard/create",
  async (data) => {
    return await toast.promise(createItemCard(data), {
      pending: "Creating ItemCard",
      success: "Created ItemCard succesfully",
      error: "Error while creating ItemCard ",
    });
  }
);
export const update = createAsyncThunk<
  itemCardType,
  { id: string; data: itemCardType }
>("itemCard/update", async ({ id, data }) => {
  return await toast.promise(updateItemCard(id, data), {
    pending: "Updating ItemCard ",
    success: "Updated ItemCard succesfully",
    error: "Error while updating ItemCard ",
  });
});
export const remove = createAsyncThunk<string, string>(
  "itemCard/delete",
  async (id) => {
    await toast.promise(deleteItemCard(id), {
      pending: "Deleting ItemCard",
      success: "Deleted ItemCard succesfully",
      error: "Error while deleting ItemCard ",
    });
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