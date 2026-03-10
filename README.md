# Portfolio Website

A fullstack portfolio website for FuzzLabs Academy.

## Features

- User registration and login system
- Personal dashboard with portfolio management (CRUD)
- Public portfolio page
- Contact form with message storage
- Responsive design
- JWT authentication

## Tech Stack

- **Backend**: Node.js, Express, SQLite (better-sqlite3)
- **Frontend**: React, Vite
- **Reverse Proxy**: Nginx
- **Containerization**: Docker, Docker Compose

## Getting Started

### Prerequisites

- Node.js 18+
- Docker and Docker Compose

### Development

1. **Frontend**:
```bash
cd frontend
npm install
npm run dev
```

2. **Backend**:
```bash
cd backend
npm install
npm run dev
```

The frontend runs on http://localhost:5173 and the backend on http://localhost:3001.

### Production with Docker

```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d
```

The application will be available at http://localhost (or port 80). Set port with .env `PORT`.

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=3001
JWT_SECRET=your-secret-key
```

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `GET /api/portfolio` - Get all portfolio items (public)
- `GET /api/portfolio/mine` - Get user's portfolio items
- `POST /api/portfolio` - Create portfolio item
- `PUT /api/portfolio/:id` - Update portfolio item
- `DELETE /api/portfolio/:id` - Delete portfolio item
- `POST /api/contact` - Submit contact message
- `GET /api/contact` - Get all messages (authenticated)
