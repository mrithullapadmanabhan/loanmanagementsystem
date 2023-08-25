import { useDispatch, useSelector } from "app/hooks";
import { ListPage } from "components";

import {
  categoryStatus,
  selectAllCategory
} from "features/Category/categorySlice";
import { useEffect } from "react";
import { get, remove } from "./categorySlice";

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
      entityName="Category"
      entityNamePlural="Categories"
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
