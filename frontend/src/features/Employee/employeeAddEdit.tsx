import { useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "app/hooks";
import { AddEditPage, Form } from "components";

import { entityName } from './employeeApi';
import { create, employeeStatus, getById, selectEmployeeById, update } from "./employeeSlice";
import { employeeObjectType } from "./employeeType";


const EmployeeAddEdit = ({ type }: { type: 'add' | 'edit' | 'register' }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const status = useSelector(employeeStatus);
    const { id } = useParams();
    useEffect(() => {
        if (type === 'edit') {
            dispatch(getById(id!));
        }
    }, [id, dispatch, type])

    const data = useSelector((state) => selectEmployeeById(state, id!));


    const fields = {
        email: {
            type: "text" as const,
            label: "Email",
            placeholder: "test@test.com",
            errorMessage: "Invalid Email",
            regex:
                "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
            initialData: data ? data.email : "",
            disabled: type === 'edit',
        },
        password: {
            type: "password" as const,
            label: type === 'edit' ? "New Password" : "Password",
            placeholder: "********",
            errorMessage:
                "Invalid Password. Must contain atleast 1 Uppercase character, 1 Lowercase character, 1 number, 1 symbol and have minimum length of 8",
            regex:
                "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,}$",
            initialData: "",
            disabled: false,
        },
        name: {
            type: "text" as const,
            label: "Name",
            placeholder: "John doe",
            regex: "^.{5,30}$",
            errorMessage: "Name must have 5 to 30 characters",
            initialData: data ? data.name : "",
            disabled: false,
        },
        designation: {
            type: "text" as const,
            label: "Designation",
            placeholder: "Manager",
            regex: "^(?!s*$).+",
            errorMessage: "Designation cannot be blank",
            initialData: data ? data.designation : "",
            disabled: false,
        },
        department: {
            type: "text" as const,
            label: "Department",
            placeholder: "Technology",
            regex: "^(?!s*$).+",
            errorMessage: "Department cannot be blank",
            initialData: data ? data.department : "",
            disabled: false,
        },
        gender: {
            type: "select" as const,
            name: "gender",
            options: [
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
            ],
            label: "Gender",
            placeholder: "Male",
            initialData: data ? data.gender : "",
            disabled: false,
        },
        dob: {
            type: "date" as const,
            label: "Date of Birth",
            placeholder: "dd-mm-yyyy",
            initialData: data ? data.dob : "",
            disabled: false,
        },
        doj: {
            type: "date" as const,
            label: "Date of Joining",
            placeholder: "dd-mm-yyyy",
            initialData: data ? data.doj : "",
            disabled: false,
        },
    };

    const handleSubmit = async (data: employeeObjectType) => {
        dispatch(create(data));
    };

    const submitButton = {
        text: "Register",
    };

    useEffect(() => {
        if (status === "succeeded" && type === "register") {
            navigate("/login");
        }
    }, [navigate, status, type]);


    return type === 'register' ? (
        <div className="flex justify-center mb-10">
            <div className="px-5 py-8 md:px-0 w-[80%] sm:w-[50%] md:w-[30%] mt-12">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-center">
                        Create an Employee
                    </h2>
                    <p className="text-center">
                        Or{" "}
                        <Link
                            to="/login"
                            className={`text-blue-900 font-semibold text-sm`}
                        >
                            login to your account
                        </Link>
                    </p>
                </div>
                <Form
                    onSubmit={handleSubmit}
                    formFields={fields}
                    submitButton={submitButton}
                />
            </div>
        </div>
    ) : (
        <AddEditPage
            entityName={entityName}
            type={type}
            fields={fields}
            handleSubmit={
                (data: any) => {
                    if (type === "edit") {
                        dispatch(update({ ...data, id }));
                    } else {
                        dispatch(create(data));
                    }
                    navigate('/admin/employee');
                }
            }
        />
    )
}

export default EmployeeAddEdit;