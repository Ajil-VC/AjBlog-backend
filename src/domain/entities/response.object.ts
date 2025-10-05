
export interface ApiResponse<T> {
    status: boolean;
    message: string;
    data: T;
    accesstoken?: string;
    code?: string;
    totalPages?: number;
}