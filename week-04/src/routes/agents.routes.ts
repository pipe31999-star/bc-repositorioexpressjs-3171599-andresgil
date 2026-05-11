import { Router } from 'express';
import { agentsController } from '../controllers/agents.controller';
import { validate } from '../middlewares/validate';
import { createAgentSchema, updateAgentSchema, getAgentByIdSchema } from '../schemas/agent.schema';

const router = Router();

router.get('/', agentsController.getAll.bind(agentsController));
router.get('/:id', validate(getAgentByIdSchema), agentsController.getById.bind(agentsController));
router.post('/', validate(createAgentSchema), agentsController.create.bind(agentsController));
router.put('/:id', validate(updateAgentSchema), agentsController.update.bind(agentsController));
router.delete('/:id', validate(getAgentByIdSchema), agentsController.delete.bind(agentsController));

export default router;
