import { useDispatch, useSelector } from "app/hooks";
import { ListPage } from "components";

import {
  categoryStatus,
  get as getCategories,
} from "features/Category/categorySlice";
import { get as getLoanCards, loanCardStatus } from "features/LoanCard/loanCardSlice";
import { get as getMakes, makeStatus } from "features/Make/makeSlice";
import { useEffect } from "react";
import { isAdmin } from "service/auth";
import { get, getByEmployee, itemCardStatus, remove, selectItemCardTableData } from "./itemCardSlice";

const ItemCardList = () => {
  const dispatch = useDispatch();
  const admin = isAdmin();

  const employeeId = localStorage.getItem("employeeID");

  const itemCards = useSelector((state) => selectItemCardTableData(state, employeeId));
  const status = useSelector(itemCardStatus);

  const categorystatus = useSelector(categoryStatus);
  const makestatus = useSelector(makeStatus);
  const loancardstatus = useSelector(loanCardStatus);


  useEffect(() => {
    if (status === "idle") {
      admin ?
        dispatch(get()) :
        employeeId !== null && dispatch(getByEmployee(employeeId))
    }
  }, [status, dispatch, employeeId, admin]);

  useEffect(() => {
    if (categorystatus === "idle") {
      dispatch(getCategories());
    }
  }, [categorystatus, dispatch]);

  useEffect(() => {
    if (makestatus === "idle") {
      dispatch(getMakes());
    }
  }, [makestatus, dispatch]);
  useEffect(() => {
    if (loancardstatus === "idle") {
      dispatch(getLoanCards());
    }
  }, [loancardstatus, dispatch])

  const fields = [
    {
      key: "id",
      label: "ItemCard ID",
    },
    {
      key: "category",
      label: "Category",
    },
    {
      key: "make",
      label: "Make",
    },
    {
      key: "description",
      label: "Description",
    },
    {
      key: "value",
      label: "Value (in $)",
    },
  ].concat(admin ? [{
    key: "actions",
    label: "Actions",
  }] : []);

  return (
    <ListPage
      entityName={admin ? "ItemCard" : "Item"}
      entityNamePlural={admin ? "ItemCards" : "Item"}
      removeItem={(id) => {
        dispatch(remove(id));
      }}
      fields={fields}
      data={itemCards as unknown as { [key: string]: string }[]}
      editUrl={(id) => `/admin/itemCard/${id}`}
      disableAdd={true}
    />
  );
};

export default ItemCardList;
