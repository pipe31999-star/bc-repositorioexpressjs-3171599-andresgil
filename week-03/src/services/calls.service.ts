import type { Call, CreateCallInput, UpdateCallInput, PaginatedResponse } from '../types.js';
import { CallRepository } from '../repositories/calls.repository.js';

export class CallService {
  private repository = new CallRepository();

  async getAllCalls(page: number = 1, limit: number = 5): Promise<PaginatedResponse<Call>> {
    const allCalls = await this.repository.findAll();
    const start = (page - 1) * limit;
    const paginatedCalls = allCalls.slice(start, start + limit);

    return {
      data: paginatedCalls,
      total: allCalls.length,
      page,
      limit,
    };
  }

  async getCallById(id: number): Promise<Call | null> {
    return await this.repository.findById(id);
  }

  async createCall(input: CreateCallInput): Promise<Call> {
    if (!input.agentId || !input.clientId || !input.campaignId) {
      throw new Error('Missing required fields');
    }

    return await this.repository.create(input);
  }

  async updateCall(id: number, input: UpdateCallInput): Promise<Call | null> {
    return await this.repository.update(id, input);
  }

  async deleteCall(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
