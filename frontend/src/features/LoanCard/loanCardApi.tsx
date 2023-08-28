import { withToast } from "features/common/withToast";
import { createApi, deleteApi, getApi, getByIdApi, updateApi } from "service/api";

import { loanCardObjectType, loanCardType } from "./loanCardType";


export const baseURL = "/loancard";

export const entityName = "Loancard"
export const entityNamePlural = "Loancards"


export const getLoanCards = async () =>
  await withToast(getApi<loanCardType[]>(baseURL), entityNamePlural, "Fetch", { error: true });

export const getLoanCard = async (id: string) =>
  await withToast(getByIdApi<loanCardType>(baseURL, id), entityName, "Fetch", { error: true });

export const createLoanCard = async (data: loanCardObjectType) =>
  await withToast(createApi<loanCardType, loanCardObjectType>(baseURL, data), entityName, "Creat");

export const updateLoanCard = async (id: string, data: loanCardType) =>
  await withToast(updateApi<loanCardType>(baseURL, id, data), entityName, "Updat");

export const deleteLoanCard = async (id: string) =>
  await withToast(deleteApi(baseURL, id), entityName, "Delet");
