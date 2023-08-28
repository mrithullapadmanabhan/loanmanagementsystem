import { withToast } from "features/common/withToast";
import { createApi, deleteApi, getApi, getByIdApi, updateApi } from "service/api";

import { categoryObjectType, categoryType } from "./categoryType";


export const baseURL = "/category";

export const entityName = "Category"
export const entityNamePlural = "Categories"


export const getCategories = async () =>
  await withToast(getApi<categoryType[]>(baseURL), entityNamePlural, "Fetch", { error: true });

export const getCategory = async (id: string) =>
  await withToast(getByIdApi<categoryType>(baseURL, id), entityName, "Fetch", { error: true });

export const createCategory = async (data: categoryObjectType) =>
  await withToast(createApi<categoryType, categoryObjectType>(baseURL, data), entityName, "Creat");

export const updateCategory = async (id: string, data: categoryType) =>
  await withToast(updateApi<categoryType>(baseURL, id, data), entityName, "Updat");

export const deleteCategory = async (id: string) =>
  await withToast(deleteApi(baseURL, id), entityName, "Delet");
