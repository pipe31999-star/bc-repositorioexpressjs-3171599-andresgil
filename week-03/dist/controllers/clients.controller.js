import { ClientService } from '../services/clients.service.js';
const clientService = new ClientService();
export class ClientController {
    async getAll(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const result = await clientService.getAllClients(page, limit);
        res.status(200).json(result);
    }
    async getById(req, res) {
        const id = parseInt(req.params.id);
        const client = await clientService.getClientById(id);
        if (!client) {
            res.status(404).json({ error: 'Not Found', message: `Client ${id} not found` });
            return;
        }
        res.status(200).json({ data: client });
    }
    async create(req, res) {
        try {
            const input = req.body;
            const client = await clientService.createClient(input);
            res.status(201).json({ data: client });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create client';
            res.status(400).json({ error: 'Bad Request', message });
        }
    }
    async update(req, res) {
        const id = parseInt(req.params.id);
        const input = req.body;
        const client = await clientService.updateClient(id, input);
        if (!client) {
            res.status(404).json({ error: 'Not Found', message: `Client ${id} not found` });
            return;
        }
        res.status(200).json({ data: client });
    }
    async delete(req, res) {
        const id = parseInt(req.params.id);
        const deleted = await clientService.deleteClient(id);
        if (!deleted) {
            res.status(404).json({ error: 'Not Found', message: `Client ${id} not found` });
            return;
        }
        res.status(204).send();
    }
}
//# sourceMappingURL=clients.controller.js.map