import { createApi, deleteApi, getApi, getByIdApi, updateApi } from "service/api";
import { itemCardObjectType, itemCardType } from "./itemCardType";

export const baseURL = '/itemCard'


export const getItemCards = async () => await getApi<itemCardType[]>(baseURL)
export const getItemCard = async (id: string) => await getByIdApi<itemCardType>(baseURL, id)
export const getItemCardsByEmployee = async (employeeId: string) => await getApi<itemCardType[]>(`${baseURL}/employee/${employeeId}`)
export const getItemCardsByMake = async (makeId: string) => await getApi<itemCardType[]>(`${baseURL}/make/${makeId}`)
export const createItemCard = async (data: itemCardObjectType) => await createApi<itemCardType, itemCardObjectType>(baseURL, data)
export const updateItemCard = async (id: string, data: itemCardType) => await updateApi<itemCardType>(baseURL, id, data)
export const deleteItemCard = async (id: string) => await deleteApi(baseURL, id)

