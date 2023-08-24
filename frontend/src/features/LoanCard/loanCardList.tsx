import { useDispatch, useSelector } from "app/hooks";
import ListPage from "components/ListPage";

import {
  categoryStatus,
  get as getCategories,
} from "features/Category/categorySlice";
import { useEffect } from "react";
import { get, loanCardStatus, remove, selectLoanCardTableData } from "./loanCardSlice";

const LoanCardList = () => {
  const dispatch = useDispatch();

  const loanCards = useSelector(selectLoanCardTableData);
  const status = useSelector(loanCardStatus);

  const categorystatus = useSelector(categoryStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(get());
    }
  }, [status, dispatch]);

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
      key: "name",
      label: "Name",
    },
    {
      key: "duration",
      label: "Duration (in years)",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  return (
    <ListPage
      entityName="LoanCard"
      entityNamePlural="LoanCards"
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
