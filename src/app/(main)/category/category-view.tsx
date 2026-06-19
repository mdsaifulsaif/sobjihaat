"use client";

import { useCategories } from "@/hooks/useCategories";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesView() {
  const { data: categories, isLoading } = useCategories();

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="display-s text-text-primary">All Categories</h1>
        <p className="body-s text-text-secondary mt-1">
          {categories?.length ?? 0} categories available
        </p>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="category-card animate-pulse p-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-3" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
              <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto mt-2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {categories
            ?.filter((c) => c.showInHome)
            .sort((a, b) => a.order - b.order)
            .map((cat) => (
              <Link
                key={cat._id}
                href={`/category/${cat.slug}`}
                className="category-card flex flex-col items-center p-4 text-center group"
              >
                {/* Image */}
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-bg-gray mb-3 ring-2 ring-transparent group-hover:ring-primary transition-all">
                  {cat.image ? (
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl bg-primary/10">
                      🛒
                    </div>
                  )}
                </div>

                {/* Name */}
                <p className="body-s font-semibold text-text-primary capitalize group-hover:text-primary transition-colors line-clamp-2">
                  {cat.name}
                </p>

                {/* Product count */}
                <p className="text-xs text-text-secondary mt-1">
                  {cat.productCount} items
                </p>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}