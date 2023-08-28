import { withToast } from "features/common/withToast";
import { createApi, deleteApi, getApi, getByIdApi, updateApi } from "service/api";

import { employeeObjectType, employeeType } from "./employeeType";


export const baseURL = "/employee";

export const entityName = "Employee"
export const entityNamePlural = "Employees"


export const getEmployees = async () =>
  await withToast(getApi<employeeType[]>(baseURL), entityNamePlural, "Fetch", { error: true });

export const getEmployee = async (id: string) =>
  await withToast(getByIdApi<employeeType>(baseURL, id), entityName, "Fetch", { error: true });

export const createEmployee = async (data: employeeObjectType) =>
  await withToast(createApi<employeeType, employeeObjectType>(baseURL, data), entityName, "Creat");

export const updateEmployee = async (id: string, data: employeeType) =>
  await withToast(updateApi<employeeType>(baseURL, id, data), entityName, "Updat");

export const deleteEmployee = async (id: string) =>
  await withToast(deleteApi(baseURL, id), entityName, "Delet");
