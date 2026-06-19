import { IProduct } from "./product.types";

// ===== Cart types — client-side now, shaped so a backend cart can swap in later =====

export interface CartItem {
  productID: string;
  // variant select করা থাকলে এই _id, single product হলে undefined
  variantID?: string;

  name: string;
  thumbnail: string;
  unitLabel: string; // e.g. "1 kg" / "500 gm" — display এর জন্য pre-computed

  price: number; // salePrice থাকলে salePrice, না থাকলে regularPrice (effective unit price)
  quantity: number;

  maxStock: number; // qty বাড়ানোর সময় clamp করার জন্য
}

export interface Cart {
  items: CartItem[];
}

// helper — cart এ একটা item কে unique করার জন্য key (productID + variantID combo)
export const getCartItemKey = (productID: string, variantID?: string) =>
  variantID ? `${productID}_${variantID}` : productID;
