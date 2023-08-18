import { Outlet, useNavigate } from 'react-router-dom';

import {
  faHome,
  faMoneyBillWave,
  faChair,
  faUser
} from "@fortawesome/free-solid-svg-icons";

import Sidebar from 'components/Sidebar';
import { isLoggedIn,isAdmin } from 'service/auth';
import { useEffect } from 'react';


const employeeOptions = [
  { label: "View Loans", Icon: faMoneyBillWave, route: "/loans" },
  { label: "View Items Purchased", Icon: faChair, route: "/employee/items" },
  { label: "Apply for loan", Icon: faMoneyBillWave, route: "/loan/apply" },
];

const adminOptions = [
  { label: "View Loan cards", Icon: faMoneyBillWave, route: "/admin/loan-card/all" },
  { label: "View Employees", Icon: faUser, route: "admin/employee/all" },
  { label: "View Items", Icon: faChair, route: "admin/item/all" },
];

const Root = () => {
  const loggedIn = isLoggedIn();
  const admin=isAdmin();
  const navigate=useNavigate()

  useEffect(()=>{
    if(!loggedIn){
      navigate('/login')
    }
  },[loggedIn])
  

  return (
    <>
      <div className={ loggedIn ? 'overflow-hidden ml-0 sm:ml-[240px]' : 'overflow-hidden ml-0' }>
        { loggedIn && <Sidebar options = {admin?adminOptions:employeeOptions} /> }
        <Outlet />
      </div>
    </>
  );
};

export default Root;
