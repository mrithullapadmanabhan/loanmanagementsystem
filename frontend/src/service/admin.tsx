import api from "./api";

export const getEmployeesApi = async () => {
  try {
    const res=await api.get("/category/");
    console.log(res.data)
    return res.data;
  } catch {
    return [];
  }
};
//returns all the loans details including loanid,loantype,duration
export const getLoansApi = async () => {
  try {
    const res=await api.get("/loancard/");
    console.log(res.data)
    return res.data;
  } catch {
    return [];
  }
};

export const getItemsApi = async () => {
  try {
    const res=await api.get("/itemcard/");
    console.log(res.data)
    return res.data;
  } catch {
    return [];
  } 
};


export const addItemApi = async(data: any) => {
  try{
      const res=await api.post(`loan/create`,data);
      console.log(res.data)
      return true
  } catch {
      return false
  }
}

