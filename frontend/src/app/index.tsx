import CategoryAddEdit from "features/Category/categoryAddEdit";
import CategoryList from "features/Category/categoryList";
import EmployeeAddEdit from "features/Employee/employeeAddEdit";
import EmployeeList from "features/Employee/employeeList";
import EmployeeLoanAdd from "features/EmployeeLoan/employeeLoanAdd";
import EmployeeLoanList from "features/EmployeeLoan/employeeLoanList";
import ItemCardAddEdit from "features/ItemCard/itemCardAddEdit";
import ItemCardList from "features/ItemCard/itemCardList";
import LoanCardAddEdit from "features/LoanCard/loanCardAddEdit";
import LoanCardList from "features/LoanCard/loanCardList";
import MakeAddEdit from "features/Make/makeAddEdit";
import MakeList from "features/Make/makeList";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Admin, Login, NotFound, Root } from "routes";

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
        element: <EmployeeAddEdit type="register" />,
      },
      {
        path: "loan/create",
        element: <EmployeeLoanAdd />
      },
      {
        path: "loan",
        element: <EmployeeLoanList />
      },
      {
        path: "item",
        element: <ItemCardList />
      },
      {
        path: "admin/",
        element: <Admin />,
        children: [
          {
            path: "category",
            element: <CategoryList />,
          },
          {
            path: "category/:id",
            element: <CategoryAddEdit type="edit" />
          },
          {
            path: "category/create",
            element: <CategoryAddEdit type="add" />
          },
          {
            path: "employee",
            element: <EmployeeList />,
          },
          {
            path: "employee/:id",
            element: <EmployeeAddEdit type="edit" />
          },
          {
            path: "employee/create",
            element: <EmployeeAddEdit type="add" />
          },
          {
            path: "loan",
            element: <EmployeeLoanList />
          },
          {
            path: "loan/create",
            element: <EmployeeLoanAdd />
          },
          {
            path: "itemCard",
            element: <ItemCardList />,
          },
          {
            path: "itemCard/:id",
            element: <ItemCardAddEdit type="edit" />
          },
          {
            path: "itemCard/create",
            element: <ItemCardAddEdit type="add" />
          },
          {
            path: "loanCard",
            element: <LoanCardList />,
          },
          {
            path: "loanCard/:id",
            element: <LoanCardAddEdit type="edit" />
          },
          {
            path: "loanCard/create",
            element: <LoanCardAddEdit type="add" />
          },
          {
            path: "make",
            element: <MakeList />,
          },
          {
            path: "make/:id",
            element: <MakeAddEdit type="edit" />
          },
          {
            path: "make/create",
            element: <MakeAddEdit type="add" />
          }
        ]
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
