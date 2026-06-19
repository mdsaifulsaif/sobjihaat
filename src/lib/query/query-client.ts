import { QueryClient } from "@tanstack/react-query";

export const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // server prefetch করার পরে client এ আবার সাথে সাথে refetch না হোক
        staleTime: 60 * 1000, // 1 minute
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });

// browser এ singleton QueryClient — re-render এ নতুন instance তৈরি হওয়া আটকাবে
let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (typeof window === "undefined") {
    // server: প্রতি request এ নতুন client (shared state leak এড়াতে)
    return makeQueryClient();
  }
  // browser: singleton
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
};
