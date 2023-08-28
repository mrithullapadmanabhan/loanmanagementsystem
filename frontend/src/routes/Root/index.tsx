import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "components/Sidebar";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { isLoggedIn, isPageAuthenticationRequired } from "service/auth";

import "react-toastify/dist/ReactToastify.css";

const Root = () => {
  const loggedIn = isLoggedIn();
  const pageAuthRequired = isPageAuthenticationRequired();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn && pageAuthRequired) {
      navigate("/login");
    }
  }, [loggedIn, pageAuthRequired, navigate]);

  return (
    <>
      <div
        className={
          "overflow-hidden transition-all duration-300" + (pageAuthRequired ? "mt-5 ml-14 md:ml-64" : "")
        }
      >
        {loggedIn && pageAuthRequired && <Sidebar />}
        <ToastContainer theme="dark" position="bottom-left" autoClose={1000} />
        <Outlet />
      </div>
    </>
  );
};

export default Root;
