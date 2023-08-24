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
import { initialStateType } from "features/common/initialStateType";
import { toast } from "react-toastify";
import {
  createEmployeeLoan,
  getEmployeeLoans,
  getLoans,
  markCompleted,
} from "./employeeLoanApi";
import { employeeLoanObjectType, employeeLoanType } from "./employeeLoanType";

const employeeLoanAdapter = createEntityAdapter<employeeLoanType>();

export const get = createAsyncThunk<employeeLoanType[]>(
  "employeeLoan/get",
  async () => {
    return await toast.promise(getLoans(), {
      pending: "Fetching Loans",
      error: "Error while fetching Loans",
    });
  }
);
export const getByEmployeeId = createAsyncThunk<employeeLoanType[], string>(
  "employeeLoan/getByEmployee",
  async (employeeId) => {
    return await toast.promise(getEmployeeLoans(employeeId), {
      pending: "Fetching EmployeeLoans",
      error: "Error while fetching EmployeeLoans",
    });
  }
);
export const create = createAsyncThunk<
  employeeLoanType,
  employeeLoanObjectType
>("employeeLoan/create", async (data) => {
  return await toast.promise(createEmployeeLoan(data), {
    pending: "Creating EmployeeLoan",
    success: "Created EmployeeLoan succesfully",
    error: "Error while creating EmployeeLoan ",
  });
});
export const updateStatus = createAsyncThunk<employeeLoanType, string>(
  "employeeLoan/markCompleted",
  async (id) => {
    return await toast.promise(markCompleted(id), {
      pending: "Updating the status of EmployeeLoan ",
      success: "Updated the status of EmployeeLoan succesfully",
      error: "Error while updating the status of EmployeeLoan ",
    });
  }
);

const employeeLoanSlice = createSlice({
  name: "employeeLoans",
  initialState: employeeLoanAdapter.getInitialState({
    status: "idle",
    error: "",
  } as initialStateType),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(get.fulfilled, employeeLoanAdapter.setAll)
      .addCase(getByEmployeeId.fulfilled, employeeLoanAdapter.setMany)
      .addCase(create.fulfilled, employeeLoanAdapter.setOne)
      .addCase(updateStatus.fulfilled, employeeLoanAdapter.setOne)
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

export default employeeLoanSlice.reducer;

export const {
  selectAll: selectAllEmployeeLoan,
  selectById: selectEmployeeLoanById,
} = employeeLoanAdapter.getSelectors((state: RootState) => state.employeeLoan);

export const selectByEmployee = createSelector(
  [selectAllEmployeeLoan, (_, employeeId: string) => employeeId],
  (employeeLoans, employeeId) =>
    employeeLoans.filter((loan) => loan.employee === employeeId)
);

export const employeeLoanStatus = (state: RootState) =>
  state.employeeLoan.status;
export const employeeLoanError = (state: RootState) => state.employeeLoan.error;
