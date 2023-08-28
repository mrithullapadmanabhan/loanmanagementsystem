import { createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";

import { createAsyncThunk } from "app/hooks";
import { RootState } from "app/store";
import { initialStateType } from "features/common/initialStateType";

import { createEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee } from "./employeeApi";
import { employeeObjectType, employeeType } from "./employeeType";


const employeeAdapter = createEntityAdapter<employeeType>();
const initialState = employeeAdapter.getInitialState({
  status: "idle",
} as initialStateType)


export const get = createAsyncThunk<employeeType[]>(
  "employee/get",
  async () => await getEmployees()
);

export const getById = createAsyncThunk<employeeType, string>(
  "employee/getById",
  async (id) => await getEmployee(id)
);

export const create = createAsyncThunk<employeeType, employeeObjectType>(
  "employee/create",
  async (data) => await createEmployee(data)
);

export const update = createAsyncThunk<employeeType, employeeType>(
  "employee/update",
  async (data) => await updateEmployee(data.id, data)
);

export const remove = createAsyncThunk<string, string>(
  "employee/delete",
  async (id) => {
    await deleteEmployee(id);
    return id;
  }
);


const employeeSlice = createSlice({
  name: "employees",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(get.fulfilled, employeeAdapter.setAll)
      .addCase(getById.fulfilled, employeeAdapter.setOne)
      .addCase(create.fulfilled, employeeAdapter.setOne)
      .addCase(update.fulfilled, employeeAdapter.setOne)
      .addCase(remove.fulfilled, employeeAdapter.removeOne)
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


export default employeeSlice.reducer;

export const { selectAll: selectAllEmployee, selectById: selectEmployeeById, selectEntities: selectEmployeeEntities } =
  employeeAdapter.getSelectors((state: RootState) => state.employee);

export const employeeStatus = (state: RootState) => state.employee.status;
