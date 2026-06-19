import { useQuery } from "@tanstack/react-query";
import { getProductsByCategorySlug } from "@/lib/api/products.api";
import { queryKeys } from "@/lib/query/query-keys";

export const useProductsByCategory = (slug: string, page: number = 1) => {
  return useQuery({
    queryKey: queryKeys.products.byCategory(slug, page),
    queryFn: () => getProductsByCategorySlug(slug, { page }),
    enabled: !!slug,
    // pagination করার সময় আগের page এর data দেখাতে থাকে যতক্ষণ না নতুনটা আসে (flicker কমায়)
    placeholderData: (previousData) => previousData,
  });
};
