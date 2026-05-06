# 📞 Call Center API

API REST construida con **Express.js**, **TypeScript** y **Arquitectura en 4 Capas** para gestionar un centro de call center.

## 🎯 Objetivo

Implementar una API completa siguiendo la arquitectura en capas:
- **Routes** → Mapeo de URLs
- **Controllers** → Controladores thin (extraer → llamar service → responder)
- **Services** → Lógica de negocio y paginación
- **Repositories** → Acceso a datos con copias defensivas

## 📦 Recursos de la API

La API gestiona 4 recursos principales del centro de call center:

### 1. **Agents** (Agentes)
Empleados del call center
```typescript
{
  id: number;
  fullName: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'on-leave';
  department: string;
  hireDate: string;
  createdAt: string;
}
```

### 2. **Calls** (Llamadas)
Registro de llamadas realizadas
```typescript
{
  id: number;
  agentId: number;
  clientId: number;
  campaignId: number;
  duration: number; // segundos
  startTime: string;
  endTime: string;
  status: 'completed' | 'missed' | 'failed';
  notes?: string;
  createdAt: string;
}
```

### 3. **Clients** (Clientes)
Contactos de clientes
```typescript
{
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive' | 'prospect';
  totalCalls: number;
  createdAt: string;
}
```

### 4. **Campaigns** (Campañas)
Campañas de llamadas
```typescript
{
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'paused';
  targetCalls: number;
  completedCalls: number;
  createdAt: string;
}
```

## 📡 Endpoints

### Agents (`/api/v1/agents`)
| Método | Ruta | Status | Descripción |
|--------|------|--------|-------------|
| GET | `/api/v1/agents` | 200 | Listar agentes con paginación |
| GET | `/api/v1/agents/:id` | 200 | Obtener agente por ID |
| POST | `/api/v1/agents` | 201 | Crear nuevo agente |
| PUT | `/api/v1/agents/:id` | 200 | Actualizar agente |
| DELETE | `/api/v1/agents/:id` | 204 | Eliminar agente |

### Calls (`/api/v1/calls`)
| Método | Ruta | Status | Descripción |
|--------|------|--------|-------------|
| GET | `/api/v1/calls` | 200 | Listar llamadas con paginación |
| GET | `/api/v1/calls/:id` | 200 | Obtener llamada por ID |
| POST | `/api/v1/calls` | 201 | Registrar nueva llamada |
| PUT | `/api/v1/calls/:id` | 200 | Actualizar llamada |
| DELETE | `/api/v1/calls/:id` | 204 | Eliminar llamada |

### Clients (`/api/v1/clients`)
| Método | Ruta | Status | Descripción |
|--------|------|--------|-------------|
| GET | `/api/v1/clients` | 200 | Listar clientes con paginación |
| GET | `/api/v1/clients/:id` | 200 | Obtener cliente por ID |
| POST | `/api/v1/clients` | 201 | Crear nuevo cliente |
| PUT | `/api/v1/clients/:id` | 200 | Actualizar cliente |
| DELETE | `/api/v1/clients/:id` | 204 | Eliminar cliente |

### Campaigns (`/api/v1/campaigns`)
| Método | Ruta | Status | Descripción |
|--------|------|--------|-------------|
| GET | `/api/v1/campaigns` | 200 | Listar campañas con paginación |
| GET | `/api/v1/campaigns/:id` | 200 | Obtener campaña por ID |
| POST | `/api/v1/campaigns` | 201 | Crear nueva campaña |
| PUT | `/api/v1/campaigns/:id` | 200 | Actualizar campaña |
| DELETE | `/api/v1/campaigns/:id` | 204 | Eliminar campaña |

## 📋 Contratos de Respuesta

### Respuesta de Listado (GET con paginación)
```json
{
  "data": [...],
  "total": 20,
  "page": 1,
  "limit": 5
}
```

### Respuesta de Detalle (GET by ID, POST, PUT)
```json
{
  "data": { "id": 1, ... }
}
```

### Respuesta de Error
```json
{
  "error": "Not Found",
  "message": "Agent 999 not found"
}
```

### Respuesta de Eliminación
```
204 No Content
```

## 🚀 Instalación y Uso

### Requisitos
- Node.js 16+
- npm/pnpm

### Pasos

1. **Instalar dependencias**
   ```bash
   pnpm install
   # o
   npm install
   ```

2. **Crear archivo `.env`** (copiar desde `.env.example`)
   ```bash
   cp .env.example .env
   ```

3. **Iniciar servidor en desarrollo**
   ```bash
   pnpm dev
   # o
   npm run dev
   ```

