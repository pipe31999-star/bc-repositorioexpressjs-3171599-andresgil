import { Request, Response, NextFunction } from 'express';
import { agentsService } from '../services/agents.service';

export class AgentsController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            
            const result = await agentsService.getAll(page, limit);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string);
            const agent = await agentsService.getById(id);
            res.status(200).json({ data: agent });
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const agent = await agentsService.create(req.body);
            res.status(201).json({ data: agent });
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string);
            const agent = await agentsService.update(id, req.body);
            res.status(200).json({ data: agent });
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id as string);
            await agentsService.delete(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export const agentsController = new AgentsController();
