import { useDispatch, useSelector } from "app/hooks";
import { AddEditPage } from "components";
import { categoryStatus, get as getCategories, selectAllCategory } from "features/Category/categorySlice";
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { create, getById, selectMakeById, update } from "./makeSlice";


const MakeAddEdit = ({ type }: { type: 'add' | 'edit' }) => {
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

    const data = useSelector((state) => selectMakeById(state, id!));

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
    }

    return (
        <AddEditPage
            entityName="Make"
            type={type}
            fields={fields}
            handleSubmit={
                (data: any) => {
                    if (type === "edit") {
                        dispatch(update({ id: id!, data }));
                    } else {
                        dispatch(create(data));
                    }
                    navigate('/admin/make');
                }
            }
        />
    )
}

export default MakeAddEdit;