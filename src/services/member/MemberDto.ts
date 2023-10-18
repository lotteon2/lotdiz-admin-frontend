export interface GetMemberPageResponseDto<T> {
    totalPages: number,
    members: Array<T>
}

export interface GetMemberResponseDto {
    memberId: number;
    memberRole: string;
    memberEmail: string;
    memberName: string;
    memberPhoneNumber: string;
    createdAt: string;
}

export interface GetMemberSearchResponseDto {
    memberId: number;
    memberRole: string;
    memberEmail: string;
    memberName: string;
    memberPhoneNumber: string;
    createdAt: string;
}