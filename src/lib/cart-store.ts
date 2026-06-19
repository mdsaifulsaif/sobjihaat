// lib/cart-store.ts
// TanStack Query এর বাইরে একটা simple local cart store।
// পরে backend cart API আসলে এই file টার logic বদলালেই হবে,
// useCart hook এবং component কোড অপরিবর্তিত থাকবে।

import { Cart, CartItem, getCartItemKey } from "@/types/cart.types";
import { IProduct } from "@/types/product.types";

const CART_KEY = "gb_cart";

const read = (): Cart => {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : { items: [] };
  } catch {
    return { items: [] };
  }
};

const write = (cart: Cart): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const cartStore = {
  get: (): Cart => read(),

  add: (product: IProduct, variantID?: string): Cart => {
    const cart = read();
    const key = getCartItemKey(product._id, variantID);
    const existing = cart.items.find(
      (i) => getCartItemKey(i.productID, i.variantID) === key,
    );

    const price = product.salePrice ?? product.regularPrice;

    if (existing) {
      existing.quantity = Math.min(existing.quantity + 1, existing.maxStock);
    } else {
      const newItem: CartItem = {
        productID: product._id,
        variantID,
        name: product.name,
        thumbnail: product.thumbnail,
        unitLabel: product.weightOrVolume ? `${product.weightOrVolume}` : "",
        price,
        quantity: 1,
        maxStock: product.stock,
      };
      cart.items.push(newItem);
    }

    write(cart);
    return cart;
  },

  updateQty: (productID: string, qty: number, variantID?: string): Cart => {
    const cart = read();
    const key = getCartItemKey(productID, variantID);
    const item = cart.items.find(
      (i) => getCartItemKey(i.productID, i.variantID) === key,
    );
    if (!item) return cart;
    item.quantity = Math.max(1, Math.min(qty, item.maxStock));
    write(cart);
    return cart;
  },

  remove: (productID: string, variantID?: string): Cart => {
    const cart = read();
    const key = getCartItemKey(productID, variantID);
    cart.items = cart.items.filter(
      (i) => getCartItemKey(i.productID, i.variantID) !== key,
    );
    write(cart);
    return cart;
  },

  clear: (): Cart => {
    const empty: Cart = { items: [] };
    write(empty);
    return empty;
  },

  totals: (cart: Cart) => {
    const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const totalQty = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    return { subtotal, totalQty };
  },
};