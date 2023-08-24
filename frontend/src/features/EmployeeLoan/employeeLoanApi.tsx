import { createApi, getApi } from "service/api";
import { employeeLoanObjectType, employeeLoanType } from "./employeeLoanType";

export const baseURL = "/loan";

export const getLoans = async () => await getApi<employeeLoanType[]>(baseURL);
export const getEmployeeLoans = async (employeeId: string) =>
  await getApi<employeeLoanType[]>(`${baseURL}/employee/${employeeId}`);
export const createEmployeeLoan = async (data: employeeLoanObjectType) =>
  await createApi<employeeLoanType, employeeLoanObjectType>(baseURL, data);
export const markCompleted = async (id: string) =>
  await getApi<employeeLoanType>(`${baseURL}/${id}/status/completed`);
