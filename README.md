# Docker CRUD API Project

This is a full-stack backend CRUD API project built with Node.js, Express, TypeScript, and Prisma ORM. The default database is PostgreSQL. The project includes Docker configurations for easy local development and deployment, but can also be run locally without Docker.

## Features
- Express REST API with TypeScript
- PostgreSQL database (via Docker or locally)
- Prisma as ORM & schema management
- Supports running with or without Docker

---

## Getting Started

### 1. Run with Docker (Recommended)

1. **Clone the repository.**
2. **Create environment files:**
    - Copy or create `.env.docker` at the project root with a suitable `DATABASE_URL` (format: check `prisma/schema.prisma`).
3. **Start the stack:**
    ```bash
    docker-compose up --build
    ```
4. **API available at:** `http://localhost:3000/`

_This will:_
- Build the Node.js app
- Start a PostgreSQL database
- Run the API server in development mode (auto-reloading)

### 2. Run Locally Without Docker

1. **Ensure Node.js and PostgreSQL are installed locally.**
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Set up environment variables:**
    - Create a `.env` file at the project root with your local `DATABASE_URL` for PostgreSQL.
4. **Run Prisma migrations and generate the client:**
    ```bash
    npx prisma migrate deploy
    npx prisma generate
    ```
5. **Start the development server:**
    ```bash
    npm run dev
    ```
6. **API available at:** `http://localhost:3000/`

---

## API Endpoints
- All endpoints are prefixed with `/api/v0/`
- Health check: `GET /health`

---

Happy Coding!

