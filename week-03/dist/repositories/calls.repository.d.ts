import type { Call, CreateCallInput, UpdateCallInput } from '../types.js';
export declare class CallRepository {
    findAll(): Promise<Call[]>;
    findById(id: number): Promise<Call | null>;
    create(input: CreateCallInput): Promise<Call>;
    update(id: number, input: UpdateCallInput): Promise<Call | null>;
    delete(id: number): Promise<boolean>;
}
//# sourceMappingURL=calls.repository.d.ts.map