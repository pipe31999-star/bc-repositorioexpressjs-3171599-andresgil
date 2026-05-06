let calls = [
    {
        id: 1,
        agentId: 1,
        clientId: 1,
        campaignId: 1,
        duration: 450,
        startTime: '2024-05-04T09:00:00Z',
        endTime: '2024-05-04T09:07:30Z',
        status: 'completed',
        notes: 'Client interested in service',
        createdAt: '2024-05-04T09:00:00Z',
    },
    {
        id: 2,
        agentId: 2,
        clientId: 2,
        campaignId: 1,
        duration: 300,
        startTime: '2024-05-04T10:00:00Z',
        endTime: '2024-05-04T10:05:00Z',
        status: 'completed',
        notes: 'No answer',
        createdAt: '2024-05-04T10:00:00Z',
    },
    {
        id: 3,
        agentId: 1,
        clientId: 3,
        campaignId: 2,
        duration: 600,
        startTime: '2024-05-04T11:00:00Z',
        endTime: '2024-05-04T11:10:00Z',
        status: 'completed',
        notes: 'Scheduled follow-up',
        createdAt: '2024-05-04T11:00:00Z',
    },
    {
        id: 4,
        agentId: 3,
        clientId: 4,
        campaignId: 2,
        duration: 0,
        startTime: '2024-05-04T14:00:00Z',
        endTime: '2024-05-04T14:00:00Z',
        status: 'missed',
        createdAt: '2024-05-04T14:00:00Z',
    },
    {
        id: 5,
        agentId: 4,
        clientId: 5,
        campaignId: 3,
        duration: 150,
        startTime: '2024-05-04T15:00:00Z',
        endTime: '2024-05-04T15:02:30Z',
        status: 'failed',
        notes: 'Technical issue',
        createdAt: '2024-05-04T15:00:00Z',
    },
];
let nextId = 6;
export class CallRepository {
    async findAll() {
        return [...calls];
    }
    async findById(id) {
        const call = calls.find((c) => c.id === id);
        return call ? { ...call } : null;
    }
    async create(input) {
        const newCall = {
            id: nextId++,
            ...input,
            createdAt: new Date().toISOString(),
        };
        calls.push(newCall);
        return { ...newCall };
    }
    async update(id, input) {
        const index = calls.findIndex((c) => c.id === id);
        if (index === -1)
            return null;
        calls[index] = { ...calls[index], ...input };
        return { ...calls[index] };
    }
    async delete(id) {
        const index = calls.findIndex((c) => c.id === id);
        if (index === -1)
            return false;
        calls.splice(index, 1);
        return true;
    }
}
//# sourceMappingURL=calls.repository.js.map