4. **Compilar TypeScript**
   ```bash
   pnpm build
   # o
   npm run build
   ```

5. **Ejecutar en producción**
   ```bash
   pnpm start
   # o
   npm start
   ```

## 🧪 Ejemplos de Uso

### Listar Agentes (con paginación)
```bash
curl -X GET "http://localhost:3000/api/v1/agents?page=1&limit=5"
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "fullName": "Carlos Mendez",
      "email": "carlos@callcenter.com",
      "phone": "+57 300 123 4567",
      "status": "active",
      "department": "Sales",
      "hireDate": "2023-01-15",
      "createdAt": "2023-01-15T10:00:00Z"
    }
  ],
  "total": 5,
  "page": 1,
  "limit": 5
}
```

### Obtener Agente por ID
```bash
curl -X GET "http://localhost:3000/api/v1/agents/1"
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "fullName": "Carlos Mendez",
    "email": "carlos@callcenter.com",
    "phone": "+34 912 345 678",
    "status": "active",
    "department": "Sales",
    "hireDate": "2023-01-15",
    "createdAt": "2023-01-15T10:00:00Z"
  }
}
```

### Crear Agente
```bash
curl -X POST "http://localhost:3000/api/v1/agents" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Pedro Silva",
    "email": "pedro@callcenter.com",
    "phone": "+57 315 666 7777",
    "department": "Support"
  }'
```

**Response:** `201 Created`
```json
{
  "data": {
    "id": 6,
    "fullName": "Pedro Silva",
    "email": "pedro@callcenter.com",
    "phone": "+57 315 666 7777",
    "status": "active",
    "department": "Support",
    "hireDate": "2024-05-04",
    "createdAt": "2024-05-04T12:34:56Z"
  }
}
```

### Actualizar Agente
```bash
curl -X PUT "http://localhost:3000/api/v1/agents/1" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "on-leave",
    "department": "Management"
  }'
```

### Eliminar Agente
```bash
curl -X DELETE "http://localhost:3000/api/v1/agents/1"
```

**Response:** `204 No Content`

### Registrar Llamada
```bash
curl -X POST "http://localhost:3000/api/v1/calls" \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": 1,
    "clientId": 2,
    "campaignId": 1,
    "duration": 420,
    "startTime": "2024-05-04T14:00:00Z",
    "endTime": "2024-05-04T14:07:00Z",
    "status": "completed",
    "notes": "Client interested in premium plan"
  }'
```

## 📁 Estructura del Proyecto

```
call-center-api/
├── src/
│   ├── app.ts                      # Configuración de Express
│   ├── server.ts                   # Punto de entrada
│   ├── types.ts                    # Tipos e interfaces TypeScript
│   ├── routes/
│   │   ├── agents.routes.ts
│   │   ├── calls.routes.ts
│   │   ├── clients.routes.ts
│   │   └── campaigns.routes.ts
│   ├── controllers/
│   │   ├── agents.controller.ts
│   │   ├── calls.controller.ts
│   │   ├── clients.controller.ts
│   │   └── campaigns.controller.ts
│   ├── services/
│   │   ├── agents.service.ts
│   │   ├── calls.service.ts
│   │   ├── clients.service.ts
│   │   └── campaigns.service.ts
│   └── repositories/
│       ├── agents.repository.ts
│       ├── calls.repository.ts
│       ├── clients.repository.ts
│       └── campaigns.repository.ts
├── dist/                           # Código compilado
├── package.json
├── tsconfig.json
├── .env.example
├── .env
└── README.md
```

## 🏗️ Arquitectura en Capas

### Routes
- Mapeo URL → función controller
- Solo routing, sin lógica

### Controllers
- **Paso 1:** Extrae datos (query params, body, params)
- **Paso 2:** Llama al service
- **Paso 3:** Responde al cliente
- Sin lógica de negocio

### Services
- Lógica de negocio
- Validaciones
- Paginación
- Sin imports de Express

### Repositories
- **Única capa que accede a datos**
- Métodos async
- Copias defensivas `{ ...object }`
- Sin lógica de negocio

## ✅ Características Implementadas

- ✅ CRUD completo para 4 recursos
- ✅ Paginación con `?page&limit`
- ✅ Contratos de respuesta tipados
- ✅ Manejo de errores 404 y 400
- ✅ Arquitectura en 4 capas
- ✅ TypeScript strict mode
- ✅ Copias defensivas en repositories
- ✅ Datos de prueba precargados

## 🔒 Variables de Entorno

```env
PORT=3000                  # Puerto de ejecución
NODE_ENV=development       # Entorno (development/production)
```

## 📝 Licencia

MIT

---

**Construido con ❤️ usando Express.js y TypeScript**
