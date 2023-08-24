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
import { initialStateType } from "features/common/initialStateType";
import { toast } from "react-toastify";
import {
  createMake,
  deleteMake,
  getMake,
  getMakes,
  getMakesByCategory,
  updateMake,
} from "./makeApi";
import { makeObjectType, makeType } from "./makeType";

const makeAdapter = createEntityAdapter<makeType>();

export const get = createAsyncThunk<makeType[]>("make/get", async () => {
  return await toast.promise(getMakes(), {
    pending: "Fetching Makes",
    error: "Error while getting makes",
  });
});
export const getById = createAsyncThunk<makeType, string>(
  "make/getById",
  async (id) => {
    return await toast.promise(getMake(id), {
      pending: "Fetching Make",
      error: "Error while getting make",
    });
  }
);
export const getByCategory = createAsyncThunk<makeType[], string>(
  "make/getByCategory",
  async (categoryId) => {
    return await toast.promise(getMakesByCategory(categoryId), {
      pending: "Fetching Makes",
      error: "Error while getting makes",
    });
  }
);
export const create = createAsyncThunk<makeType, makeObjectType>(
  "make/create",
  async (data) => {
    return await toast.promise(createMake(data), {
      pending: "Creating Make",
      success: "Created Make successfully",
      error: "Error while creating make"
    });
  }
);
export const update = createAsyncThunk<
  makeType,
  { id: string; data: makeType }
>("make/update", async ({ id, data }) => {
  return await toast.promise(updateMake(id, data), {
    pending: "Updating Make",
    success: "Updated Make successfully",
    error: "Error while updating make"
  });
});
export const remove = createAsyncThunk<string, string>(
  "make/delete",
  async (id) => {
    await toast.promise(deleteMake(id), {
      pending: "Deleting Make",
      success: "Deleted Make successfully",
      error: "Error while deleting make"
    });
    return id;
  }
);

const makeSlice = createSlice({
  name: "makes",
  initialState: makeAdapter.getInitialState({
    status: "idle",
    error: "",
  } as initialStateType),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(get.fulfilled, makeAdapter.setAll)
      .addCase(getById.fulfilled, makeAdapter.setOne)
      .addCase(getByCategory.fulfilled, makeAdapter.setMany)
      .addCase(create.fulfilled, makeAdapter.addOne)
      .addCase(update.fulfilled, makeAdapter.setOne)
      .addCase(remove.fulfilled, makeAdapter.removeOne)
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

export default makeSlice.reducer;

export const { selectAll: selectAllMake, selectById: selectMakeById } =
  makeAdapter.getSelectors((state: RootState) => state.make);

export const selectMakeTableData = createSelector(
  [selectAllMake, (state) => state],
  (makes, state) =>
    makes.map((make) => {
      return {
        ...make,
        category: selectCategoryById(state, make.category)?.name,
      };
    })
);

export const makeStatus = (state: RootState) => state.make.status;
export const makeError = (state: RootState) => state.make.error;
