import { useDispatch, useSelector } from "app/hooks";
import AddEditPage from "components/AddEditPage";
import { categoryStatus, get as getCategories, selectAllCategory, selectCategoryById } from "features/Category/categorySlice";
import { get as getMakes, makeStatus, selectAllMake, selectMakeById } from "features/Make/makeSlice";
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { create, getById, selectItemCardById, update } from "./itemCardSlice";


const ItemCardAddEdit = ({ type }: { type: 'add' | 'edit' }) => {
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

    const makes = useSelector(selectAllMake);
    const makestatus = useSelector(makeStatus)

    useEffect(() => {
        if (makestatus === "idle") {
            dispatch(getMakes());
        }
    }, [makestatus, dispatch]);

    const data = useSelector((state) => selectItemCardById(state, id!));
    const make = useSelector((state) => selectMakeById(state, data?.make!))
    const category = useSelector((state) => selectCategoryById(state, make?.category!))

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
            initialData: data && make && category ? category.name : "",
            options: categories.map((category) => { return { value: category.id, label: category.name } }),
            disabled: type === "edit",
        },
        makeID: {
            type: "select" as const,
            label: "Make",
            placeholder: "",
            errorMessage: null,
            regex: null,
            initialData: data ? data.make : "",
            options: makes.map((make) => { return { value: make.id, label: make.name } }),
            optionsFilter: ({ categoryID }: { [name: string]: string }, { value }: { value: string, label: string }) => { return make?.category === categoryID },
            disabled: type === "edit",
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
            errorMessage: null,
            regex: null,
            initialData: data ? data.value : "",
            disabled: false,
        }
    }

    return (
        <AddEditPage
            entityName="ItemCard"
            type={type}
            fields={fields}
            handleSubmit={
                (data: any) => {
                    if (type === "edit") {
                        dispatch(update({ id: data.id, data }));
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