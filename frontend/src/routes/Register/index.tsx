import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "app/hooks";
import { Form } from "components";
import {
  create as createEmployee,
  employeeStatus,
} from "features/Employee/employeeSlice";
import { employeeObjectType } from "features/Employee/employeeType";
import { useEffect } from "react";
import { registerFormFields } from "./formFields";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(employeeStatus);

  const handleSubmit = async (data: employeeObjectType) => {
    dispatch(createEmployee(data));
  };

  const submitButton = {
    text: "Register",
  };

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/login");
    }
  }, [navigate, status]);

  return (
    <div className="flex justify-center mb-10">
      <div className="px-5 md:px-0 md:w-[25%] mt-12">
        <div className="space-y-2">
          <h2 className="text-xl md:text-3xl font-bold text-center">
            Create an Employee
          </h2>
          <p className="text-center">
            Or{" "}
            <Link
              to="/login"
              className={`text-indigo-700 font-semibold text-sm`}
            >
              login to your account
            </Link>
          </p>
        </div>
        <Form
          onSubmit={handleSubmit}
          formFields={registerFormFields}
          submitButton={submitButton}
        />
      </div>
    </div>
  );
}

export default Register;
