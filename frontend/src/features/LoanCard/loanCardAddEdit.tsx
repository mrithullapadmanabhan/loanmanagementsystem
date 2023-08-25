import { useDispatch, useSelector } from "app/hooks";
import { AddEditPage } from "components";
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
            initialData: data ? data.category : "",
            options: categories.map((category) => { return { value: category.id, label: category.name } }),
            disabled: type === "edit",
        },
        duration: {
            type: "text" as const,
            label: "Duration (in months)",
            placeholder: "",
            regex: "^[1-9][0-9]*$",
            errorMessage: "Duration can only be a non zero number",
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
                        dispatch(update({ id: id!, data }));
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