import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import categorySlice from "features/Category/categorySlice";
import employeeSlice from "features/Employee/employeeSlice";
import employeeLoanSlice from "features/EmployeeLoan/employeeLoanSlice";
import itemCardSlice from "features/ItemCard/itemCardSlice";
import loanCardSlice from "features/LoanCard/loanCardSlice";
import makeSlice from "features/Make/makeSlice";

export const store = configureStore({
  reducer: {
    category: categorySlice,
    employee: employeeSlice,
    employeeLoan: employeeLoanSlice,
    itemCard: itemCardSlice,
    loanCard: loanCardSlice,
    make: makeSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
