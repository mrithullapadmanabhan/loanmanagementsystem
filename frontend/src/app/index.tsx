import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  Root,
  NotFound,

  Login,
  Register,
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
      // {
      //   path: "loan/apply",
      //   element: <ApplyLoan />,
      // }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
