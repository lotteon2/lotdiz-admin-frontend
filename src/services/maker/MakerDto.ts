export interface GetMakerPageResponseDto<T> {
    totalPages: number,
    makers: Array<T>
}

export interface GetMakerResponseDto {
    makerId: number;
    makerName: string;
    makerEmail: string;
    makerPhoneNumber: string;
    makerKakaoUrl?: string;
    makerHomeUrl?: string;
    makerSnsUrl?: string;
    createdAt: string;
}

export interface GetMakerSearchResponseDto {
    makerId: number;
    makerName: string;
    makerEmail: string;
    makerPhoneNumber: string;
    makerKakaoUrl?: string;
    makerHomeUrl?: string;
    makerSnsUrl?: string;
    createdAt: string;
}