// ===== Product types — matches /v1/products/category/:slug response =====

export interface IProductVariant {
  _id?: string;
  weightOrVolume: number;
  unitID: string | { _id: string; name: string; shortName?: string }; // populated হলে object
  costPrice?: number;
  regularPrice: number;
  salePrice?: number;
  stock: number;
  sku?: string;
}

export interface IComboItem {
  productID: string;
  quantity: number;
  selectedVariant?: string | null;
}

export interface ISpecification {
  key: string;
  value: string;
}

// category populate করা হলে backend "categoryDetails" নামে পাঠায় (তোমার sample অনুযায়ী)
export interface ICategoryDetails {
  _id?: string;
  name: string;
  slug?: string;
  image?: string;
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;

  brandID: string;
  categoryID: string;
  categoryDetails?: ICategoryDetails;

  tags: string[];

  costPrice: number;
  regularPrice: number;
  salePrice?: number;
  discountPercent: number;

  stock: number;
  reservedStock: number;
  sku: string;
  lowStockAlert: number;

  productType: "single" | "combo";

  unit: string;
  weightOrVolume?: number;

  variants: IProductVariant[];
  comboItems: IComboItem[];
  specifications: ISpecification[];

  thumbnail: string;
  images: string[];

  status: "active" | "inactive" | "draft";
  isFeatured: boolean;
  isOnSale: boolean;
  isNew: boolean;

  freeShipping: boolean;
  shippingCost: number;
  shippingClass: "normal" | "fragile" | "heavy";

  metaTitle?: string;
  metaDescription?: string;

  rating: number;
  numReviews: number;

  lowdown: string[];

  createdAt: string;
  updatedAt: string;
}
