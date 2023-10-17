import { getData } from "@/api/APISpec";
import type { GetMemberResponseDto, GetMemberSearchResponseDto } from "./MemberDto";

export const getMembers = async (page: number, size: number, sort: string)
  : Promise<Array<GetMemberResponseDto>> => {
  try {
    const response = await getData<Array<GetMemberResponseDto>>(`/members?page=${page}&size=${size}&sort=${sort}`);
    const getMemberResponseDtos: Array<GetMemberResponseDto> = response.data["members"];
    return getMemberResponseDtos;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get member');
  }
}

export const getMemberSearchResult = async (query:string, page: number, size: number, sort: string)
  : Promise<Array<GetMemberSearchResponseDto>> => {
  try {
    const response = await getData<Array<GetMemberSearchResponseDto>>(`/members?query=${query}&page=${page}&size=${size}&sort=${sort}`);
    const getMemberSearchResponseDtos: Array<GetMemberSearchResponseDto> = response.data["members"];
    return getMemberSearchResponseDtos;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get member');
  }
}