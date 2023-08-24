import { useDispatch, useSelector } from "app/hooks";
import AddEditPage from "components/AddEditPage";
import { categoryStatus, get as getCategories, selectAllCategory } from "features/Category/categorySlice";
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { create, getById, selectLoanCardById, update } from "./loanCardSlice";


const LoanCardAddEdit = ({ type }: { type: 'add' | 'edit' }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    const categories = useSelector(selectAllCategory);
    const categorystatus = useSelector(categoryStatus);

    useEffect(() => {
        if (categorystatus === "idle") {
            dispatch(getCategories());
        }
    }, [categorystatus, dispatch]);

    const data = useSelector((state) => selectLoanCardById(state, id!));

    useEffect(() => {
        if (type === 'edit') {
            dispatch(getById(id!));
        }
    }, [id, dispatch, type])


    const fields = {
        categoryID: {
            type: "select" as const,
            label: "Category",
            placeholder: "",
            errorMessage: null,
            regex: null,
            initialData: data ? data.category : "",
            options: categories.map((category) => { return { value: category.id, label: category.name } }),
            disabled: type === "edit",
        },
        name: {
            type: "text" as const,
            label: "Name",
            placeholder: "",
            errorMessage:
                "Name cannot be blank",
            regex:
                "^.{1,}$",
            initialData: data ? data.name : "",
            disabled: false,
        },
        duration: {
            type: "text" as const,
            label: "Duration (in years)",
            placeholder: "",
            errorMessage: null,
            regex: null,
            initialData: data ? data.duration : "",
            disabled: false,
        }
    }

    return (
        <AddEditPage
            entityName="LoanCard"
            type={type}
            fields={fields}
            handleSubmit={
                (data: any) => {
                    if (type === "edit") {
                        dispatch(update({ id: data.id, data }));
                    } else {
                        dispatch(create(data));
                    }
                    navigate('/admin/loanCard');
                }
            }
        />
    )
}

export default LoanCardAddEdit;