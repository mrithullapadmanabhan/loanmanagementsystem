import MakeList from "features/Make/makeList";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Login, NotFound, Register, Root } from "routes";

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
        path: "make",
        element: <MakeList />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
