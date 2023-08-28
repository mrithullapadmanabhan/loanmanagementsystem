import { createEntityAdapter, createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";

import { createAsyncThunk } from "app/hooks";
import { RootState } from "app/store";

import { initialStateType } from "features/common/initialStateType";

import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "./categoryApi";
import { categoryObjectType, categoryType } from "./categoryType";


const categoryAdapter = createEntityAdapter<categoryType>();
const initialState = categoryAdapter.getInitialState({
  status: "idle",
  selected: "",
} as initialStateType)


export const get = createAsyncThunk<categoryType[]>(
  "category/get",
  async () => await getCategories()
);

export const getById = createAsyncThunk<categoryType, string>(
  "category/getById",
  async (id) => await getCategory(id)
);

export const create = createAsyncThunk<categoryType, categoryObjectType>(
  "category/create",
  async (data) => await createCategory(data)
);

export const update = createAsyncThunk<categoryType, categoryType>(
  "category/update",
  async (data) => await updateCategory(data.id, data)
);

export const remove = createAsyncThunk<string, string>(
  "category/delete",
  async (id) => {
    await deleteCategory(id);
    return id;
  }
);


const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    selectCategory(state, action) {
      const { id } = action.payload;
      state.selected = id;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(get.fulfilled, categoryAdapter.setAll)
      .addCase(getById.fulfilled, categoryAdapter.setOne)
      .addCase(create.fulfilled, categoryAdapter.setOne)
      .addCase(update.fulfilled, categoryAdapter.setOne)
      .addCase(remove.fulfilled, categoryAdapter.removeOne)
      .addCase('RESET', (_state) => initialState)
      .addMatcher(
        isAnyOf(get.pending, getById.pending, create.pending, update.pending, remove.pending),
        (state, _) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(get.fulfilled, getById.fulfilled, create.fulfilled, update.fulfilled, remove.fulfilled),
        (state, _) => {
          state.status = "succeeded";
        }
      )
      .addMatcher(
        isAnyOf(get.rejected, getById.rejected, create.rejected, update.rejected, remove.rejected),
        (state, _) => {
          state.status = "failed";
        }
      );
  },
});


export const { selectCategory } = categorySlice.actions;
export default categorySlice.reducer;


export const {
  selectAll: selectAllCategory,
  selectById: selectCategoryById,
  selectEntities: selectCategoryEntities,
} = categoryAdapter.getSelectors((state: RootState) => state.category);

export const selectCategorySelected = createSelector(
  [selectCategoryEntities, (state: RootState) => state.category.selected],
  (categories, id) => id && categories[id]
);

export const categoryStatus = (state: RootState) => state.category.status;
