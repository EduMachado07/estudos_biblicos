import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";

export const AxiosInstance = axios.create({
  baseURL: "http://localhost:3333",
  timeout: 15000,
  withCredentials: true, // envia cookies automaticamente
});

// ✅ Instância separada sem interceptadores
const AxiosRefreshInstance = axios.create({
  baseURL: "http://localhost:3333",
  timeout: 10000,
  withCredentials: true,
});

let isRefreshing = false;
let failedRequestQueue: {
  onSuccess: () => void;
  onFailure: (error: AxiosError) => void;
}[] = [];

AxiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalConfig = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Se não for 401, rejeita normal
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Evita loop
    if (originalConfig._retry) {
      return Promise.reject(error);
    }
    originalConfig._retry = true;

    // Tenta refresh apenas uma vez
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        // ✅ Usa instância separada, sem interceptador
        await AxiosRefreshInstance.post("/refresh");

        // Reexecuta todas as requisições na fila
        failedRequestQueue.forEach((req) => req.onSuccess());
        failedRequestQueue = [];
      } catch (refreshError) {
        // 🔴 Se refresh falhar, limpa fila e redireciona login
        failedRequestQueue.forEach((req) =>
          req.onFailure(refreshError as AxiosError)
        );
        failedRequestQueue = [];

        // Força logout
        console.warn("⚠️ Refresh token ausente ou inválido. Redirecionando...");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Enquanto refresh acontece, adiciona requisição à fila
    return new Promise((resolve, reject) => {
      failedRequestQueue.push({
        onSuccess: () => resolve(AxiosInstance(originalConfig)),
        onFailure: (err: AxiosError) => reject(err),
      });
    });
  }
);
