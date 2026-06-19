import { axiosInstance } from "./axios-instance";
import { ApiListResponse } from "@/types/api.types";
import { ICategory } from "@/types/category.types";

export const getCategories = async (): Promise<ApiListResponse<ICategory>> => {
  const res = await axiosInstance.get("/categories");
  return res.data;
};
