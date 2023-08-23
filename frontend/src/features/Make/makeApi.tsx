import { createApi, deleteApi, getApi, getByIdApi, updateApi } from "service/api";
import { makeObjectType, makeType } from "./makeType";

export const baseURL = '/make'


export const getMakes = async () => await getApi<makeType[]>(baseURL)
export const getMake = async (id: string) => await getByIdApi<makeType>(baseURL, id)
export const getMakesByCategory = async (categoryId: string) => await getApi<makeType[]>(`${baseURL}/category/${categoryId}`)
export const createMake = async (data: makeObjectType) => await createApi<makeType, makeObjectType>(baseURL, data)
export const updateMake = async (id: string, data: makeType) => await updateApi<makeType>(baseURL, id, data)
export const deleteMake = async (id: string) => await deleteApi(baseURL, id)

