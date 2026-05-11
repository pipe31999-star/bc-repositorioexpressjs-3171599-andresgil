import { z } from 'zod';

export const createAgentSchema = z.object({
  body: z.object({
    fullName: z.string().min(3, 'Full name must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    status: z.enum(['online', 'offline', 'busy']).default('offline'),
    campaignId: z.number().int().positive('Campaign ID must be a positive integer'),
    joinedAt: z.string().datetime().optional(),
  }),
});

export const updateAgentSchema = z.object({
  body: z.object({
    fullName: z.string().min(3).optional(),
    email: z.string().email().optional(),
    status: z.enum(['online', 'offline', 'busy']).optional(),
    campaignId: z.number().int().positive().optional(),
  }),
});

export const getAgentByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number'),
  }),
});
