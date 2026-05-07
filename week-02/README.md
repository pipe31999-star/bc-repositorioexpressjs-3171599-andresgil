# Call Center Management API

## 📋 Descripción del Proyecto

API REST construida con **Express 5** y **TypeScript** para gestionar agentes en un centro de llamadas. Implementa un CRUD completo con almacenamiento en memoria, middlewares personalizados y manejo correcto de códigos HTTP.

### Dominio: Centro de Call Center

**Recurso principal:** Agentes (`agents`)

Los agentes son los empleados del call center responsables de atender llamadas de clientes. Cada agente tiene información personal, de contacto y asignación.

## 🏗️ Estructura del Proyecto

```
src/
├── app.ts                 # Configuración de Express y middlewares
├── server.ts              # Entry point con graceful shutdown
├── types.ts               # Interfaces TypeScript
├── store.ts               # Store en memoria (CRUD operations)
└── routes/
    └── agents.routes.ts   # Endpoints de agentes
```

## 📦 Campos del Recurso Agent

| Campo      | Tipo                           | Descripción                    |
| ---------- | ------------------------------ | ------------------------------ |
| `id`       | `number`                       | Identificador único            |
| `name`     | `string`                       | Nombre del agente              |
| `email`    | `string`                       | Email corporativo              |
| `phone`    | `string`                       | Teléfono de contacto           |
| `status`   | `'active' \| 'inactive' \| 'on-break'` | Estado actual del agente |
| `department` | `string`                     | Departamento (Sales, Support)  |
| `hireDate` | `string` (ISO 8601)            | Fecha de contratación          |

## ✅ Endpoints CRUD

### 1. GET `/api/v1/agents`
**Listar todos los agentes**

```bash
curl http://localhost:3000/api/v1/agents
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan.perez@callcenter.com",
      "phone": "+1-555-0101",
      "status": "active",
      "department": "Sales",
      "hireDate": "2023-01-15"
    }
  ],
  "count": 1
}
```

### 2. GET `/api/v1/agents/:id`
**Obtener un agente específico**

```bash
curl http://localhost:3000/api/v1/agents/1
```

**Response (200 OK) o (404 Not Found):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan.perez@callcenter.com",
    "phone": "+1-555-0101",
    "status": "active",
    "department": "Sales",
    "hireDate": "2023-01-15"
  }
}
```

### 3. POST `/api/v1/agents`
**Crear un nuevo agente**

```bash
curl -X POST http://localhost:3000/api/v1/agents \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Carlos López",
    "email": "carlos.lopez@callcenter.com",
    "phone": "+1-555-0103",
    "status": "active",
    "department": "Support",
    "hireDate": "2024-01-10"
  }'
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Agente creado exitosamente",
  "data": {
    "id": 3,
    "name": "Carlos López",
    "email": "carlos.lopez@callcenter.com",
    "phone": "+1-555-0103",
    "status": "active",
    "department": "Support",
    "hireDate": "2024-01-10"
  }
}
```

### 4. PUT `/api/v1/agents/:id`
**Actualizar un agente completo**

```bash
curl -X PUT http://localhost:3000/api/v1/agents/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez Actualizado",
    "email": "juan.nuevo@callcenter.com",
    "phone": "+1-555-0101",
    "status": "on-break",
    "department": "Management",
    "hireDate": "2023-01-15"
  }'
```

**Response (200 OK) o (404 Not Found):**
```json
{
  "success": true,
  "message": "Agente actualizado exitosamente",
  "data": {
    "id": 1,
    "name": "Juan Pérez Actualizado",
    "email": "juan.nuevo@callcenter.com",
    "phone": "+1-555-0101",
    "status": "on-break",
    "department": "Management",
    "hireDate": "2023-01-15"
  }
}
```

### 5. DELETE `/api/v1/agents/:id`
**Eliminar un agente**

```bash
curl -X DELETE http://localhost:3000/api/v1/agents/1
```

**Response (204 No Content)** o **(404 Not Found)**

## 🛠️ Middlewares Implementados

### 1. **express.json()**
Parsea automáticamente los bodies de las solicitudes HTTP.

### 2. **Logger Personalizado**
Registra cada solicitud con: método, URL, código de estado y duración.

```
[2024-01-15T10:30:45.123Z] GET /api/v1/agents - Status: 200 - 15ms
[2024-01-15T10:30:50.456Z] POST /api/v1/agents - Status: 201 - 8ms
```

### 3. **Manejo 404**
Retorna un JSON con error cuando la ruta no existe.

### 4. **Error Handler Global**
Captura errores no gestionados y retorna error 500 con detalles en modo desarrollo.

## 🚀 Instalación y Ejecución

### Requisitos
- Node.js 18+
- pnpm

### Pasos

1. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

2. **Compilar TypeScript:**
   ```bash
   pnpm build
   ```

3. **Ejecutar en desarrollo:**
   ```bash
   pnpm dev
   ```

4. **Ejecutar en producción:**
   ```bash
   pnpm start
   ```

El servidor iniciará en `http://localhost:3000`

## ✨ Características Especiales

### Graceful Shutdown
El servidor maneja señales de terminación (`SIGTERM`, `SIGINT`) para cerrar conexiones de forma segura:

- Detiene la aceptación de nuevas conexiones
- Espera a que se completen las solicitudes en curso
- Timeout de 10 segundos para forzar la salida

### Validación en Endpoints
- IDs numéricos válidos
- Status solo puede ser: `active`, `inactive`, `on-break`
- Todos los campos requeridos en POST y PUT

### Store en Memoria
- Datos iniciales con 2 agentes de ejemplo
- Operaciones CRUD sincrónicas
- Patrón Singleton para instancia única del store

## 📊 Decisiones de Diseño

1. **Recurso Principal: Agents**
   - Elegido por su centralidad en las operaciones del call center
   - Permite gestionar el recurso humano fundamental

2. **Almacenamiento en Memoria**
   - Simplifica el proyecto como se requiere
   - Suficiente para demostración de CRUD básico
   - Los datos se pierden al reiniciar (como se espera)

3. **Estructura de Respuestas**
   - Sigue patrón de API REST estándar
   - Incluye campo `success` para fácil manejo en cliente
   - Mensajes descriptivos en español

4. **Códigos HTTP Correctos**
   - 200: GET exitoso
   - 201: Creación exitosa (POST)
   - 204: Eliminación exitosa (DELETE, sin body)
   - 400: Validación fallida
   - 404: Recurso no encontrado
   - 500: Error del servidor

## 🧪 Testing

Prueba todos los endpoints usando curl, Postman o Thunder Client:

```bash
# Listar agentes
curl http://localhost:3000/api/v1/agents

# Crear agente
curl -X POST http://localhost:3000/api/v1/agents \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"+1-555-0199","status":"active","department":"Sales","hireDate":"2024-01-01"}'

# Obtener por ID
curl http://localhost:3000/api/v1/agents/1

# Actualizar
curl -X PUT http://localhost:3000/api/v1/agents/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated","email":"updated@test.com","phone":"+1-555-0199","status":"inactive","department":"Support","hireDate":"2024-01-01"}'

# Eliminar
curl -X DELETE http://localhost:3000/api/v1/agents/1
```

## 📝 Notas Técnicas

- **TypeScript**: Strict mode habilitado para mejor seguridad de tipos
- **Express 5**: Utilizando la versión más reciente
- **ES2020**: Target de compilación moderno
- **Sin Base de Datos**: Store en memoria por simplicidad educativa

## 👨‍💻 Autor

Proyecto desarrollado como parte del bootcamp - Semana 02

---

**Última actualización:** Abril 2024
