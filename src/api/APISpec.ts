import axios from "axios";
import type { SuccessResponse, ErrorResponse } from "@/type/APIResponse";
// import dotenv from "dotenv";
// dotenv.config();

// axios 인스턴스 생성
const client: Axios = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

//TODO: GET 메서드
export const getData = async <T>(url: string): Promise<SuccessResponse<T>> => {
  try {
    const response = await client.get<SuccessResponse<T>>(url);
    return response.data;
  } catch (error: ErrorResponse) {
    console.error(error.detail);
    throw new Error(error.message);
  }
};

//TODO: POST 메서드
export const postData = async <T>(url: string, data?: any): Promise<SuccessResponse<T>> => {
  try {
    const response = await client.post<SuccessResponse<T>>(url, data);
    return response.data;
  } catch (error: ErrorResponse) {
    console.error(error.detail);
    throw new Error(error.message);
  }
};