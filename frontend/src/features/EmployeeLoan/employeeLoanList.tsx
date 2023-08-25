import { useDispatch, useSelector } from "app/hooks";
import { ListPage } from "components";

import {
  categoryStatus,
  get as getCategories,
} from "features/Category/categorySlice";
import { getByEmployee, get as getItemCards, itemCardStatus } from "features/ItemCard/itemCardSlice";
import { get as getLoanCards, loanCardStatus } from "features/LoanCard/loanCardSlice";
import { useEffect } from "react";
import { isAdmin } from "service/auth";
import { employeeLoanStatus, get, selectEmployeeLoanTableData } from "./employeeLoanSlice";

const EmployeeLoanList = () => {
  const dispatch = useDispatch();
  const admin = isAdmin();
  const employeeId = localStorage.getItem("employeeId");

  const employeeLoans = useSelector((state) => selectEmployeeLoanTableData(state, admin, employeeId));
  const status = useSelector(employeeLoanStatus);

  const categorystatus = useSelector(categoryStatus);
  const loancardstatus = useSelector(loanCardStatus);
  const itemcardstatus = useSelector(itemCardStatus)


  useEffect(() => {
    if (status === "idle") {
      admin ?
        dispatch(get()) :
        employeeId !== null && dispatch(getByEmployee(employeeId))
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (categorystatus === "idle") {
      dispatch(getCategories());
    }
  }, [categorystatus, dispatch]);

  useEffect(() => {
    if (loancardstatus === "idle") {
      dispatch(getLoanCards());
    }
  }, [loancardstatus, dispatch]);

  useEffect(() => {
    if (itemcardstatus === "idle") {
      dispatch(getItemCards());
    }
  }, [itemcardstatus, dispatch]);


  const fields = [
    {
      key: "id",
      label: "Loan ID",
    },
    {
      key: "category",
      label: "Category",
    },
    {
      key: "item",
      label: "Item",
    },
    {
      key: "issueDate",
      label: "Issue Date",
    },
    {
      key: "returnDate",
      label: "Return Date"
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  return (
    <ListPage
      entityName="Employee Loan"
      entityNamePlural="Employee Loans"
      fields={fields}
      data={employeeLoans as unknown as { [key: string]: string }[]}
      editUrl={(id) => `/admin/loan/${id}`}
      createUrl={"/loan/create"}
    />
  );
};

export default EmployeeLoanList;
