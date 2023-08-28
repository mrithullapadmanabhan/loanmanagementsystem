import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "app/hooks";
import { Form } from "components";
import { toast } from "react-toastify";
import { apiLogin } from "service/auth";
import { loginFormFields } from "./formFields";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (data: any) => {
    const res = await apiLogin(data);
    if (res) {
      navigate("/");
    } else {
      toast.error("Invalid credentials entered")
    }
  };

  const submitButton = {
    text: "Login",
  };

  useEffect(() => {
    localStorage.clear();
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  return (
    <div className="flex justify-center h-screen">
      <div className="px-5 py-8 md:px-0 w-[80%] sm:w-[50%] md:w-[30%] mt-12">
        <div className="space-y-2">
          <div className="text-3xl font-bold text-center">Login</div>
          <p className="text-center">
            Or{" "}
            <Link
              to="/register"
              className={`text-blue-900 font-semibold text-sm`}
            >
              Create an account
            </Link>
          </p>
        </div>
        <Form
          onSubmit={handleSubmit}
          formFields={loginFormFields}
          submitButton={submitButton}
        />
      </div>
    </div>
  );
};

export default Login;
