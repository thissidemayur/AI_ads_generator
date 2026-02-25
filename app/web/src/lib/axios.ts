import { env } from "@/lib/env";
import { useAuthStore } from "@/store/authStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

// 1. Create the Axios Instance
export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (error: any) => void;
}

interface CustomAxioRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// --- Global variables for Refresh Logic ---
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

/**
 * Process the queue of pending requests once the token is refreshed
 */
const processQueue = (error: Error | any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();
    const { currentWorkspace } = useWorkspaceStore.getState();

    // add Bearer token for auth
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // add tenantId
    if (currentWorkspace?.id && config.headers) {
      config.headers["x-tenant-id"] = currentWorkspace.id;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// resposne interceptor
// Handles Token Refresh (401 errors) and Request Queuing
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxioRequestConfig;

    // Check if error is 401 (Unauthorized) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If a refresh is already in progress, add this request to the queue
      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // Mark this request as a retry and start the refresh process
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call the refresh endpoint
        const { data } = await axios.post(
          `${env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const newToken = data.data.accessToken;

        // update authStore's accessToken
        useAuthStore.getState().setAccessToken(newToken);

        // resolve all requests in the queue with the new token
        processQueue(null, newToken);

        // Retry the original failed request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        // total cleanUp
        // If refresh fails, purge the stores and reject the queue
        processQueue(refreshError as Error, null);
        useAuthStore.getState().clearAuth();
        useWorkspaceStore.getState().clearWorkspace();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
