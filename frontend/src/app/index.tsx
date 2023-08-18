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
  AllLoans
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
        path: "admin/loan/all",
        element: <AllLoans />
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
