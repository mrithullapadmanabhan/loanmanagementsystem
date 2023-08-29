import { useEffect } from "react";

import { useDispatch, useSelector } from "app/hooks";
import { ListPage } from "components";

import { entityName, entityNamePlural } from "./employeeApi";
import { employeeStatus, get, remove, selectAllEmployee } from "./employeeSlice";


const EmployeeList = () => {
  const dispatch = useDispatch();

  const employees = useSelector(selectAllEmployee);

  const status = useSelector(employeeStatus);
  useEffect(() => {
    if (status === "idle") {
      dispatch(get());
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);


  const fields = [
    {
      key: "id",
      label: "Employee ID",
    },
    {
      key: "email",
      label: "Email"
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "designation",
      label: "Designation",
    },
    {
      key: "department",
      label: "Department",
    },
    {
      key: "gender",
      label: "Gender",
    },
    {
      key: "dob",
      label: "Date of Birth",
    },
    {
      key: "doj",
      label: "Date of Joining",
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
      data={employees as unknown as { [key: string]: string }[]}
      editUrl={(id) => `/admin/employee/${id}`}
    />
  );
};

export default EmployeeList;
