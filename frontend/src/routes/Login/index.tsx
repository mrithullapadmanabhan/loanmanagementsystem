import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Form } from "components";
import { apiLogin } from "service/auth";

const Login = () => {
  const navigate = useNavigate();

  const formFields = [
    {
      fieldType: "input",
      name: "email",
      type: "text",
      label: "Email",
      placeholder: "test@test.com",
      errorMessage: "Invalid Email",
      regex:
        "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
      initialData: "",
    },
    {
      fieldType: "input",
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "********",
      errorMessage:
        "Invalid Password. Must contain atleast 1 Uppercase character, 1 Lowercase character, 1 number, 1 symbol and have minimum length of 8",
      regex:
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,}$",
      initialData: "",
    },
  ];

  const handleSubmit = async (data: any) => {
    const res = await apiLogin(data);
    if (res) {
      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
  };

  const submitButton = {
    text: "Login",
    color: "#4338CA",
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
              className={`text-[#4338CA] font-semibold text-sm`}
            >
              Create an account
            </Link>
          </p>
        </div>
        <Form
          onSubmit={handleSubmit}
          formFields={formFields}
          submitButton={submitButton}
        />
      </div>
    </div>
  );
};

export default Login;
