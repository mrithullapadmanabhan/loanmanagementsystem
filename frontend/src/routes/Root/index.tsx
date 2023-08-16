import { Outlet, useNavigate } from 'react-router-dom';

import {
  faHome,
  faMoneyBillWave,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

import Sidebar from 'components/Sidebar';
import { isLoggedIn } from 'service/auth';
import { useEffect } from 'react';


const options = [
  { label: "View Loans", Icon: faHome, route: "/loans" },
  { label: "View Items Purchased", Icon: faCog, route: "/items" },
  { label: "Apply for loan", Icon: faMoneyBillWave, route: "/loan/apply" },
];

const Root = () => {
  const loggedIn = isLoggedIn();
  const navigate=useNavigate()

  useEffect(()=>{
    if(!loggedIn){
      navigate('/login')
    }
  },[loggedIn])
  

  return (
    <>
      <div className={ loggedIn ? 'overflow-hidden ml-0 sm:ml-[240px]' : 'overflow-hidden ml-0' }>
        { loggedIn && <Sidebar options = {options} /> }
        <Outlet />
      </div>
    </>
  );
};

export default Root;
