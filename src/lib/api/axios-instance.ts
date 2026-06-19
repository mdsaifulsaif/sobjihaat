import axios, { AxiosError } from "axios";

// ===== base URL — .env.local এ NEXT_PUBLIC_API_BASE_URL সেট করো =====
// .env.local উদাহরণ:
// NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== Request interceptor — token attach (পরে auth আসলে এখানেই হবে) =====
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ===== Response interceptor — error normalize করে একটা সহজ message বের করে দেয় =====
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "কিছু ভুল হয়েছে, আবার চেষ্টা করুন।";

    // future: 401 হলে এখানে refresh-token flow / logout বসানো যাবে
    return Promise.reject(new Error(message));
  },
);
