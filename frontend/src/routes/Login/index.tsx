import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Form } from "components";
import { apiLogin } from "service/auth";
import { loginFormFields } from "./formFields";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    const res = await apiLogin(data);
    if (res) {
      navigate("/");
    }
  };

  const submitButton = {
    text: "Login",
  };

  useEffect(() => {
    localStorage.clear();
  });

  return (
    <div className="flex justify-center h-screen">
      <div className="px-5 py-8 md:px-0 md:w-[25%] mt-12">
        <div className="space-y-2">
          <h2 className="text-xl md:text-3xl font-bold text-center">Login</h2>
          <p className="text-center">
            Or{" "}
            <Link
              to="/register"
              className={`text-indigo-700 font-semibold text-sm`}
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
