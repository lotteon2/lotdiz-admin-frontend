import { getData, postData } from "@/api/APISpec";
import type { GetProjectResponseDto } from "./ProjectDto";

export const getProjects = async (page: number, size: number, sort: string)
  : Promise<Array<GetProjectResponseDto>> => {
  try {
    const response = await getData<Array<GetProjectResponseDto>>(`/projects?page=${page}&size=${size}&sort=${sort}`);
    const getProjectResponseDtos: Array<GetProjectResponseDto> = response.data["projects"];
    return getProjectResponseDtos;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get project');
  }
}

export const authorizeProject = async (projectId: number) => {
  try {
    await postData(`/projects/${projectId}/auth`);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to auth project');
  }
}