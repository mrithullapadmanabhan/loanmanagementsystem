import api from "./api";

export const getItemsCategories = async () => {
  try {
    const res=await api.get("/category/");
    console.log(res.data)
    return res.data;
  } catch {
    return [];
  }
};


export const getItemsMake = async (category: any) => {
    try {
      const res=await api.get(`/make/category/${category}`);
      console.log(res.data)
      return res.data;
    } catch {
      return [];
    }
  };
  
export const getItemsFromMake = async(make: any) => {
    try{
        const res=await api.get(`itemcard/make/${make}`);
        console.log(res.data)
        return res.data
    } catch {
        return {}
    }
}