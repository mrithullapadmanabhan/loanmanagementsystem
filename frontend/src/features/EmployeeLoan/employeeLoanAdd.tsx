import { useDispatch, useSelector } from "app/hooks";
import { AddEditPage } from "components";
import { categoryStatus, get as getCategories, selectAllCategory, selectCategory, selectCategorySelected } from "features/Category/categorySlice";
import { employeeStatus, get as getEmployees, selectAllEmployee } from "features/Employee/employeeSlice";
import { get as getItemCards, selectItemCardByMake } from "features/ItemCard/itemCardSlice";
import { get as getMakes, makeStatus, selectMake, selectMakeByCategory, selectMakeSelected } from "features/Make/makeSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "service/auth";
import { create } from "./employeeLoanSlice";


const EmployeeLoanAdd = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const admin = isAdmin();

    const employeeID = localStorage.getItem("employeeID")

    const categories = useSelector(selectAllCategory);
    const categorystatus = useSelector(categoryStatus);
    const selectedCategory = useSelector(selectCategorySelected);

    useEffect(() => {
        if (categorystatus === "idle") {
            dispatch(getCategories());
        }
    }, [categorystatus, dispatch]);

    const makes = useSelector(selectMakeByCategory);
    const makestatus = useSelector(makeStatus);
    const selectedMake = useSelector(selectMakeSelected);

    useEffect(() => {
        if (makestatus === "idle") {
            dispatch(getMakes());
        }
    }, [makestatus, dispatch]);

    const employees = useSelector(selectAllEmployee)
    const employeestatus = useSelector(employeeStatus)

    useEffect(() => {
        if (employeestatus === "idle" && admin) {
            dispatch(getEmployees());
        }
    }, [employeestatus, dispatch, admin]);

    const itemcardstatus = useSelector(makeStatus);
    const selectedItemCard = useSelector(selectItemCardByMake)

    useEffect(() => {
        if (itemcardstatus === "idle") {
            dispatch(getItemCards())
        }
    }, [itemcardstatus, dispatch])



    const fields = {
        employeeID: admin ? {
            type: "select" as const,
            name: "EmployeeID",
            options: employees.map((employee) => { return { value: employee.id, label: employee.name } }),
            label: "Employee",
            placeholder: "",
            initialData: "",
            disabled: false,
        } : {
            type: "text" as const,
            label: "Employee ID",
            placeholder: "",
            initialData: employeeID !== null ? employeeID : "",
            disabled: true,
        },
        categoryID: {
            type: "select" as const,
            name: "Category",
            options: categories.map((category) => { return { value: category.id, label: category.name } }),
            label: "Category",
            placeholder: "",
            initialData: selectedCategory !== undefined && selectedCategory !== "" ? selectedCategory.id : "",
            changeFunction: (id: string) => {
                dispatch(selectCategory({ id: id }))
            },
            disabled: false,
        },
        makeID: {
            type: "select" as const,
            name: "Make",
            options: makes.map((make) => { return { value: make.id, label: make.name } }),
            label: "Make",
            placeholder: "",
            initialData: selectedMake !== undefined && selectedMake !== "" ? selectedMake?.id : "",
            changeFunction: (id: string) => {
                dispatch(selectMake({ id: id }))
            },
            disabled: false,
        },
        description: {
            type: "text" as const,
            label: "Item Description",
            placeholder: "",
            initialData: selectedItemCard !== undefined && selectedItemCard ? selectedItemCard.description : "",
            disabled: true,
        },
        value: {
            type: "text" as const,
            label: "Value",
            placeholder: "",
            initialData: selectedItemCard !== undefined && selectedItemCard ? selectedItemCard.value : "",
            disabled: true,
        },
    };


    return (
        <AddEditPage
            entityName="Loan"
            type="add"
            fields={fields}
            handleSubmit={
                (data: any) => {
                    dispatch(create(data));
                    admin ?
                        navigate('/admin/loan') :
                        navigate('/loan')
                }
            }
        />
    )
}

export default EmployeeLoanAdd;