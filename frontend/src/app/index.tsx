import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  AddEditCategory,
  AddEditEmployee,
  AddEditItem,
  AddEditLoanCard,
  AddEditMake,
  Admin,
  AllCategories,
  AllEmployees,
  AllItems,
  AllLoans,
  AllMakes,
  ApplyLoan,
  Login,
  NotFound,
  Register,
  Root,
  ViewEmployeeItems,
  ViewLoans
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
        path: "admin/",
        element: <Admin />,
        children: [
          {
            path: "employee/all",
            element: <AllEmployees />
          },
          {
            path: "item/all",
            element: <AllItems />
          },
          {
            path: "make/all",
            element: <AllMakes />
          },
          {
            path: "loan-card/all",
            element: <AllLoans />
          },
          {
            path: "employee/edit/:id",
            element: <AddEditEmployee type="edit" />
          },
          {
            path: "employee/add",
            element: <AddEditEmployee />
          },
          {
            path: "item/add",
            element: <AddEditItem />
          },
          {
            path: "item/edit/:id",
            element: <AddEditItem type="edit" />
          },
          {
            path: "loan-card/add",
            element: <AddEditLoanCard />
          },
          {
            path: "make/add",
            element: <AddEditMake />
          },
          {
            path: "loan-card/edit/:id",
            element: <AddEditLoanCard type="edit" />
          },
          {
            path: "make/edit/:id",
            element: <AddEditMake type="edit" />
          },
          {
            path: "category/add",
            element: <AddEditCategory type="add" />
          },
          {
            path: "category/all",
            element: <AllCategories />
          },
          {
            path: "category/edit/:id",
            element: <AddEditCategory type="edit" />
          }
        ]
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
