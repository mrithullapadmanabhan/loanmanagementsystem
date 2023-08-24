import { useDispatch, useSelector } from "app/hooks";
import ListPage from "components/ListPage";

import { useEffect } from "react";
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

  const fields = [
    {
      key: "id",
      label: "Employee ID",
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
      entityName="Employee"
      entityNamePlural="Employees"
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
