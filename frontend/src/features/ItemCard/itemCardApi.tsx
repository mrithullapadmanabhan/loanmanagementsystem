import { withToast } from "features/common/withToast";
import { createApi, deleteApi, getApi, getByIdApi, updateApi, } from "service/api";

import { itemCardObjectType, itemCardType } from "./itemCardType";


export const baseURL = "/itemcard";

export const entityName = "Itemcard"
export const entityNamePlural = "Itemcards"


export const getItemCards = async () =>
  await withToast(getApi<itemCardType[]>(baseURL), entityNamePlural, "Fetch", { error: true });

export const getItemCardsByEmployee = async (employeeId: string) =>
  await withToast(getApi<itemCardType[]>(`${baseURL}/employee/${employeeId}`), entityNamePlural, "Fetch", { error: true });

export const getItemCardsByMake = async (makeId: string) =>
  await withToast(getApi<itemCardType[]>(`${baseURL}/make/${makeId}`), entityNamePlural, "Fetch", { error: true });

export const getItemCard = async (id: string) =>
  await withToast(getByIdApi<itemCardType>(baseURL, id), entityName, "Fetch", { error: true });

export const createItemCard = async (data: itemCardObjectType) =>
  await withToast(createApi<itemCardType, itemCardObjectType>(baseURL, data), entityName, "Creat");

export const updateItemCard = async (id: string, data: itemCardType) =>
  await withToast(updateApi<itemCardType>(baseURL, id, data), entityName, "Updat");

export const deleteItemCard = async (id: string) =>
  await withToast(deleteApi(baseURL, id), entityName, "Delet");
