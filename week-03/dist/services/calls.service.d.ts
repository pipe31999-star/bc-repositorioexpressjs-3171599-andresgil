import type { Call, CreateCallInput, UpdateCallInput, PaginatedResponse } from '../types.js';
export declare class CallService {
    private repository;
    getAllCalls(page?: number, limit?: number): Promise<PaginatedResponse<Call>>;
    getCallById(id: number): Promise<Call | null>;
    createCall(input: CreateCallInput): Promise<Call>;
    updateCall(id: number, input: UpdateCallInput): Promise<Call | null>;
    deleteCall(id: number): Promise<boolean>;
}
//# sourceMappingURL=calls.service.d.ts.map