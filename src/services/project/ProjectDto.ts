export interface GetProjectResponseDto {
    projectId: number;
    projectName: string;
    categoryName: string;
    makerName: string;
    totalAccumuldatedFundingAmount: number;
    fundingAchievementRate: number;
    projectDueDate: string;
    projectIsAuthorized: boolean;
    createdAt: string;
}