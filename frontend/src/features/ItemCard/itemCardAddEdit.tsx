import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "app/hooks";
import { AddEditPage } from "components";
import { categoryStatus, get as getCategories, selectAllCategory, selectCategory, selectCategorySelected } from "features/Category/categorySlice";
import { get as getMakes, makeStatus, selectMake, selectMakeByCategory, selectMakeSelected } from "features/Make/makeSlice";

import { entityName } from './itemCardApi';
import { create, getById, selectItemCardById, update } from "./itemCardSlice";


const ItemCardAddEdit = ({ type }: { type: 'add' | 'edit' }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { id } = useParams();
    const data = useSelector((state) => selectItemCardById(state, id!));

    useEffect(() => {
        if (type === 'edit') {
            dispatch(getById(id!));
        }
    }, [id, dispatch, type])


    const categories = useSelector(selectAllCategory);
    const selectedCategory = useSelector(selectCategorySelected);

    const categorystatus = useSelector(categoryStatus);
    useEffect(() => {
        if (categorystatus === "idle") {
            dispatch(getCategories());
        }
    }, [categorystatus, dispatch]);


    const makes = useSelector(selectMakeByCategory);
    const selectedMake = useSelector(selectMakeSelected);

    const makestatus = useSelector(makeStatus);
    useEffect(() => {
        if (makestatus === "idle") {
            dispatch(getMakes());
        }
    }, [makestatus, dispatch, selectedCategory]);


    const fields = {
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
            label: "Description",
            placeholder: "",
            errorMessage:
                "Description cannot be blank",
            regex:
                "^.{1,}$",
            initialData: data ? data.description : "",
            disabled: false,
        },
        value: {
            type: "text" as const,
            label: "Value (in $)",
            placeholder: "",
            regex: "^[1-9][0-9]*$",
            errorMessage: "Value can only be a non zero number",
            initialData: data ? data.value : "",
            disabled: false,
        }
    }

    return (
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
                    navigate('/admin/itemCard');
                }
            }
        />
    )
}

export default ItemCardAddEdit;