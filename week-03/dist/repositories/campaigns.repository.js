let campaigns = [
    {
        id: 1,
        name: 'Spring Sales Campaign',
        description: 'Q1 sales outreach initiative',
        startDate: '2024-03-01',
        endDate: '2024-05-31',
        status: 'active',
        targetCalls: 500,
        completedCalls: 180,
        createdAt: '2024-02-15T10:00:00Z',
    },
    {
        id: 2,
        name: 'Customer Retention',
        description: 'Re-engagement of inactive customers',
        startDate: '2024-04-01',
        endDate: '2024-06-30',
        status: 'active',
        targetCalls: 300,
        completedCalls: 95,
        createdAt: '2024-03-20T10:00:00Z',
    },
    {
        id: 3,
        name: 'Winter Promotion',
        description: 'Holiday season special offers',
        startDate: '2023-11-01',
        endDate: '2024-01-31',
        status: 'completed',
        targetCalls: 1000,
        completedCalls: 1000,
        createdAt: '2023-10-01T10:00:00Z',
    },
    {
        id: 4,
        name: 'Product Feedback Survey',
        description: 'Gather customer feedback on new products',
        startDate: '2024-05-01',
        endDate: '2024-06-15',
        status: 'active',
        targetCalls: 200,
        completedCalls: 45,
        createdAt: '2024-04-25T10:00:00Z',
    },
    {
        id: 5,
        name: 'B2B Partnerships',
        description: 'Enterprise partnership development',
        startDate: '2024-06-01',
        endDate: '2024-08-31',
        status: 'paused',
        targetCalls: 150,
        completedCalls: 30,
        createdAt: '2024-05-15T10:00:00Z',
    },
];
let nextId = 6;
export class CampaignRepository {
    async findAll() {
        return [...campaigns];
    }
    async findById(id) {
        const campaign = campaigns.find((c) => c.id === id);
        return campaign ? { ...campaign } : null;
    }
    async create(input) {
        const newCampaign = {
            id: nextId++,
            ...input,
            status: 'active',
            completedCalls: 0,
            createdAt: new Date().toISOString(),
        };
        campaigns.push(newCampaign);
        return { ...newCampaign };
    }
    async update(id, input) {
        const index = campaigns.findIndex((c) => c.id === id);
        if (index === -1)
            return null;
        campaigns[index] = { ...campaigns[index], ...input };
        return { ...campaigns[index] };
    }
    async delete(id) {
        const index = campaigns.findIndex((c) => c.id === id);
        if (index === -1)
            return false;
        campaigns.splice(index, 1);
        return true;
    }
}
//# sourceMappingURL=campaigns.repository.js.map