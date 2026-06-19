// ===== Generic API envelope — matches your backend's exact response shape =====

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

// list endpoints (e.g. /products/category/:slug) include `meta`
export interface ApiListResponse<T> {
  success: boolean;
  message: string;
  meta: PaginationMeta;
  data: T[];
}

// single-item endpoints (e.g. /products/:id) — no `meta`
export interface ApiSingleResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
