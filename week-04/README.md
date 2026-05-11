# Call Center Agents API

API REST para la gestión de agentes de un centro de llamadas, construida con Express, TypeScript y una arquitectura en 4 capas.

## Estructura del Proyecto

- `src/routes`: Definición de endpoints.
- `src/controllers`: Manejo de peticiones (Extraer -> Llamar -> Responder).
- `src/services`: Lógica de negocio y paginación.
- `src/repositories`: Acceso a datos (In-memory con copias defensivas).

## Dominio: Centro de Call Center

**Recurso principal:** `Agents`

### Campos del Agente
- `id`: Identificador único (autoincremental).
- `fullName`: Nombre completo.
- `email`: Correo electrónico.
- `status`: Estado del agente (`online`, `offline`, `busy`).
- `campaignId`: ID de la campaña asignada.
- `joinedAt`: Fecha de ingreso.
- `createdAt`: Fecha de creación del registro.

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/agents` | Listar con paginación (`?page&limit`) |
| GET | `/api/v1/agents/:id` | Obtener por ID |
| POST | `/api/v1/agents` | Crear nuevo agente |
| PUT | `/api/v1/agents/:id` | Actualizar agente |
| DELETE| `/api/v1/agents/:id` | Eliminar agente |

## Instalación y Ejecución

1. Instalar dependencias:
   ```bash
   pnpm install
   ```
2. Configurar el entorno (opcional):
   ```bash
   cp .env.example .env
   ```
3. Ejecutar en modo desarrollo:
   ```bash
   pnpm dev
   ```
4. Construir para producción:
   ```bash
   pnpm build
   ```

## Ejemplos de Respuesta

### GET /api/v1/agents?page=1&limit=5
```json
{
  "data": [...],
  "total": 20,
  "page": 1,
  "limit": 5
}
```

### Error 404
```json
{
  "error": "Not Found",
  "message": "Agent 999 not found"
}
```
