
"use client";

import CategorySidebar from "@/components/category/CategorySidebar";
import ProductGrid from "@/components/product/ProductGrid";
import { useCategories } from "@/hooks/useCategories";
import { useProductsByCategory } from "@/hooks/useProductsByCategory";

interface Props {
  slug: string;
}

export default function CategoryView({ slug }: Props) {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: productsRes, isLoading: productsLoading } =
    useProductsByCategory(slug, 1);

  const activeCategory = categories?.find((c) => c.slug === slug);

  return (
    <div className="container-custom py-6">
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
        <CategorySidebar
          categories={categories || []}
          activeSlug={slug}
          isLoading={categoriesLoading}
        />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="display-s text-text-primary">
              {activeCategory?.name || "Products"}
              <span className="body-s text-text-secondary ml-2 font-normal">
                ({productsRes?.meta.total ?? 0} items)
              </span>
            </h1>
          </div>

          <ProductGrid
            products={productsRes?.data || []}
            isLoading={productsLoading}
          />
        </div>
      </div>
    </div>
  );
}
