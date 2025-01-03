import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface UseAxiosConfig<T> {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    data?: any;
    params?: Record<string, any>;
    headers?: Record<string, string>;
    defaultErrorMessage?: string;
}

interface UseAxiosResponse<T> {
    data: T | null;
    error: string | null;
    isSuccess: boolean;
}

export async function useAxios<T>({
              url,
              method,
              data,
              params,
              headers,
              defaultErrorMessage = "An error occurred.",
          }: UseAxiosConfig<T>): Promise<UseAxiosResponse<T>> {
    try {
        const config: AxiosRequestConfig = {
            url,
            method,
            data,
            params,
            headers,
        };

        const response: AxiosResponse<T> = await axios(config);

        return {
            data: response.data,
            error: null,
            isSuccess: true,
        };
    } catch (error: any) {
        console.error("Error:", error);
        return {
            data: null,
            error: error?.response?.data?.message || defaultErrorMessage,
            isSuccess: false,
        };
    }
}
