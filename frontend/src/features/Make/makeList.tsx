import { useDispatch, useSelector } from "app/hooks";
import ListPage from "components/ListPage";

import {
  categoryStatus,
  get as getCategories,
} from "features/Category/categorySlice";
import { useEffect } from "react";
import { get, makeStatus, remove, selectMakeTableData } from "./makeSlice";

const MakeList = () => {
  const makes = useSelector(selectMakeTableData);
  const status = useSelector(makeStatus);

  const categorystatus = useSelector(categoryStatus);

  const dispatch = useDispatch();

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
      label: "Make ID",
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
      key: "actions",
      label: "Actions",
    },
  ];

  return (
    <ListPage
      entityName="Make"
      entityNamePlural="Makes"
      removeItem={(id) => {
        dispatch(remove(id));
      }}
      fields={fields}
      data={makes as unknown as { [key: string]: string }[]}
      editUrl={(id) => `/admin/make/${id}`}
    />
  );
};

export default MakeList;
