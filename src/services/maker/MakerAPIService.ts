import {getData} from "@/api/APISpec";
import type {GetMakerResponseDto, GetMakerPageResponseDto} from "./MakerDto";

export const getMakers = async (page: number, size: number, sort: string)
    : Promise<GetMakerPageResponseDto<GetMakerResponseDto>> => {
    try {
        const response
            = await getData<GetMakerPageResponseDto<GetMakerResponseDto>>(`/api/makers?page=${page}&size=${size}&sort=${sort}`);
        const getMakerPageResponseDto: GetMakerPageResponseDto<GetMakerResponseDto> = response.data;
        return getMakerPageResponseDto;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get maker');
    }
}

export const getMakerSearchResult = async (query: string, page: number, size: number, sort: string)
    : Promise<GetMakerPageResponseDto<GetMakerResponseDto>> => {
    try {
        const response
            = await getData<GetMakerPageResponseDto<GetMakerResponseDto>>(`/api/makers/search?query=${query}&page=${page}&size=${size}&sort=${sort}`);
        const getMakerPageResponseDto: GetMakerPageResponseDto<GetMakerResponseDto> = response.data;
        return getMakerPageResponseDto;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get maker');
    }
}