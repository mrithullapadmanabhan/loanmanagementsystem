import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { isAdmin } from 'service/auth';


const Admin = () => {
  const admin = isAdmin();
  const navigate = useNavigate()

  useEffect(() => {
    if (!admin) {
      navigate('/')
    }
  }, [admin, navigate])


  return (
    <>
      <Outlet />
    </>
  );
};

export default Admin;
