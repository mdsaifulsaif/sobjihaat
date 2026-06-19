"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query/query-keys";
import { IProduct } from "@/types/product.types";
import { Cart } from "@/types/cart.types";
import { cartStore } from "@/lib/cart-store";

export const useCart = () => {
  const qc = useQueryClient();

  // ===== GET cart =====
  const { data: cart = { items: [] } } = useQuery<Cart>({
    queryKey: queryKeys.cart.all,
    queryFn: () => cartStore.get(),
    staleTime: Infinity, // localStorage থেকে পড়া, server নেই — mutation এ invalidate করব
  });

  const totals = cartStore.totals(cart);

  // ===== ADD to cart (optimistic) =====
  const { mutate: addToCart } = useMutation({
    mutationFn: async (product: IProduct) => cartStore.add(product),
    onMutate: async (product) => {
      await qc.cancelQueries({ queryKey: queryKeys.cart.all });
      const prev = qc.getQueryData<Cart>(queryKeys.cart.all);
      qc.setQueryData<Cart>(queryKeys.cart.all, (old = { items: [] }) => {
        const price = product.salePrice ?? product.regularPrice;
        const exists = old.items.find(
          (i) => i.productID === product._id && !i.variantID,
        );
        if (exists) {
          return {
            items: old.items.map((i) =>
              i.productID === product._id && !i.variantID
                ? { ...i, quantity: Math.min(i.quantity + 1, i.maxStock) }
                : i,
            ),
          };
        }
        return {
          items: [
            ...old.items,
            {
              productID: product._id,
              name: product.name,
              thumbnail: product.thumbnail,
              unitLabel: product.weightOrVolume
                ? `${product.weightOrVolume}`
                : "",
              price,
              quantity: 1,
              maxStock: product.stock,
            },
          ],
        };
      });
      return { prev };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prev) qc.setQueryData(queryKeys.cart.all, ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: queryKeys.cart.all }),
  });

  // ===== UPDATE qty =====
  const { mutate: updateQty } = useMutation({
    mutationFn: async ({
      productID,
      qty,
      variantID,
    }: {
      productID: string;
      qty: number;
      variantID?: string;
    }) => cartStore.updateQty(productID, qty, variantID),
    onMutate: async ({ productID, qty, variantID }) => {
      await qc.cancelQueries({ queryKey: queryKeys.cart.all });
      const prev = qc.getQueryData<Cart>(queryKeys.cart.all);
      qc.setQueryData<Cart>(queryKeys.cart.all, (old = { items: [] }) => ({
        items: old.items.map((i) =>
          i.productID === productID && i.variantID === variantID
            ? { ...i, quantity: Math.max(1, Math.min(qty, i.maxStock)) }
            : i,
        ),
      }));
      return { prev };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prev) qc.setQueryData(queryKeys.cart.all, ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: queryKeys.cart.all }),
  });

  // ===== REMOVE item =====
  const { mutate: removeItem } = useMutation({
    mutationFn: async ({
      productID,
      variantID,
    }: {
      productID: string;
      variantID?: string;
    }) => cartStore.remove(productID, variantID),
    onMutate: async ({ productID, variantID }) => {
      await qc.cancelQueries({ queryKey: queryKeys.cart.all });
      const prev = qc.getQueryData<Cart>(queryKeys.cart.all);
      qc.setQueryData<Cart>(queryKeys.cart.all, (old = { items: [] }) => ({
        items: old.items.filter(
          (i) => !(i.productID === productID && i.variantID === variantID),
        ),
      }));
      return { prev };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prev) qc.setQueryData(queryKeys.cart.all, ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: queryKeys.cart.all }),
  });

  // ===== CLEAR =====
  const { mutate: clearCart } = useMutation({
    mutationFn: async () => cartStore.clear(),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.cart.all }),
  });

  return { cart, totals, addToCart, updateQty, removeItem, clearCart };
};
