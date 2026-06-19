// ===== Centralized query key factory =====
// Server prefetch আর Client useQuery দুই জায়গাতেই এই একই function ব্যবহার করতে হবে,
// নাহলে key mismatch হয়ে hydration কাজ করবে না (duplicate fetch হয়ে যাবে)।

export const queryKeys = {
  categories: {
    all: ["categories"] as const,
  },
  products: {
    byCategory: (slug: string, page: number = 1) =>
      ["products", "category", slug, { page }] as const,
    detail: (id: string) => ["products", "detail", id] as const,
  },
  cart: {
    all: ["cart"] as const,
  },
};
