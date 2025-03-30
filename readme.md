# 📊 Mini Data Query Simulation Engine

A lightweight backend service simulating a Gen AI Analytics tool that accepts natural language queries, interprets them as pseudo-SQL, and returns mock results — designed for non-technical users to query data seamlessly.
<!-- 
> 🔧 Built with Node.js, Express, and TypeScript as part of a Backend Engineering Internship assessment. -->

---

## 🚀 Features

- Accepts natural language queries via REST API
- Converts valid queries to pseudo-SQL (mock interpreter)
- Explains query breakdown (filters, group by, etc.)
- Validates queries and returns simulated results
- Lightweight JWT-based authentication
- In-memory session for last submitted query

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/avinashkt04/mini_data_query_simulation.git
cd mini_data_query_simulation
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup `.env` file in the project root
```bash
JWT_SECRET=your_secret_key
PORT=3000
```

### 4. Start the development server
```bash
npm run start
```
Server runs on `http://localhost:3000`

---

## 📡 API Documentation
### 🔐 `GET /api/v1/token`

#### Description:
Generate a temporary JWT access token. Required to access all protected endpoints.

#### Response:
```bash
{
  "message": "Token generated successfully",
  "token": "<jwt_token_here>"
}
```

#### Usage:
Include the token in the Authorization header:
```bash
Authorization: Bearer <token>
```

OR simply:

```bash
Authorization: <token>
```

---

### 📥 `POST /api/v1/query`
#### Description:
Accepts a natural language query, checks if it's interpretable, and stores it in memory.

#### Request Body:

```json
{
  "query": "show total revenue by region"
}
```

#### Success Response:

```json
{
  "message": "Query stored successfully"
}
```

#### Error Responses:

`400 Bad Request` — Query is missing

`422 Unprocessable Entity` — Query not interpretable

---

### 🧠 `GET /api/v1/explain`
#### Description:
Returns a simulated breakdown of the last accepted query, including filters, columns, and group-by info.

Success Response:

```json
{
  "originalQuery": "show total revenue by region",
  "queryMeta": "SELECT region, SUM(revenue) FROM sales GROUP BY region",
  "type": "aggregation",
  "table": "sales",
  "filters": [],
  "columns": ["region", "SUM(revenue)"],
  "groupBy": ["region"]
}
```

#### Error Responses:

`400 Bad Request` — No query submitted yet

`422 Unprocessable Entity` — Query not interpretable

---

### ✅ `GET /api/v1/validate`
#### Description:
Checks if the last query is valid and returns a simulated result.

#### Success Response:

```json
{
  "message": "Query is valid and feasible.",
  "result": {
    "North": 1800,
    "South": 1500
  }
}
```

#### Error Responses:

`400 Bad Request` — No query submitted yet

`422 Unprocessable Entity` — Query not interpretable

---

## 💡 Supported Sample Queries
You can test the following queries (defined in `mocks/query-map.json`):

| Natural Language Query                     | Interpreted SQL                                                |
|--------------------------------------------|----------------------------------------------------------------|
| show total revenue by region               | SELECT region, SUM(revenue) FROM sales GROUP BY region         |
| show all sales in january                  | SELECT * FROM sales WHERE month = 'January'                    |
| get average order value                    | SELECT AVG(amount) FROM orders                                 |
| list all active users                      | SELECT * FROM users WHERE status = 'active'                    |
| how many orders were placed in march       | SELECT COUNT(*) FROM orders WHERE month = 'March'              |

---