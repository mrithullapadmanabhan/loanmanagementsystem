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
import { toast } from "react-toastify";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "./employeeApi";
import { employeeObjectType, employeeType } from "./employeeType";

const employeeAdapter = createEntityAdapter<employeeType>();

export const get = createAsyncThunk<employeeType[]>(
  "employee/get",
  async () => {
    return await toast.promise(getEmployees(), {
      pending: "Fetching Employees",
      error: "Error while getting employees",
    });
  }
);
export const getById = createAsyncThunk<employeeType, string>(
  "employee/getById",
  async (id) => {
    return await toast.promise(getEmployee(id), {
      pending: "Fetching employee details",
      error: "Error while getting employee details",
    });
  }
);
export const create = createAsyncThunk<employeeType, employeeObjectType>(
  "employee/create",
  async (data) => {
    return await toast.promise(createEmployee(data), {
      pending: "Registering Employee",
      success: "Employee Registered Successfully",
      error: "Error while registering employee",
    });
  }
);
export const update = createAsyncThunk<
  employeeType,
  { id: string; data: employeeType }
>("employee/update", async ({ id, data }) => {
  return await toast.promise(updateEmployee(id, data), {
    pending: "Updating Employee",
    success: "Employee Updated Successfully",
    error: "Error while updating employee",
  });
});
export const remove = createAsyncThunk<string, string>(
  "employee/delete",
  async (id) => {
    await toast.promise(deleteEmployee(id), {
      pending: "Deleting Employee",
      success: "Employee deleted Successfully",
      error: "Error while deleting employee",
    });
    return id;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: employeeAdapter.getInitialState({
    status: "idle",
    error: "",
  } as initialStateType),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(get.fulfilled, employeeAdapter.setAll)
      .addCase(getById.fulfilled, employeeAdapter.setOne)
      .addCase(create.fulfilled, employeeAdapter.setOne)
      .addCase(update.fulfilled, employeeAdapter.setOne)
      .addCase(remove.fulfilled, employeeAdapter.removeOne)
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

export default employeeSlice.reducer;

export const { selectAll: selectAllEmployee, selectById: selectEmployeeById, selectEntities: selectEmployeeEntities } =
  employeeAdapter.getSelectors((state: RootState) => state.employee);

export const employeeStatus = (state: RootState) => state.employee.status;
export const employeeError = (state: RootState) => state.employee.error;
