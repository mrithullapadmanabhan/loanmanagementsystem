import { Link, useNavigate } from "react-router-dom";

import { Form } from "components";
import { employeeRegister } from "service/auth";

function SignUp() {
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
    {
      fieldType: "input",
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "John doe",
      initialData: "",
    },
    {
      fieldType: "input",
      name: "designation",
      type: "text",
      label: "Designation",
      placeholder: "Manager",
      initialData: "",
    },
    {
      fieldType: "input",
      name: "department",
      type: "text",
      label: "Department",
      placeholder: "Technology",
      initialData: "",
    },
    {
      fieldType: "dropdown",
      name: "gender",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" }
      ],
      label: "Gender",
      placeholder: "Male",
      initialData: "",
    },
    {
      fieldType: "input",
      name: "dob",
      type: "date",
      max: "2005-12-31",
      label: "Date of Birth",
      placeholder: "dd-mm-yyyy",
      initialData: "",
    },
    {
      fieldType: "input",
      name: "doj",
      type: "date",
      min: "1990-01-01",
      max: new Date().toISOString().split('T')[0],
      label: "Date of Joining",
      placeholder: "dd-mm-yyyy",
      initialData: "",
    }
  ];

  const handleSubmit = async (data: any) => {
    const res = await employeeRegister(data);
    if (res) {
      navigate("/login");
    } else {
      alert("Invalid Credentials");
    }
  };

  const submitButton = {
    text: "Register",
    color: "#4338CA",
  };

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
              className={`text-[#4338CA] font-semibold text-sm`}
            >
              login to your account
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
}

export default SignUp;
