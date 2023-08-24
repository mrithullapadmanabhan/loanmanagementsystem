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
    return await getLoans();
  }
);
export const getByEmployeeId = createAsyncThunk<employeeLoanType[], string>(
  "employeeLoan/getByEmployee",
  async (employeeId) => {
    return await getEmployeeLoans(employeeId);
  }
);
export const create = createAsyncThunk<
  employeeLoanType,
  employeeLoanObjectType
>("employeeLoan/create", async (data) => {
  return await createEmployeeLoan(data);
});
export const updateStatus = createAsyncThunk<employeeLoanType, string>(
  "employeeLoan/markCompleted",
  async (id) => {
    return await markCompleted(id);
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
