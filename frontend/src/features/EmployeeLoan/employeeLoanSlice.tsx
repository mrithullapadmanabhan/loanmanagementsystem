import { createEntityAdapter, createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";

import { createAsyncThunk } from "app/hooks";
import { RootState } from "app/store";
import { initialStateType } from "features/common/initialStateType";

import { selectCategoryEntities } from "features/Category/categorySlice";
import { selectEmployeeEntities } from "features/Employee/employeeSlice";
import { selectItemEntites } from "features/ItemCard/itemCardSlice";
import { selectLoanEntities } from "features/LoanCard/loanCardSlice";
import { createEmployeeLoan, getEmployeeLoans, getLoans, markCompleted, } from "./employeeLoanApi";
import { employeeLoanObjectType, employeeLoanType } from "./employeeLoanType";


const employeeLoanAdapter = createEntityAdapter<employeeLoanType>();
const initialState = employeeLoanAdapter.getInitialState({
  status: "idle",
} as initialStateType);

export const get = createAsyncThunk<employeeLoanType[]>(
  "employeeLoan/get",
  async () => await getLoans()
);

export const getByEmployeeId = createAsyncThunk<employeeLoanType[], string>(
  "employeeLoan/getByEmployee",
  async (employeeId) => await getEmployeeLoans(employeeId)
);

export const create = createAsyncThunk<employeeLoanType, employeeLoanObjectType>(
  "employeeLoan/create",
  async (data) => await createEmployeeLoan(data)
);

export const updateStatus = createAsyncThunk<employeeLoanType, string>(
  "employeeLoan/markCompleted",
  async (id) => markCompleted(id)
);


const employeeLoanSlice = createSlice({
  name: "employeeLoans",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(get.fulfilled, employeeLoanAdapter.setAll)
      .addCase(getByEmployeeId.fulfilled, employeeLoanAdapter.setMany)
      .addCase(create.fulfilled, employeeLoanAdapter.setOne)
      .addCase(updateStatus.fulfilled, employeeLoanAdapter.setOne)
      .addCase('RESET', (_state) => initialState)
      .addMatcher(
        isAnyOf(
          get.pending, getByEmployeeId.pending, create.pending, updateStatus.pending
        ), (state, _) => {
          state.status = "loading";
        })
      .addMatcher(
        isAnyOf(
          get.fulfilled, getByEmployeeId.fulfilled, create.fulfilled, updateStatus.fulfilled
        ), (state, _) => {
          state.status = "succeeded";
        })
      .addMatcher(
        isAnyOf(
          get.rejected, getByEmployeeId.rejected, create.rejected, updateStatus.rejected
        ), (state, _) => {
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

export const employeeLoanStatus = (state: RootState) => state.employeeLoan.status;
