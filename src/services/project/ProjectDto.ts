export interface GetProjectResponseDto {
    projectId: number;
    projectName: string;
    categoryName: string;
    makerName: string;
    projectDueDate: string;
    projectIsAuthorized: boolean;
    createdAt: string;
}