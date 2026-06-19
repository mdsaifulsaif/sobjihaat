"use client";

import Link from "next/link";
import Image from "next/image";
import { ICategory } from "@/types/category.types";

interface Props {
  categories: ICategory[];
  activeSlug: string;
  isLoading: boolean;
}

export default function CategorySidebar({
  categories,
  activeSlug,
  isLoading,
}: Props) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-12 rounded-custom bg-gray-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <nav className="space-y-1.5">
      {categories
        .filter((c) => c.showInMenu)
        .sort((a, b) => a.order - b.order)
        .map((cat) => {
          const isActive = cat.slug === activeSlug;
          return (
            <Link
              key={cat._id}
              href={`/category/${cat.slug}`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-custom transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-text-primary hover:bg-bg-gray"
              }`}
            >
              <span className="relative w-8 h-8 rounded-full overflow-hidden bg-bg-gray flex-shrink-0">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </span>
              <span className="body-m capitalize">{cat.name}</span>
            </Link>
          );
        })}
    </nav>
  );
}
