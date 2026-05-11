export interface Agent {
    id: number;
    fullName: string;
    email: string;
    status: 'online' | 'offline' | 'busy';
    campaignId: number;
    joinedAt: string;
    createdAt: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}

export interface ErrorResponse {
    error: string;
    message: string;
}
