# User Management Backend (Express + MongoDB)

## Setup
```bash
cd backend
cp .env.example .env   # update MONGO_URI if needed
npm install
npm run dev            # starts on http://localhost:5000
```

## Routes
- `GET /api/health`
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
