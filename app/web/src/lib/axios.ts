import { env } from "@/lib/env";
import { useAuthStore } from "@/store/authStore";
import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

export const api = axios.create({
  baseURL:  env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (error: any) => void;
}

// custom interface to add our `_retry` flag to Axios Config
interface CustomAxioRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: Error | any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxioRequestConfig;
    // ensure error.response exists to avoid crashing on network error
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push(resolve, reject);
        })
          .then(() => api(originalRequest))
          .catch((err) => err.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${env.VITE_SERVER_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
          },
        );

        const newToken = data.data.accessToken;
        const { setAccessToken } = useAuthStore.getState();
        setAccessToken(newToken);

        processQueue(null, newToken);

        // update the header of the orignial rqst failed request before retrying
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        useAuthStore.getState().clearAuth();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
