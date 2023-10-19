import {getData} from "@/api/APISpec";
import type {GetMemberPageResponseDto, GetMemberResponseDto} from "./MemberDto";

export const getMembers = async (page: number, size: number, sort: string)
    : Promise<GetMemberPageResponseDto<GetMemberResponseDto>> => {
    try {
        const response
            = await getData<GetMemberPageResponseDto<GetMemberResponseDto>>(`/api/members?page=${page}&size=${size}&sort=${sort}`);
        const getMemberPageResponseDto: GetMemberPageResponseDto<GetMemberResponseDto> = response.data;
        return getMemberPageResponseDto;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get member');
    }
}

export const getMemberSearchResult = async (query: string, page: number, size: number, sort: string)
    : Promise<GetMemberPageResponseDto<GetMemberResponseDto>> => {
    try {
        const response
            = await getData<GetMemberPageResponseDto<GetMemberResponseDto>>(`/api/members/search?query=${query}&page=${page}&size=${size}&sort=${sort}`);
        const getMemberPageResponseDto: GetMemberPageResponseDto<GetMemberResponseDto> = response.data;
        return getMemberPageResponseDto;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get member');
    }
}