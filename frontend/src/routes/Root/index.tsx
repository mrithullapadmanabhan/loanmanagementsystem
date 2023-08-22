import { Outlet, useNavigate } from 'react-router-dom';

import {
  faChair,
  faMoneyBillWave,
  faRightFromBracket,
  faUser
} from "@fortawesome/free-solid-svg-icons";

import Sidebar from 'components/Sidebar';
import { useEffect } from 'react';
import { isAdmin, isLoggedIn } from 'service/auth';


const employeeOptions = [
  { label: "View Loans", Icon: faMoneyBillWave, route: "/loans" },
  { label: "View Items Purchased", Icon: faChair, route: "/employee/items" },
  { label: "Apply for loan", Icon: faMoneyBillWave, route: "/loan/apply" },
  { label: "Logout", Icon: faRightFromBracket, route: "login" }
];

const adminOptions = [
  { label: "View Loan cards", Icon: faMoneyBillWave, route: "/admin/loan-card/all" },
  { label: "View Employees", Icon: faUser, route: "admin/employee/all" },
  { label: "View Items", Icon: faChair, route: "admin/item/all" },
<<<<<<< HEAD
  { label: "View Makes", Icon: faChair, route: "admin/make/all" },
=======
  { label: "View Categories", Icon: faChair, route: "admin/category/all" },
  { label: "Logout", Icon: faRightFromBracket, route: "login" }
>>>>>>> a24fca614ce7fded3c1b3549d826a1dafaa41a87
];

const Root = () => {
  const loggedIn = isLoggedIn();
  const admin = isAdmin();
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login')
    }
  }, [loggedIn])


  return (
    <>
      <div className={loggedIn ? 'overflow-hidden ml-0 sm:ml-[240px]' : 'overflow-hidden ml-0'}>
        {loggedIn && <Sidebar options={admin ? adminOptions : employeeOptions} isAdmin={admin} />}
        <Outlet />
      </div>
    </>
  );
};

export default Root;
