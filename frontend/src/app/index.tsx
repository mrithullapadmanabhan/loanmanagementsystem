import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {BrowserRouter, Routes, Route} from 'react-router-dom'


import "./app.module.scss";

import {
  Root,
  NotFound,
  Login,
  SignUp,
  ApplyLoan,
  ViewLoans
} from "routes";
import withAuthentication from "authentication/withAuthentication";


const App = () => {
  return (
    <Routes>
      <Route  path='/' element={<Root />}/>
      <Route  path='/login' element={<Login />}/>
      <Route  path='/register' element={<SignUp />}/>
      <Route  path='/apply-loan' element={<ApplyLoan />}/>
      <Route  path='/view-loans' element={<ViewLoans />}/>
    </Routes>
  );
};

export default withAuthentication(App);
