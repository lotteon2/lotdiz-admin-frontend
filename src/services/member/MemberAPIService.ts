import {getData} from "@/api/APISpec";
import type {GetMemberPageResponseDto, GetMemberResponseDto} from "./MemberDto";
import type {SuccessResponse} from "@/type/APIResponse";

export const getMembers = async (page: number, size: number, sort: string)
    : Promise<GetMemberPageResponseDto<GetMemberResponseDto>> => {
    try {
        const response: SuccessResponse<GetMemberPageResponseDto<GetMemberResponseDto>>
            = await getData<GetMemberPageResponseDto<GetMemberResponseDto>>(
            `/api/members?page=${page}&size=${size}&sort=${sort}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to get member');
    }
}

export const getMemberSearchResult = async (query: string, page: number, size: number, sort: string)
    : Promise<GetMemberPageResponseDto<GetMemberResponseDto>> => {
    try {
        const response: SuccessResponse<GetMemberPageResponseDto<GetMemberResponseDto>>
            = await getData<GetMemberPageResponseDto<GetMemberResponseDto>>(
            `/api/members/search?query=${query}&page=${page}&size=${size}&sort=${sort}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to get member');
    }
}