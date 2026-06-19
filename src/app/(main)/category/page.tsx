import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query/query-client";
import { queryKeys } from "@/lib/query/query-keys";
import { getCategories } from "@/lib/api/categories.api";
import CategoriesView from "./category-view";

export const metadata = {
  title: "All Categories | GrocerBanga",
  description: "Browse all product categories",
};

export default async function CategoriesPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.categories.all,
    queryFn: getCategories,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoriesView />
    </HydrationBoundary>
  );
}
