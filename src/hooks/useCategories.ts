import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/categories.api";
import { queryKeys } from "@/lib/query/query-keys";

export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: getCategories,
    select: (res) => res.data, // শুধু product array টা component এ দরকার
  });
};
