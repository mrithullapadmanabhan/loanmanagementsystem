import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import "./app.module.scss";

import {
  Root,
  NotFound,
  Login,
  SignUp
} from "routes";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/' element={<Root />}/>
        <Route  path='/login' element={<Login />}/>
        <Route  path='/register' element={<SignUp />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
