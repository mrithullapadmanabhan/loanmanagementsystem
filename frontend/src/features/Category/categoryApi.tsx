import {
  createApi,
  deleteApi,
  getApi,
  getByIdApi,
  updateApi,
} from "service/api";
import { categoryObjectType, categoryType } from "./categoryType";

export const baseURL = "/category";

export const getCategories = async () => await getApi<categoryType[]>(baseURL);
export const getCategory = async (id: string) =>
  await getByIdApi<categoryType>(baseURL, id);
export const createCategory = async (data: categoryObjectType) =>
  await createApi<categoryType, categoryObjectType>(baseURL, data);
export const updateCategory = async (id: string, data: categoryType) =>
  await updateApi<categoryType>(baseURL, id, data);
export const deleteCategory = async (id: string) =>
  await deleteApi(baseURL, id);
