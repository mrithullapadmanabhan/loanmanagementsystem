import { createEntityAdapter, createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";

import { createAsyncThunk } from "app/hooks";
import { RootState } from "app/store";

import { selectCategoryEntities, selectCategorySelected } from "features/Category/categorySlice";

import { initialStateType } from "features/common/initialStateType";
import { createMake, deleteMake, getMake, getMakes, getMakesByCategory, updateMake, } from "./makeApi";
import { makeObjectType, makeType } from "./makeType";


const makeAdapter = createEntityAdapter<makeType>();
const initialState = makeAdapter.getInitialState({
  status: "idle",
} as initialStateType);


export const get = createAsyncThunk<makeType[]>(
  "make/get",
  async () => await getMakes()
);

export const getByCategory = createAsyncThunk<makeType[], string>(
  "make/getByCategory",
  async (categoryId) => await getMakesByCategory(categoryId)
);

export const getById = createAsyncThunk<makeType, string>(
  "make/getById",
  async (id) => await getMake(id)
);

export const create = createAsyncThunk<makeType, makeObjectType>(
  "make/create",
  async (data) => createMake(data)
);

export const update = createAsyncThunk<makeType, makeType>(
  "make/update",
  async (data) => updateMake(data.id, data)
);

export const remove = createAsyncThunk<string, string>(
  "make/delete",
  async (id) => {
    await deleteMake(id);
    return id;
  }
);


const makeSlice = createSlice({
  name: "makes",
  initialState: initialState,
  reducers: {
    selectMake(state, action) {
      const { id } = action.payload
      state.selected = id
    }
  },
  extraReducers(builder) {
    builder
      .addCase(get.fulfilled, makeAdapter.setAll)
      .addCase(getById.fulfilled, makeAdapter.setOne)
      .addCase(getByCategory.fulfilled, makeAdapter.setMany)
      .addCase(create.fulfilled, makeAdapter.addOne)
      .addCase(update.fulfilled, makeAdapter.setOne)
      .addCase(remove.fulfilled, makeAdapter.removeOne)
      .addCase('RESET', (_state) => initialState)
      .addMatcher(
        isAnyOf(
          get.pending, getById.pending, getByCategory.pending, create.pending, update.pending, remove.pending
        ), (state, _) => {
          state.status = "loading";
        })
      .addMatcher(
        isAnyOf(
          get.fulfilled, getById.fulfilled, getByCategory.pending, create.fulfilled, update.fulfilled, remove.fulfilled
        ), (state, _) => {
          state.status = "succeeded";
        })
      .addMatcher(
        isAnyOf(
          get.rejected, getById.rejected, getByCategory.rejected, create.rejected, update.rejected, remove.rejected
        ), (state, _) => {
          state.status = "failed";
        });
  },
});


export const { selectMake } = makeSlice.actions
export default makeSlice.reducer;


export const { selectAll: selectAllMake, selectById: selectMakeById, selectEntities: selectMakeEntities } =
  makeAdapter.getSelectors((state: RootState) => state.make);

export const selectMakeByCategory = createSelector(
  [selectAllMake, selectCategorySelected],
  (makes, category) => category !== "" && category ?
    makes.filter((make) => (make.category === category.id)) :
    [],
);

export const selectMakeSelected = createSelector(
  [selectMakeEntities, (state: RootState) => state.make.selected], (makes, id) => id && makes[id]
)

export const selectMakeTableData = createSelector(
  [selectAllMake, selectCategoryEntities],
  (makes, categories) =>
    makes.map((make) => {
      return {
        ...make,
        category: categories[make.category]?.name,
      };
    })
);

export const makeStatus = (state: RootState) => state.make.status;
