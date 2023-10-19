import {getData, postData} from "@/api/APISpec";
import type {GetProjectResponseDto, GetProjectSearchResponseDto, GetProjectPageResponseDto} from "./ProjectDto";

export const getProjects = async (page: number, size: number, sort: string)
    : Promise<GetProjectPageResponseDto<GetProjectResponseDto>> => {
    try {
        const response
            = await getData<GetProjectPageResponseDto<GetProjectResponseDto>>(`/api/projects?page=${page}&size=${size}&sort=${sort}`);
        const getProjectPageResponseDto: GetProjectPageResponseDto<GetProjectResponseDto> = response.data;
        return getProjectPageResponseDto;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get project');
    }
}

export const getProjectSearchResult = async (query: string, page: number, size: number, sort: string)
    : Promise<GetProjectPageResponseDto<GetProjectSearchResponseDto>> => {
    try {
        const response
            = await getData<GetProjectPageResponseDto<GetProjectSearchResponseDto>>(`/api/projects/search?query=${query}&page=${page}&size=${size}&sort=${sort}`);
        const getProjectPageResponseDto: GetProjectPageResponseDto<GetProjectSearchResponseDto> = response.data;
        return getProjectPageResponseDto;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get project');
    }
}

export const authorizeProject = async (projectId: number) => {
    try {
        await postData(`/api/projects/${projectId}/auth`);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to auth project');
    }
}