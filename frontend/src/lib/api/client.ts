import axios from "axios";
import { env } from "@/src/config/env";

export const clientApi = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: env.API_TIMEOUT_MS,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const ACCESS_TOKEN_KEY = "haseri_access_token";

const extractAccessToken = (data: unknown) => {
  if (!data || typeof data !== "object") return null;
  const payload = data as Record<string, any>;

  return (
    payload.access_token ||
    payload.token ||
    payload.tokens?.access_token ||
    payload.data?.access_token ||
    payload.data?.tokens?.access_token ||
    null
  );
};

clientApi.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;
  const token = window.localStorage.getItem(ACCESS_TOKEN_KEY);

  if (token) {
    config.headers = config.headers ?? {};
    if (!("Authorization" in config.headers)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// Handle 401 - Refresh token via HTTPOnly cookie
clientApi.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const config = error.config as any;

      // Retry mechanism for fragile dev servers dropping connections
      if (error.message === "Network Error" && (!config._retryCount || config._retryCount < 2)) {
        config._retryCount = (config._retryCount || 0) + 1;
        await new Promise(resolve => setTimeout(resolve, 1000)); // wait 1s before retry
        return clientApi(config);
      }

      if (
        error.response?.status === 401 &&
        !config?.url?.includes("/auth/refresh")
      ) {
        try {
          const refreshResponse = await clientApi.post("/auth/refresh");
          const refreshedToken = extractAccessToken(refreshResponse.data);

          if (typeof window !== "undefined" && refreshedToken) {
            window.localStorage.setItem(ACCESS_TOKEN_KEY, refreshedToken);
          }

          return clientApi(config);
        } catch (refreshError) {
          const url = config?.url || "";
          const isBootstrapCheck = url.includes("/auth/me") || url.includes("/admin/me");

          if (typeof window !== "undefined" && !isBootstrapCheck) {
            window.location.href = "/login";
          }

          return Promise.reject(refreshError);
        }
      }

      const payload = error.response?.data as {
        success?: boolean;
        error?: string;
        errors?: Record<string, string>;
      };

      const message = payload?.error || error.message || "Something went wrong";
      
      const userFriendlyMessage = message === "Network Error" 
        ? "Unable to connect to our servers. Please check your internet connection."
        : message;

      const apiError = new Error(userFriendlyMessage);
      (apiError as any).errors = payload?.errors;
      (apiError as any).status = error.response?.status;
      return Promise.reject(apiError);
    }

    return Promise.reject(new Error("An unexpected error occurred. Please try again."));
  }
);