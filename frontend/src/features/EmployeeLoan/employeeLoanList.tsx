import { useDispatch, useSelector } from "app/hooks";
import { ListPage } from "components";

import {
  categoryStatus,
  get as getCategories,
} from "features/Category/categorySlice";
import { get as getItemCards, itemCardStatus } from "features/ItemCard/itemCardSlice";
import { get as getLoanCards, loanCardStatus } from "features/LoanCard/loanCardSlice";
import { useEffect } from "react";
import { isAdmin } from "service/auth";
import { employeeLoanStatus, get, getByEmployeeId, selectEmployeeLoanTableData, updateStatus } from "./employeeLoanSlice";

const EmployeeLoanList = () => {
  const dispatch = useDispatch();
  const admin = isAdmin();
  const employeeId = localStorage.getItem("employeeID");

  const employeeLoans = useSelector((state) => selectEmployeeLoanTableData(state, admin, employeeId));
  const status = useSelector(employeeLoanStatus);

  const categorystatus = useSelector(categoryStatus);
  const loancardstatus = useSelector(loanCardStatus);
  const itemcardstatus = useSelector(itemCardStatus)


  useEffect(() => {
    if (status === "idle") {
      admin ?
        dispatch(get()) :
        employeeId !== null && dispatch(getByEmployeeId(employeeId))
    }
  }, [status, dispatch, admin, employeeId]);

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
      key: "status",
      label: "Status"
    },
  ].concat(
    admin ? [
      {
        key: "actions",
        label: "Actions",
      }
    ] : []
  )

  return (
    <ListPage
      entityName={admin ? "Employee Loan" : "Loan"}
      entityNamePlural={admin ? "Employee Loans" : "Loans"}
      fields={fields}
      data={employeeLoans as unknown as { [key: string]: string }[]}
      editUrl={(id) => `/admin/loan/${id}`}
      createUrl={"/loan/create"}
      action={(id) => { dispatch(updateStatus(id)) }}
      actionLabel="Mark Completed"
      disableAdd={admin}
    />
  );
};

export default EmployeeLoanList;
