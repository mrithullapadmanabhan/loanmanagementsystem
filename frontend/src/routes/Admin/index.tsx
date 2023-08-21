import { Outlet, useNavigate } from 'react-router-dom';
import { isAdmin } from 'service/auth';
import { useEffect } from 'react';


const Admin = () => {
  const admin=isAdmin();
  const navigate=useNavigate()

  useEffect(()=>{
    if(!admin){
      navigate('/')
    }
  },[admin])
  

  return (
    <>
        <Outlet />
    </>
  );
};

export default Admin;
