import { Router, Request, Response } from 'express';
import { agentStore } from '../store';
import { CreateAgentDto } from '../types';

const router: Router = Router();

/**
 * GET /api/v1/agents
 * Listar todos los agentes del call center
 */
router.get('/', (req: Request, res: Response) => {
  const agents = agentStore.getAll();
  res.status(200).json({
    success: true,
    data: agents,
    count: agents.length,
  });
});

/**
 * GET /api/v1/agents/:id
 * Obtener un agente específico por ID
 */
router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      message: 'ID debe ser un número válido',
    });
    return;
  }

  const agent = agentStore.getById(id);

  if (!agent) {
    res.status(404).json({
      success: false,
      message: `Agente con ID ${id} no encontrado`,
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: agent,
  });
});

/**
 * POST /api/v1/agents
 * Crear un nuevo agente
 */
router.post('/', (req: Request, res: Response) => {
  const { name, email, phone, status, department, hireDate } =
    req.body as CreateAgentDto;

  // Validación básica
  if (!name || !email || !phone || !status || !department || !hireDate) {
    res.status(400).json({
      success: false,
      message:
        'Todos los campos son requeridos: name, email, phone, status, department, hireDate',
    });
    return;
  }

  // Validar status
  const validStatuses = ['active', 'inactive', 'on-break'];
  if (!validStatuses.includes(status)) {
    res.status(400).json({
      success: false,
      message: `Status debe ser uno de: ${validStatuses.join(', ')}`,
    });
    return;
  }

  try {
    const newAgent = agentStore.create({
      name,
      email,
      phone,
      status,
      department,
      hireDate,
    });

    res.status(201).json({
      success: true,
      message: 'Agente creado exitosamente',
      data: newAgent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear el agente',
    });
  }
});

/**
 * PUT /api/v1/agents/:id
 * Actualizar un agente completo
 */
router.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      message: 'ID debe ser un número válido',
    });
    return;
  }

  const { name, email, phone, status, department, hireDate } =
    req.body as CreateAgentDto;

  // Validación básica
  if (!name || !email || !phone || !status || !department || !hireDate) {
    res.status(400).json({
      success: false,
      message:
        'Todos los campos son requeridos: name, email, phone, status, department, hireDate',
    });
    return;
  }

  // Validar status
  const validStatuses = ['active', 'inactive', 'on-break'];
  if (!validStatuses.includes(status)) {
    res.status(400).json({
      success: false,
      message: `Status debe ser uno de: ${validStatuses.join(', ')}`,
    });
    return;
  }

  try {
    const updatedAgent = agentStore.update(id, {
      name,
      email,
      phone,
      status,
      department,
      hireDate,
    });

    if (!updatedAgent) {
      res.status(404).json({
        success: false,
        message: `Agente con ID ${id} no encontrado`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Agente actualizado exitosamente',
      data: updatedAgent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el agente',
    });
  }
});

/**
 * DELETE /api/v1/agents/:id
 * Eliminar un agente
 */
router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.status(400).json({
      success: false,
      message: 'ID debe ser un número válido',
    });
    return;
  }

  const deleted = agentStore.remove(id);

  if (!deleted) {
    res.status(404).json({
      success: false,
      message: `Agente con ID ${id} no encontrado`,
    });
    return;
  }

  res.status(204).send();
});

export default router;
