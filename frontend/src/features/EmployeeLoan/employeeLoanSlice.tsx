import {
  createEntityAdapter,
  createSelector,
  createSlice,
  isAnyOf
} from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { createAsyncThunk } from "app/hooks";
import { selectCategoryEntities } from "features/Category/categorySlice";
import { selectEmployeeEntities } from "features/Employee/employeeSlice";
import { selectItemEntites } from "features/ItemCard/itemCardSlice";
import { selectLoanEntities } from "features/LoanCard/loanCardSlice";
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
  } as initialStateType),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(get.fulfilled, employeeLoanAdapter.setAll)
      .addCase(getByEmployeeId.fulfilled, employeeLoanAdapter.setMany)
      .addCase(create.fulfilled, employeeLoanAdapter.setOne)
      .addCase(updateStatus.fulfilled, employeeLoanAdapter.setOne)
      .addMatcher(isAnyOf(get.pending, getByEmployeeId.pending, create.pending, updateStatus.pending), (state, _) => {
        state.status = "loading";
      })
      .addMatcher(isAnyOf(get.fulfilled, getByEmployeeId.fulfilled, create.fulfilled, updateStatus.fulfilled), (state, _) => {
        state.status = "succeeded";
      })
      .addMatcher(isAnyOf(get.rejected, getByEmployeeId.rejected, create.rejected, updateStatus.rejected), (state, _) => {
        state.status = "failed";
      });
  },
});

export default employeeLoanSlice.reducer;

export const {
  selectAll: selectAllEmployeeLoan,
  selectById: selectEmployeeLoanById,
} = employeeLoanAdapter.getSelectors((state: RootState) => state.employeeLoan);

export const selectEmployeeLoanTableData = createSelector(
  [
    selectAllEmployeeLoan,
    selectCategoryEntities,
    selectItemEntites,
    selectLoanEntities,
    selectEmployeeEntities,
    (_state, isAdmin, _employeeId) => isAdmin,
    (_state, _isAdmin, employeeID) => employeeID
  ],
  (employeeLoans, categories, items, loans, employees, isAdmin, employeeID) => {
    const finalLoans = isAdmin ? employeeLoans : employeeLoans.filter((loan) => (loan.employee === employeeID));
    return finalLoans.map((employeeLoan) => {
      return {
        ...employeeLoan,
        employee: employees[employeeLoan.employee]?.name,
        category: loans[employeeLoan.loan] && categories[loans[employeeLoan.loan]!.category]?.name,
        item: items[employeeLoan.item]?.description,
      };
    })
  }
);

export const employeeLoanStatus = (state: RootState) =>
  state.employeeLoan.status;
export const employeeLoanError = (state: RootState) => state.employeeLoan.error;
