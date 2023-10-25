export interface GetProjectPageResponseDto<T> {
    totalPages: number,
    projects: Array<T>
}

export interface GetProjectResponseDto {
    projectId: number;
    projectName: string;
    categoryName: string;
    makerName: string;
    projectDueDate: string;
    projectIsAuthorized: boolean;
    createdAt: string;
}

export interface GetProjectSearchResponseDto {
    projectId: number;
    projectName: string;
    categoryName: string;
    makerName: string;
    projectDueDate: string;
    projectIsAuthorized: boolean;
    createdAt: string;
}