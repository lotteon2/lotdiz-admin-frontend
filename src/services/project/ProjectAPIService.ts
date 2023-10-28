import { getData, postData } from '@/api/APISpec'
import type { GetProjectResponseDto, GetProjectSearchResponseDto, GetProjectPageResponseDto } from './ProjectDto'
import type { SuccessResponse } from '@/type/APIResponse'

export const getProjects = async (page: number, size: number, sort: string)
  : Promise<GetProjectPageResponseDto<GetProjectResponseDto>> => {
  try {
    const response: SuccessResponse<GetProjectPageResponseDto<GetProjectResponseDto>>
      = await getData<GetProjectPageResponseDto<GetProjectResponseDto>>(
      `/admin-service/api/projects?page=${page}&size=${size}&sort=${sort}`)
    setDateFormat(response)
    return response.data
  } catch (error) {
    throw new Error('Failed to get project')
  }
}

export const getProjectSearchResult = async (query: string, page: number, size: number, sort: string)
  : Promise<GetProjectPageResponseDto<GetProjectSearchResponseDto>> => {
  try {
    const response: SuccessResponse<GetProjectPageResponseDto<GetProjectResponseDto>>
      = await getData<GetProjectPageResponseDto<GetProjectSearchResponseDto>>(
      `/admin-service/api/projects/search?query=${query}&page=${page}&size=${size}&sort=${sort}`)
    setDateFormat(response)
    return response.data
  } catch (error) {
    throw new Error('Failed to get project')
  }
}

export const authorizeProject = async (projectId: number): Promise<void> => {
  try {
    await postData(`/admin-service/api/projects/${projectId}/auth`)
  } catch (error) {
    throw new Error('Failed to auth project')
  }
}

function setDateFormat(response: SuccessResponse<GetProjectPageResponseDto<GetProjectSearchResponseDto>>) {
  for (const project of response.data.projects) {
    const tsCreatedAt: Date = new Date(project.createdAt)
    const tsProjectDueDate: Date = new Date(project.projectDueDate)
    project.projectDueDate = `${tsProjectDueDate.getFullYear()}년 ${tsProjectDueDate.getMonth() + 1}월 ${tsProjectDueDate.getDate()}일`
    project.createdAt
      = `${tsCreatedAt.getFullYear()}년 ${tsCreatedAt.getMonth() + 1}월 ${tsCreatedAt.getDate()}일`
  }
}