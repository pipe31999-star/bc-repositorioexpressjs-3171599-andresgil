# 🧪 Guía de Testing - Call Center API

Este documento proporciona comandos curl completamente funcionales para probar todos los endpoints de la API.

## Requisitos previos

1. Instalar dependencias:
   ```bash
   pnpm install
   ```

2. Iniciar el servidor:
   ```bash
   pnpm dev
   ```

El servidor estará disponible en `http://localhost:3000`

---

## 📋 Comandos de Testing

### 1️⃣ LISTAR TODOS LOS AGENTES

**Endpoint:** `GET /api/v1/agents`

```bash
curl http://localhost:3000/api/v1/agents
```

**Respuesta esperada (200 OK):**
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
    },
    {
      "id": 2,
      "name": "María García",
      "email": "maria.garcia@callcenter.com",
      "phone": "+1-555-0102",
      "status": "active",
      "department": "Support",
      "hireDate": "2023-02-20"
    }
  ],
  "count": 2
}
```

---

### 2️⃣ OBTENER UN AGENTE POR ID

**Endpoint:** `GET /api/v1/agents/:id`

**Obtener agente con ID 1:**
```bash
curl http://localhost:3000/api/v1/agents/1
```

**Respuesta esperada (200 OK):**
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

**Obtener agente que no existe:**
```bash
curl http://localhost:3000/api/v1/agents/999
```

**Respuesta esperada (404 Not Found):**
```json
{
  "success": false,
  "message": "Agente con ID 999 no encontrado"
}
```

---

### 3️⃣ CREAR UN NUEVO AGENTE

**Endpoint:** `POST /api/v1/agents`

**Crear un nuevo agente:**
```bash
curl -X POST http://localhost:3000/api/v1/agents \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Carlos López",
    "email": "carlos.lopez@callcenter.com",
    "phone": "+1-555-0103",
    "status": "active",
    "department": "Sales",
    "hireDate": "2024-03-01"
  }'
```

**Respuesta esperada (201 Created):**
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
    "department": "Sales",
    "hireDate": "2024-03-01"
  }
}
```

**Intentar crear con campos faltantes:**
```bash
curl -X POST http://localhost:3000/api/v1/agents \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ana Rodríguez"
  }'
```

**Respuesta esperada (400 Bad Request):**
```json
{
  "success": false,
  "message": "Todos los campos son requeridos: name, email, phone, status, department, hireDate"
}
```

**Intentar crear con status inválido:**
```bash
curl -X POST http://localhost:3000/api/v1/agents \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pedro Sánchez",
    "email": "pedro@callcenter.com",
    "phone": "+1-555-0104",
    "status": "working",
    "department": "Support",
    "hireDate": "2024-02-15"
  }'
```

**Respuesta esperada (400 Bad Request):**
```json
{
  "success": false,
  "message": "Status debe ser uno de: active, inactive, on-break"
}
```

---

### 4️⃣ ACTUALIZAR UN AGENTE

**Endpoint:** `PUT /api/v1/agents/:id`

**Actualizar agente con ID 1:**
```bash
curl -X PUT http://localhost:3000/api/v1/agents/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez - Gerente",
    "email": "juan.manager@callcenter.com",
    "phone": "+1-555-0101",
    "status": "active",
    "department": "Management",
    "hireDate": "2023-01-15"
  }'
```

**Respuesta esperada (200 OK):**
```json
{
  "success": true,
  "message": "Agente actualizado exitosamente",
  "data": {
    "id": 1,
    "name": "Juan Pérez - Gerente",
    "email": "juan.manager@callcenter.com",
    "phone": "+1-555-0101",
    "status": "active",
    "department": "Management",
    "hireDate": "2023-01-15"
  }
}
```

**Intentar actualizar agente que no existe:**
```bash
curl -X PUT http://localhost:3000/api/v1/agents/999 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@test.com",
    "phone": "+1-555-0199",
    "status": "active",
    "department": "Support",
    "hireDate": "2024-01-01"
  }'
```

**Respuesta esperada (404 Not Found):**
```json
{
  "success": false,
  "message": "Agente con ID 999 no encontrado"
}
```

---

### 5️⃣ ELIMINAR UN AGENTE

