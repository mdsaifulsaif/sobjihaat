import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query/query-client";
import { queryKeys } from "@/lib/query/query-keys";
import { getProductsByCategorySlug } from "@/lib/api/products.api";
import { getCategories } from "@/lib/api/categories.api";
import CategoryView from "./category-view";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategorySlugPage({ params }: PageProps) {
  const { slug } = await params;
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.products.byCategory(slug, 1),
      queryFn: () => getProductsByCategorySlug(slug, { page: 1 }),
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.categories.all,
      queryFn: getCategories,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryView slug={slug} />
    </HydrationBoundary>
  );
}
