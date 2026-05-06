# ⚡ Thunder Client - Testing Guide

## 📌 Setup

1. **Open Thunder Client** (VS Code Extension or Web App)
2. **Base URL:** `http://localhost:3000/api/v1`
3. **Port:** Ensure API is running on port 3000

## 🧪 Test Collections

### 1️⃣ AGENTS - Full CRUD

#### 1.1 - GET All Agents (with pagination)
```
GET http://localhost:3000/api/v1/agents?page=1&limit=5
```
**Expected:** 200 OK with paginated array

#### 1.2 - GET Agent by ID
```
GET http://localhost:3000/api/v1/agents/1
```
**Expected:** 200 OK with single agent object

#### 1.3 - CREATE Agent
```
POST http://localhost:3000/api/v1/agents
Content-Type: application/json

{
  "fullName": "Pedro Silva",
  "email": "pedro@callcenter.com",
  "phone": "+57 315 666 7777",
  "department": "Support"
}
```
**Expected:** 201 Created with new agent (id: 6)

#### 1.4 - UPDATE Agent
```
PUT http://localhost:3000/api/v1/agents/1
Content-Type: application/json

{
  "status": "on-leave",
  "department": "Management"
}
```
**Expected:** 200 OK with updated agent

#### 1.5 - DELETE Agent
```
DELETE http://localhost:3000/api/v1/agents/1
```
**Expected:** 204 No Content (empty response)

---

### 2️⃣ CALLS - Full CRUD

#### 2.1 - GET All Calls (with pagination)
```
GET http://localhost:3000/api/v1/calls?page=1&limit=5
```
**Expected:** 200 OK with call records

#### 2.2 - GET Call by ID
```
GET http://localhost:3000/api/v1/calls/1
```
**Expected:** 200 OK with single call

#### 2.3 - CREATE Call
```
POST http://localhost:3000/api/v1/calls
Content-Type: application/json

{
  "agentId": 1,
  "clientId": 1,
  "campaignId": 1,
  "duration": 420,
  "startTime": "2024-05-04T14:00:00Z",
  "endTime": "2024-05-04T14:07:00Z",
  "status": "completed",
  "notes": "Customer very interested"
}
```
**Expected:** 201 Created

#### 2.4 - UPDATE Call
```
PUT http://localhost:3000/api/v1/calls/1
Content-Type: application/json

{
  "status": "completed",
  "notes": "Follow up scheduled"
}
```
**Expected:** 200 OK

#### 2.5 - DELETE Call
```
DELETE http://localhost:3000/api/v1/calls/1
```
**Expected:** 204 No Content

---

### 3️⃣ CLIENTS - Full CRUD

#### 3.1 - GET All Clients
```
GET http://localhost:3000/api/v1/clients?page=1&limit=5
```

#### 3.2 - GET Client by ID
```
GET http://localhost:3000/api/v1/clients/1
```

#### 3.3 - CREATE Client
```
POST http://localhost:3000/api/v1/clients
Content-Type: application/json

{
  "name": "New Tech Company",
  "email": "contact@newtech.com",
  "phone": "+57 320 777 8888",
  "company": "New Tech Inc"
}
```

#### 3.4 - UPDATE Client
```
PUT http://localhost:3000/api/v1/clients/1
Content-Type: application/json

{
  "status": "active",
  "company": "Updated Company Name"
}
```

#### 3.5 - DELETE Client
```
DELETE http://localhost:3000/api/v1/clients/1
```

---

### 4️⃣ CAMPAIGNS - Full CRUD

#### 4.1 - GET All Campaigns
```
GET http://localhost:3000/api/v1/campaigns?page=1&limit=5
```

#### 4.2 - GET Campaign by ID
```
GET http://localhost:3000/api/v1/campaigns/1
```

#### 4.3 - CREATE Campaign
```
POST http://localhost:3000/api/v1/campaigns
Content-Type: application/json

{
  "name": "Q3 Expansion Campaign",
  "description": "Third quarter expansion initiative",
  "startDate": "2024-07-01",
  "endDate": "2024-09-30",
  "targetCalls": 1000
}
```

#### 4.4 - UPDATE Campaign
```
PUT http://localhost:3000/api/v1/campaigns/1
Content-Type: application/json

{
  "status": "active",
  "completedCalls": 250
}
```

#### 4.5 - DELETE Campaign
```
DELETE http://localhost:3000/api/v1/campaigns/1
```

---

## ❌ Error Testing

### Test 404 Not Found
```
GET http://localhost:3000/api/v1/agents/999
```
**Expected Response (404):**
```json
{
  "error": "Not Found",
  "message": "Agent 999 not found"
}
```

### Test 400 Bad Request (Missing required fields)
```
POST http://localhost:3000/api/v1/agents
Content-Type: application/json

{
  "email": "incomplete@agent.com"
}
```
**Expected Response (400):**
```json
{
  "error": "Bad Request",
  "message": "Missing required fields"
}
```

---

## 📊 Pagination Testing

### Test Different Page Sizes
```
GET http://localhost:3000/api/v1/agents?page=2&limit=2
```

**Response Contract:**
```json
{
  "data": [...],      // Array of items
  "total": 5,         // Total items in database
  "page": 2,          // Current page number
  "limit": 2          // Items per page
}
```

---

## ✅ Response Contract Examples

### Success - Single Resource (GET by ID, POST, PUT)
```json
{
  "data": {
    "id": 1,
    "fullName": "Agent Name",
    // ... other fields
  }
}
```

### Success - List (GET all with pagination)
```json
{
  "data": [
    { "id": 1, "name": "Item 1" },
    { "id": 2, "name": "Item 2" }
  ],
  "total": 10,
  "page": 1,
  "limit": 5
}
```

### Success - Delete (204 No Content)
```
No body
```

### Error - Not Found (404)
```json
{
  "error": "Not Found",
  "message": "Agent 999 not found"
}
```

### Error - Bad Request (400)
```json
{
  "error": "Bad Request",
  "message": "Missing required fields"
}
```

---

## 💡 Quick Start

1. **Install Thunder Client** from VS Code Extensions
2. **Set Base URL** in environment: `http://localhost:3000/api/v1`
3. **Import these requests** and organize into collections:
   - Agents (5 requests)
   - Calls (5 requests)
   - Clients (5 requests)
   - Campaigns (5 requests)
   - Error Cases (2 requests)
4. **Run Collections** sequentially to test complete workflow
5. **Save responses** for documentation

---

## 🎯 What to Verify

- ✅ All HTTP status codes correct (200, 201, 204, 404, 400)
- ✅ Response bodies match contract
- ✅ Pagination works (try ?page=2)
- ✅ 404 errors for non-existent resources
- ✅ 201 status for POST requests
- ✅ 204 status for DELETE requests
- ✅ Update operations preserve other fields
- ✅ Data persistence (create, then GET)

---

## 🚀 Production Testing

Once all requests pass, you're ready for:
```bash
pnpm build    # Compile TypeScript
pnpm start    # Run production server
```

The API is production-ready and fully tested! 🎉