**Endpoint:** `DELETE /api/v1/agents/:id`

**Eliminar agente con ID 2:**
```bash
curl -X DELETE http://localhost:3000/api/v1/agents/2
```

**Respuesta esperada (204 No Content):** _Sin body, solo headers_

**Verificar que fue eliminado:**
```bash
curl http://localhost:3000/api/v1/agents/2
```

**Respuesta esperada (404 Not Found):**
```json
{
  "success": false,
  "message": "Agente con ID 2 no encontrado"
}
```

**Intentar eliminar agente que no existe:**
```bash
curl -X DELETE http://localhost:3000/api/v1/agents/999
```

**Respuesta esperada (404 Not Found):**
```json
{
  "success": false,
  "message": "Agente con ID 999 no encontrado"
}
```

---

## 🔍 Testing con Postman o Thunder Client

### Importar colección JSON

Copia y pega esta colección en Postman:

```json
{
  "info": {
    "name": "Call Center API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "GET - Listar Agentes",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/v1/agents"
      }
    },
    {
      "name": "GET - Obtener Agente por ID",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/v1/agents/1"
      }
    },
    {
      "name": "POST - Crear Agente",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "url": "http://localhost:3000/api/v1/agents",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Nuevo Agente\",\n  \"email\": \"nuevo@callcenter.com\",\n  \"phone\": \"+1-555-0105\",\n  \"status\": \"active\",\n  \"department\": \"Support\",\n  \"hireDate\": \"2024-04-01\"\n}"
        }
      }
    },
    {
      "name": "PUT - Actualizar Agente",
      "request": {
        "method": "PUT",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "url": "http://localhost:3000/api/v1/agents/1",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Agente Actualizado\",\n  \"email\": \"actualizado@callcenter.com\",\n  \"phone\": \"+1-555-0101\",\n  \"status\": \"on-break\",\n  \"department\": \"Support\",\n  \"hireDate\": \"2023-01-15\"\n}"
        }
      }
    },
    {
      "name": "DELETE - Eliminar Agente",
      "request": {
        "method": "DELETE",
        "url": "http://localhost:3000/api/v1/agents/3"
      }
    }
  ]
}
```

---

## 📊 Códigos HTTP Esperados

| Operación        | Status Code | Descripción                                  |
| ---------------- | ----------- | -------------------------------------------- |
| GET listado      | 200         | OK - Lista obtenida                          |
| GET por ID       | 200         | OK - Recurso encontrado                      |
| GET por ID       | 404         | Not Found - Recurso no existe                |
| POST create      | 201         | Created - Recurso creado                     |
| POST validation  | 400         | Bad Request - Datos inválidos                |
| PUT update       | 200         | OK - Recurso actualizado                     |
| PUT not found    | 404         | Not Found - Recurso no existe                |
| DELETE success   | 204         | No Content - Eliminado sin body              |
| DELETE not found | 404         | Not Found - Recurso no existe                |

---

## 🎯 Checklist de Testing Completo

- [ ] Listar agentes devuelve 200 con array
- [ ] Obtener agente por ID válido devuelve 200
- [ ] Obtener agente por ID inválido devuelve 404
- [ ] Crear agente con datos válidos devuelve 201
- [ ] Crear agente sin campos requeridos devuelve 400
- [ ] Crear agente con status inválido devuelve 400
- [ ] Actualizar agente existente devuelve 200
- [ ] Actualizar agente inexistente devuelve 404
- [ ] Eliminar agente existente devuelve 204 sin body
- [ ] Eliminar agente inexistente devuelve 404
- [ ] Logger se ejecuta en cada solicitud
- [ ] Ruta no existente devuelve 404

---

## 💡 Tips

1. **Copiar y ejecutar rápidamente:** Usa las siguientes alias en tu terminal

   ```bash
   alias get-agents='curl http://localhost:3000/api/v1/agents'
   alias get-agent-1='curl http://localhost:3000/api/v1/agents/1'
   ```

2. **Usar jq para formatear salida:**
   ```bash
   curl http://localhost:3000/api/v1/agents | jq '.'
   ```

3. **Guardar output en archivo:**
   ```bash
   curl http://localhost:3000/api/v1/agents > agents.json
   ```

---

**Última actualización:** Abril 2024
