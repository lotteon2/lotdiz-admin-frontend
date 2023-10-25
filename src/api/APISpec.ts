import axios, {Axios, AxiosError, type AxiosResponse} from "axios";
import type {SuccessResponse} from "@/type/APIResponse";

// axios 인스턴스 생성
const client: Axios = axios.create({
    // baseURL: import.meta.env.VITE_ADMIN_SERVICE_URL,
    baseURL: "https://apigateway.lotteedu.com/admin-service",
    headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem("accessToken")
    }
});

export const getData = async <T>(url: string): Promise<SuccessResponse<T>> => {
    try {
        const response: AxiosResponse<SuccessResponse<T>>
            = await client.get<SuccessResponse<T>>(url);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response) {
                if (error.response.status >= 400) {
                    throw {
                        code: error.response.data.code,
                        message: error.response.data.message,
                        detail: error.response.data.detail
                    };
                }
                if (error.response.status < 500) {
                    throw error;
                }
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
        if (error instanceof AxiosError) {
            if (error.response) {
                if (error.response.status >= 400) {
                    throw {
                        code: error.response.data.code,
                        message: error.response.data.message,
                        detail: error.response.data.detail
                    };
                }
                if (error.response.status < 500) {
                    throw error;
                }
            }
        }
        console.error(error);
        throw new Error("internal server error");
    }
};