import { useEffect } from "react";

import { useDispatch, useSelector } from "app/hooks";
import { ListPage } from "components";
import { categoryStatus, get as getCategories, } from "features/Category/categorySlice";

import { entityName, entityNamePlural } from "./loanCardApi";
import { get, loanCardStatus, remove, selectLoanCardTableData } from "./loanCardSlice";



const LoanCardList = () => {
  const dispatch = useDispatch();


  const loanCards = useSelector(selectLoanCardTableData);

  const status = useSelector(loanCardStatus);
  useEffect(() => {
    if (status === "idle") {
      dispatch(get());
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);


  const categorystatus = useSelector(categoryStatus);
  useEffect(() => {
    if (categorystatus === "idle") {
      dispatch(getCategories());
    }
  }, [categorystatus, dispatch]);


  const fields = [
    {
      key: "id",
      label: "LoanCard ID",
    },
    {
      key: "category",
      label: "Category",
    },
    {
      key: "duration",
      label: "Duration (in months)",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];


  return (
    <ListPage
      entityName={entityName}
      entityNamePlural={entityNamePlural}
      removeItem={(id) => {
        dispatch(remove(id));
      }}
      fields={fields}
      data={loanCards as unknown as { [key: string]: string }[]}
      editUrl={(id) => `/admin/loanCard/${id}`}
    />
  );
};

export default LoanCardList;
