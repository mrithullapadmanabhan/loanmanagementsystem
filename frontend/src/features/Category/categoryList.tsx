import { useEffect } from "react";

import { useDispatch, useSelector } from "app/hooks";
import { ListPage } from "components";

import { entityName, entityNamePlural } from "./categoryApi";
import { categoryStatus, get, remove, selectAllCategory } from "./categorySlice";


const CategoryList = () => {
  const dispatch = useDispatch();

  const categories = useSelector(selectAllCategory);

  const status = useSelector(categoryStatus);
  useEffect(() => {
    if (status === "idle") {
      dispatch(get());
    }
  }, [status, dispatch]);

  const fields = [
    {
      key: "id",
      label: "Category ID",
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
      data={categories as unknown as { [key: string]: string }[]}
      editUrl={(id) => `/admin/category/${id}`}
    />
  );
};

export default CategoryList;
