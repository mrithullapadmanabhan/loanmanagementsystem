import { useEffect } from "react";

import { useDispatch, useSelector } from "app/hooks";
import { ListPage } from "components";
import { categoryStatus, get as getCategories } from "features/Category/categorySlice";

import { entityName, entityNamePlural } from "./makeApi";
import { get, makeStatus, remove, selectMakeTableData } from "./makeSlice";


const MakeList = () => {
  const dispatch = useDispatch();


  const makes = useSelector(selectMakeTableData);

  const status = useSelector(makeStatus);
  useEffect(() => {
    if (status === "idle") {
      dispatch(get());
    }
  }, [status, dispatch]);


  const categorystatus = useSelector(categoryStatus);
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
      entityName={entityName}
      entityNamePlural={entityNamePlural}
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
