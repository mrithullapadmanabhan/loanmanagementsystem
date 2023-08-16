import api from "./api";

export const getItemsCategories = async () => {
  try {
    const res=await api.get("/category");
    console.log(res.data)
    return res;
  } catch {
    return [];
  }
};
