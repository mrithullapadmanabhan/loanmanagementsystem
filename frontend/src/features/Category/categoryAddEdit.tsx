import { useDispatch, useSelector } from "app/hooks";
import AddEditPage from "components/AddEditPage";
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { create, getById, selectCategoryById, update } from "./categorySlice";


const CategoryAddEdit = ({ type }: { type: 'add' | 'edit' }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    const data = useSelector((state) => selectCategoryById(state, id!));

    useEffect(() => {
        if (type === 'edit') {
            dispatch(getById(id!));
        }
    }, [id, dispatch, type])


    const fields = {
        name: {
            type: "text" as const,
            label: "Category Name",
            placeholder: "",
            errorMessage:
                "Name cannot be blank",
            regex:
                "^.{1,}$",
            initialData: data ? data.name : "",
            disabled: false,
        },
    }

    return (
        <AddEditPage
            entityName="Category"
            type={type}
            fields={fields}
            handleSubmit={
                (data: any) => {
                    if (type === "edit") {
                        dispatch(update({ id: data.id, data }));
                    } else {
                        dispatch(create(data));
                    }
                    navigate('/admin/category');
                }
            }
        />
    )
}

export default CategoryAddEdit;