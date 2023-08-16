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
      const res=await api.get(`/make/${category}`);
      console.log(res.data)
      return res.data;
    } catch {
      return [];
    }
  };
  