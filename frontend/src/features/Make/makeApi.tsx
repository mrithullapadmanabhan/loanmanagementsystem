import { withToast } from "features/common/withToast";
import { createApi, deleteApi, getApi, getByIdApi, updateApi, } from "service/api";

import { makeObjectType, makeType } from "./makeType";


export const baseURL = "/make";

export const entityName = "Make"
export const entityNamePlural = "Makes"


export const getMakes = async () =>
  await withToast(getApi<makeType[]>(baseURL), entityNamePlural, "Fetch", { error: true });

export const getMakesByCategory = async (categoryId: string) =>
  await withToast(getApi<makeType[]>(`${baseURL}/category/${categoryId}`), entityNamePlural, "Fetch", { error: true });

export const getMake = async (id: string) =>
  await withToast(getByIdApi<makeType>(baseURL, id), entityName, "Fetch");

export const createMake = async (data: makeObjectType) =>
  await withToast(createApi<makeType, makeObjectType>(baseURL, data), entityName, "Creat");

export const updateMake = async (id: string, data: makeType) =>
  await withToast(updateApi<makeType>(baseURL, id, data), entityName, "Updat");

export const deleteMake = async (id: string) =>
  await withToast(deleteApi(baseURL, id), entityName, "Delet");
