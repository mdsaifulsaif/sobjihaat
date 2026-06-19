"use client";

import Image from "next/image";
import { IProduct } from "@/types/product.types";

interface Props {
  product: IProduct;
  onAddToBag: (product: IProduct) => void;
}

export default function ProductCard({ product, onAddToBag }: Props) {
  const hasDiscount =
    product.salePrice && product.salePrice < product.regularPrice;
  const displayPrice = product.salePrice || product.regularPrice;

  return (
    <div className="product-card flex flex-col">
      <div className="relative w-full aspect-square bg-bg-gray">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          className="object-cover"
        />
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-secondary text-text-primary text-xs font-semibold px-2 py-0.5 rounded-custom">
            -{product.discountPercent}%
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1">
        <p className="body-s font-medium text-text-primary line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </p>
        {product.weightOrVolume && (
          <p className="body-s text-text-secondary mt-0.5">
            {product.weightOrVolume} unit
          </p>
        )}

        <div className="flex items-baseline gap-2 mt-2">
          <span className="body-m font-semibold text-text-primary">
            ৳{displayPrice}
          </span>
          {hasDiscount && (
            <span className="body-s text-text-secondary line-through">
              ৳{product.regularPrice}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onAddToBag(product)}
          disabled={product.stock <= 0}
          className="btn-primary mt-3 w-full text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
        >
          {product.stock <= 0 ? "Out of stock" : "Add to Bag"}
        </button>
      </div>
    </div>
  );
}
