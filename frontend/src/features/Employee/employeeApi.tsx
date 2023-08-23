import { createApi, deleteApi, getApi, getByIdApi, updateApi } from "service/api";
import { employeeObjectType, employeeType } from "./employeeType";

export const baseURL = '/employee'


export const getEmployees = async () => await getApi<employeeType[]>(baseURL)
export const getEmployee = async (id: string) => await getByIdApi<employeeType>(baseURL, id)
export const createEmployee = async (data: employeeObjectType) => await createApi<employeeType, employeeObjectType>(baseURL, data)
export const updateEmployee = async (id: string, data: employeeType) => await updateApi<employeeType>(baseURL, id, data)
export const deleteEmployee = async (id: string) => await deleteApi(baseURL, id)

