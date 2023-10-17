import { getData } from "@/api/APISpec";
import type { GetMakerResponseDto, GetMakerSearchResponseDto } from "./MakerDto";

export const getMakers = async (page: number, size: number, sort: string)
  : Promise<Array<GetMakerResponseDto>> => {
  try {
    const response = await getData<Array<GetMakerResponseDto>>(`/makers?page=${page}&size=${size}&sort=${sort}`);
    const getMakerResponseDtos: Array<GetMakerResponseDto> = response.data["makers"];
    return getMakerResponseDtos;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get maker');
  }
}

export const getMakerSearchResult = async (query:string, page: number, size: number, sort: string)
  : Promise<Array<GetMakerSearchResponseDto>> => {
  try {
    const response = await getData<Array<GetMakerSearchResponseDto>>(`/makers?query=${query}&page=${page}&size=${size}&sort=${sort}`);
    const getMakerSearchResponseDtos: Array<GetMakerSearchResponseDto> = response.data["makers"];
    return getMakerSearchResponseDtos;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get maker');
  }
}