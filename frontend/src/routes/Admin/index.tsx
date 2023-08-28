import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAdmin } from 'service/auth';


const Admin = () => {
  const admin = isAdmin();
  const navigate = useNavigate()

  useEffect(() => {
    if (!admin) {
      toast.error('You are not an admin. This route is protected')
      navigate('/')
    }
  }, [admin, navigate])


  return (
    <Outlet />
  );
};

export default Admin;
