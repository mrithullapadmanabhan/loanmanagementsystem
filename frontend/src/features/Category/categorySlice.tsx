import {
  createEntityAdapter,
  createSelector,
  createSlice,
  isAnyOf
} from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { createAsyncThunk } from "app/hooks";
import { initialStateType } from "features/common/initialStateType";
import { toast } from "react-toastify";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "./categoryApi";
import { categoryObjectType, categoryType } from "./categoryType";

const categoryAdapter = createEntityAdapter<categoryType>();

export const get = createAsyncThunk<categoryType[]>(
  "category/get",
  async () => {
    return await toast.promise(getCategories(), {
      pending: "Fetching Categories",
      success: "Fetched Categories succesfully",
      error: "Error while fetching Categories",
    });
  }
);
export const getById = createAsyncThunk<categoryType, string>(
  "category/getById",
  async (id) => {
    return await toast.promise(getCategory(id), {
      pending: "Fetching Category",
      error: "Error while fetching Category",
    });
  }
);
export const create = createAsyncThunk<categoryType, categoryObjectType>(
  "category/create",
  async (data) => {
    return await toast.promise(createCategory(data), {
      pending: "Creating Category",
      success: "Created Category succesfully",
      error: "Error while creating Category ",
    });
  }
);
export const update = createAsyncThunk<
  categoryType,
  { id: string; data: categoryType }
>("category/update", async ({ id, data }) => {
  return await toast.promise(updateCategory(id, data), {
    pending: "Updating Category ",
    success: "Updated Category succesfully",
    error: "Error while updating Category ",
  });
});
export const remove = createAsyncThunk<string, string>(
  "category/delete",
  async (id) => {
    await toast.promise(deleteCategory(id), {
      pending: "Deleting Category",
      success: "Deleted Category succesfully",
      error: "Error while deleting Category ",
    });
    return id;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: categoryAdapter.getInitialState({
    status: "idle",
    error: "",
    selected: ""
  } as initialStateType),
  reducers: {
    selectCategory(state, action) {
      const { id } = action.payload
      state.selected = id
    }
  },
  extraReducers(builder) {
    builder
      .addCase(get.fulfilled, categoryAdapter.setAll)
      .addCase(getById.fulfilled, categoryAdapter.setOne)
      .addCase(create.fulfilled, categoryAdapter.setOne)
      .addCase(update.fulfilled, categoryAdapter.setOne)
      .addCase(remove.fulfilled, categoryAdapter.removeOne)
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

export const { selectCategory } = categorySlice.actions
export default categorySlice.reducer;

export const { selectAll: selectAllCategory, selectById: selectCategoryById, selectEntities: selectCategoryEntities } =
  categoryAdapter.getSelectors((state: RootState) => state.category);

export const selectCategorySelected = createSelector(
  [selectCategoryEntities, (state: RootState) => state.category.selected], (categories, id) => id && categories[id]
)

export const categoryStatus = (state: RootState) => state.category.status;
export const categoryError = (state: RootState) => state.category.error;
