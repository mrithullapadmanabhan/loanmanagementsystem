import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  Root,
  NotFound,
  ApplyLoan,
  Login,
  Register,
  ViewLoans,
  ViewEmployeeItems,
  AllEmployees,
  AllItems,
  AllLoans,
  AddEmployee,
  AddEditItem,
  AddEditLoanCard
} from "routes";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "loan/apply",
        element: <ApplyLoan />,
      },
      {
        path: "loans",
        element: <ViewLoans />,
      },
      {
        path: "employee/items",
        element: <ViewEmployeeItems />
      },
      {
        path: "admin/employee/all",
        element: <AllEmployees />
      },
      {
        path: "admin/item/all",
        element: <AllItems />
      },
      {
        path: "admin/loan-card/all",
        element: <AllLoans />
      },
      {
        path: "admin/addemployee",
        element: <AddEmployee />
      },
      {
        path: "admin/item/add",
        element: <AddEditItem />
      },
      {
        path: "admin/item/edit/:id",
        element: <AddEditItem type="edit"/>
      },
      {
        path: "admin/loan-card/add",
        element: <AddEditLoanCard />
      },
      {
        path: "admin/loan-card/edit/:id",
        element: <AddEditLoanCard type="edit"/>
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
