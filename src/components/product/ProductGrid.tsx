"use client";

import { IProduct } from "@/types/product.types";
import ProductCard from "./ProductCard";
import { useCart } from "@/hooks/useCart";

interface Props {
  products: IProduct[];
  isLoading: boolean;
}

const SkeletonCard = () => (
  <div className="product-card animate-pulse">
    <div className="w-full aspect-square bg-gray-200" />
    <div className="p-3 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-8 bg-gray-200 rounded mt-3" />
    </div>
  </div>
);

export default function ProductGrid({ products, isLoading }: Props) {
  const { addToCart } = useCart();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-text-secondary">
        <span className="text-5xl mb-4">🛒</span>
        <p className="body-m">এই category তে কোনো product নেই।</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToBag={addToCart}
        />
      ))}
    </div>
  );
}
