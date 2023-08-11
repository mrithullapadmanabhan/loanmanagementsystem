import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {BrowserRouter, Routes, Route} from 'react-router-dom'


import "./app.module.scss";

import {
  Root,
  NotFound,
  Login,
  SignUp
} from "routes";
import withAuthentication from "authentication/withAuthentication";


const App = () => {
  return (
    <Routes>
      <Route  path='/' element={<Root />}/>
      <Route  path='/login' element={<Login />}/>
      <Route  path='/register' element={<SignUp />}/>
    </Routes>
  );
};

export default withAuthentication(App);
