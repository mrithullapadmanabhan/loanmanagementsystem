import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  Root,
  NotFound,
  ApplyLoan,
  Login,
  Register,
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
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
