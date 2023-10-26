import {getData} from "@/api/APISpec";
import type {GetMakerResponseDto, GetMakerPageResponseDto} from "./MakerDto";
import type {SuccessResponse} from "@/type/APIResponse";

export const getMakers = async (page: number, size: number, sort: string)
    : Promise<GetMakerPageResponseDto<GetMakerResponseDto>> => {
    try {
        const response: SuccessResponse<GetMakerPageResponseDto<GetMakerResponseDto>>
            = await getData<GetMakerPageResponseDto<GetMakerResponseDto>>(`/admin-service/api/makers?page=${page}&size=${size}&sort=${sort}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to get maker');
    }
}

export const getMakerSearchResult = async (query: string, page: number, size: number, sort: string)
    : Promise<GetMakerPageResponseDto<GetMakerResponseDto>> => {
    try {
        const response: SuccessResponse<GetMakerPageResponseDto<GetMakerResponseDto>>
            = await getData<GetMakerPageResponseDto<GetMakerResponseDto>>(`/admin-service/api/makers/search?query=${query}&page=${page}&size=${size}&sort=${sort}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to get maker');
    }
}