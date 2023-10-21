import axios, {Axios, type AxiosResponse, AxiosError} from "axios";
import type {SuccessResponse, ErrorResponse} from "@/type/APIResponse";

// axios 인스턴스 생성
const client: Axios = axios.create({
    baseURL: import.meta.env.VITE_ADMIN_SERVICE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getData = async <T>(url: string): Promise<SuccessResponse<T>> => {
    try {
        const response: AxiosResponse<SuccessResponse<T>>
            = await client.get<SuccessResponse<T>>(url);
        return response.data;
    } catch (error) {
        if (error.isAxiosError && error.response) {
            // AxiosError with a response
            const axiosError = error as AxiosError;
            if (axiosError.response.status >= 400 && axiosError.response.status < 500) {
                // Handle 4xx client errors
                const errorResponse: ErrorResponse = {
                    code: axiosError.response.data.code,
                    message: axiosError.response.data.message,
                    detail: axiosError.response.data.detail
                };
                throw errorResponse;
            }
        }
        console.error(error);
        throw new Error("internal server error");
    }
};

export const postData = async <T>(url: string, data?: any): Promise<SuccessResponse<T>> => {
    try {
        const response: AxiosResponse<SuccessResponse<T>>
            = await client.post<SuccessResponse<T>>(url, data);
        return response.data;
    } catch (error) {
        if (error.isAxiosError && error.response) {
            // AxiosError with a response
            const axiosError = error as AxiosError;
            if (axiosError.response.status >= 400 && axiosError.response.status < 500) {
                // Handle 4xx client errors
                const errorResponse: ErrorResponse = {
                    code: axiosError.response.data.code,
                    message: axiosError.response.data.message,
                    detail: axiosError.response.data.detail
                };
                throw errorResponse;
            }
        }
        console.error(error);
        throw new Error("internal server error");
    }
};