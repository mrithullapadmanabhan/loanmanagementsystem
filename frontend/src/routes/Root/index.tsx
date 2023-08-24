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
          "overflow-hidden ml-0" + (pageAuthRequired ? " sm:ml-[240px]" : "")
        }
      >
        {loggedIn && pageAuthRequired && <Sidebar />}
        <ToastContainer theme="dark" />
        <Outlet />
      </div>
    </>
  );
};

export default Root;
