import api from "./api";

export const getEmployeesApi = async () => {
  try {
    const res=await api.get("/employee");
    console.log(res.data)
    return res.data;
  } catch {
    return [];
  }
};

export const getLoansApi = async () => {
  try {
    const res=await api.get("/loancard");
    console.log(res.data)
    return res.data;
  } catch {
    return [];
  }
};

export const getItemsApi = async () => {
  try {
    const res=await api.get("/itemcard");
    console.log(res.data)
    return res.data;
  } catch {
    return [];
  } 
};


export const addItemApi = async(data: any) => {
  try{
      const res=await api.post(`/itemcard/create`,data);
      console.log(res.data)
      return true
  } catch {
      return false
  }
}


export const addLoanCardApi = async(data: any) => {
  try{
      const res=await api.post(`/loancard/create`,data);
      console.log(res.data)
      return true
  } catch {
      return false
  }
}

export const getLoanCardById = async (id: any) => {
  try {
    const res=await api.get(`/loancard/${id}`);
    console.log(res.data)
    return res.data;
  } catch {
    return {};
  }
};

export const updateLoanCardById = async(id:any,data: any) => {
  try{
      const res=await api.put(`/loancard/${id}`,data);
      console.log(res.data)
      return true
  } catch {
      return false
  }
}

export const deleteLoanCardById = async (id: any) => {
  try {
    const res=await api.delete(`/loancard/${id}`);
    console.log(res.data)
    return true;
  } catch {
    return false;
  }
};


export const getEmployeeById = async (id: any) => {
  try {
    const res=await api.get(`/employee/${id}`);
    console.log(res.data)
    return res.data;
  } catch {
    return {};
  }
};

export const updateEmployeeById = async(id:any,data: any) => {
  try{
      const res=await api.put(`/employee/${id}`,data);
      console.log(res.data)
      return true
  } catch {
      return false
  }
}


export const deleteEmployeeById = async (id: any) => {
  try {
    const res=await api.delete(`/employee/${id}`);
    console.log(res.data)
    return true;
  } catch {
    return false;
  }
};

export const getItemById= async(id: any)=>{
  try {
    const res=await api.get(`/itemcard/${id}`);
    console.log(res.data)
    return res.data;
  } catch {
    return {};
  }
}

export const updateItemById = async(id:any,data: any) => {
  try{
      const res=await api.put(`/itemcard/${id}`,data);
      console.log(res.data)
      return true
  } catch {
      return false
  }
}

export const deleteItemById = async (id: any) => {
  try {
    const res=await api.delete(`/itemcard/${id}`);
    console.log(res.data)
    return true;
  } catch {
    return false;
  }
};