import type { Client, CreateClientInput, UpdateClientInput } from '../types.js';
export declare class ClientRepository {
    findAll(): Promise<Client[]>;
    findById(id: number): Promise<Client | null>;
    create(input: CreateClientInput): Promise<Client>;
    update(id: number, input: UpdateClientInput): Promise<Client | null>;
    delete(id: number): Promise<boolean>;
}
//# sourceMappingURL=clients.repository.d.ts.map