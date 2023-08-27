import { withToast } from "features/common/withToast";

import { createApi, getApi } from "service/api";
import { employeeLoanObjectType, employeeLoanType } from "./employeeLoanType";


export const baseURL = "/loan";

export const entityName = "Employee Loan"
export const entityNamePlural = "Employee Loans"


export const getLoans = async () =>
  await withToast(getApi<employeeLoanType[]>(baseURL), entityNamePlural, "Fetch", { error: true });

export const getEmployeeLoans = async (employeeId: string) =>
  await withToast(getApi<employeeLoanType[]>(`${baseURL}/employee/${employeeId}`), entityNamePlural, "Fetch", { error: true });

export const createEmployeeLoan = async (data: employeeLoanObjectType) =>
  await withToast(createApi<employeeLoanType, employeeLoanObjectType>(baseURL, data), entityName, "Creat");

export const markCompleted = async (id: string) =>
  await withToast(getApi<employeeLoanType>(`${baseURL}/${id}/status/completed`), `status of Loan`, "Updat");
