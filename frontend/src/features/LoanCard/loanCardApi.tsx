import { createApi, deleteApi, getApi, getByIdApi, updateApi } from "service/api";
import { loanCardObjectType, loanCardType } from "./loanCardType";

export const baseURL = '/loanCard'


export const getLoanCards = async () => await getApi<loanCardType[]>(baseURL)
export const getLoanCard = async (id: string) => await getByIdApi<loanCardType>(baseURL, id)
export const createLoanCard = async (data: loanCardObjectType) => await createApi<loanCardType, loanCardObjectType>(baseURL, data)
export const updateLoanCard = async (id: string, data: loanCardType) => await updateApi<loanCardType>(baseURL, id, data)
export const deleteLoanCard = async (id: string) => await deleteApi(baseURL, id)

