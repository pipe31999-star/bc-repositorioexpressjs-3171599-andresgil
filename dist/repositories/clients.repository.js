let clients = [
    {
        id: 1,
        name: 'Acme Corporation',
        email: 'contact@acme.com',
        phone: '+57 310 111 2222',
        company: 'Acme Corp',
        status: 'active',
        totalCalls: 12,
        createdAt: '2024-01-15T10:00:00Z',
    },
    {
        id: 2,
        name: 'Tech Solutions S.A.',
        email: 'info@techsol.com',
        phone: '+57 311 222 3333',
        company: 'Tech Solutions',
        status: 'active',
        totalCalls: 8,
        createdAt: '2024-02-10T10:00:00Z',
    },
    {
        id: 3,
        name: 'Global Services Ltd',
        email: 'sales@globalserv.com',
        phone: '+57 312 333 4444',
        company: 'Global Services',
        status: 'prospect',
        totalCalls: 2,
        createdAt: '2024-03-05T10:00:00Z',
    },
    {
        id: 4,
        name: 'Enterprise Solutions',
        email: 'contact@enterprise.com',
        phone: '+57 313 444 5555',
        company: 'Enterprise',
        status: 'active',
        totalCalls: 25,
        createdAt: '2023-12-20T10:00:00Z',
    },
    {
        id: 5,
        name: 'Startup Digital',
        email: 'hello@startupdigital.com',
        phone: '+57 314 555 6666',
        company: 'Startup Digital',
        status: 'inactive',
        totalCalls: 3,
        createdAt: '2024-04-01T10:00:00Z',
    },
];
let nextId = 6;
export class ClientRepository {
    async findAll() {
        return [...clients];
    }
    async findById(id) {
        const client = clients.find((c) => c.id === id);
        return client ? { ...client } : null;
    }
    async create(input) {
        const newClient = {
            id: nextId++,
            ...input,
            status: 'prospect',
            totalCalls: 0,
            createdAt: new Date().toISOString(),
        };
        clients.push(newClient);
        return { ...newClient };
    }
    async update(id, input) {
        const index = clients.findIndex((c) => c.id === id);
        if (index === -1)
            return null;
        clients[index] = { ...clients[index], ...input };
        return { ...clients[index] };
    }
    async delete(id) {
        const index = clients.findIndex((c) => c.id === id);
        if (index === -1)
            return false;
        clients.splice(index, 1);
        return true;
    }
}
//# sourceMappingURL=clients.repository.js.map