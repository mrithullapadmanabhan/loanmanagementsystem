import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./app.module.scss";

import {
  Root,
  NotFound,
} from "routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      // {
      //   path: "login",
      //   element: <Login />,
      // },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
