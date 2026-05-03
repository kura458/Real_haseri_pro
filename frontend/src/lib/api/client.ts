import axios from "axios";
import { env } from "@/src/config/env";

export const clientApi = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: env.API_TIMEOUT_MS,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Handle 401 - Refresh token via HTTPOnly cookie
clientApi.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === 401 &&
        !error.config?.url?.includes("/auth/refresh")
      ) {
        try {
          await clientApi.post("/auth/refresh");
          return clientApi(error.config!);
        } catch {
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
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