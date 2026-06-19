import { axiosInstance } from "./axios-instance";
import { ApiListResponse, ApiSingleResponse } from "@/types/api.types";
import { IProduct } from "@/types/product.types";

interface GetProductsByCategoryParams {
  page?: number;
  limit?: number;
}

// GET /products/category/:slug  → তোমার দেখানো exact endpoint
export const getProductsByCategorySlug = async (
  slug: string,
  params?: GetProductsByCategoryParams,
): Promise<ApiListResponse<IProduct>> => {
  const res = await axiosInstance.get(`/products/category/${slug}`, {
    params,
  });
  return res.data;
};

// GET /products/:id  → product detail এর জন্য, পরে দরকার হবে
export const getProductById = async (
  id: string,
): Promise<ApiSingleResponse<IProduct>> => {
  const res = await axiosInstance.get(`/products/${id}`);
  return res.data;
};
