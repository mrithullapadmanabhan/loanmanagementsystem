import { useDispatch, useSelector } from "app/hooks";
import { AddEditPage } from "components";
import { categoryStatus, get as getCategories, selectAllCategory, selectCategory, selectCategorySelected } from "features/Category/categorySlice";
import { selectItemCardSelected } from "features/ItemCard/itemCardSlice";
import { getByCategory as getMakesByCategory, makeStatus, selectAllMake, selectMake, selectMakeSelected } from "features/Make/makeSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "./employeeLoanSlice";


const EmployeeLoanAdd = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const employeeID = localStorage.getItem("employeeID")

    const categories = useSelector(selectAllCategory);
    const categorystatus = useSelector(categoryStatus);
    const selectedCategory = useSelector(selectCategorySelected);

    useEffect(() => {
        if (categorystatus === "idle") {
            dispatch(getCategories());
        }
    }, [categorystatus, dispatch]);

    const makes = useSelector(selectAllMake);
    const makestatus = useSelector(makeStatus);
    const selectedMake = useSelector(selectMakeSelected);

    useEffect(() => {
        if (makestatus === "idle" && selectedCategory !== "" && selectedCategory !== undefined) {
            dispatch(getMakesByCategory(selectedCategory.id));
        }
    }, [makestatus, dispatch, selectedCategory]);

    const itemCard = useSelector(selectItemCardSelected)


    const fields = {
        employeeID: {
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
            placeholder: "Male",
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
            initialData: itemCard ? itemCard.description : "",
            disabled: true,
        },
        value: {
            type: "date" as const,
            label: "Item Make",
            placeholder: "",
            initialData: itemCard ? itemCard.value : "",
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
                    navigate('/admin/employeeLoan');
                }
            }
        />
    )
}

export default EmployeeLoanAdd;