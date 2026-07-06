# Cafe Nik — Backend

The backend API for **Cafe Nik**, a cafe ordering platform. Built with **Fastify**, **TypeScript**, and **MySQL**.

## 🚀 Tech Stack

- **Node.js** + **Fastify 5** — Fast, low-overhead web framework
- **TypeScript** — Static typing (ESM modules)
- **MySQL** (via `mysql2`) — Relational database
- **Sequelize** — ORM for database modeling & queries
- **JWT (jsonwebtoken)** — Authentication & authorization
- **bcryptjs** — Password hashing
- **Zod** — Schema validation
- **@fastify/cookie** — Cookie handling
- **@fastify/cors** — Cross-Origin Resource Sharing
- **@fastify/helmet** — Security headers
- **Axios** — HTTP client (e.g. for external requests)
- **dotenv** — Environment variable management
- **tsx** — Fast TypeScript execution for development
- **tsc-alias** — Path alias resolution for builds

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)
- A running **MySQL** server

## 🔧 Installation & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohammadmehdidalvandii/cafe-nik-backend.git
   cd cafe-nik-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory, for example:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=cafenik
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   This uses `tsx watch` to run and auto-restart the TypeScript server on file changes.

5. **Build for production**
   ```bash
   npm run build
   ```
   Compiles TypeScript and resolves path aliases (`tsc` + `tsc-alias`).

6. **Run the production build**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
cafe-nik-backend/
├── src/
│   └── server.ts       # Application entry point
├── .gitignore
├── package.json         # Dependencies & scripts
└── tsconfig.json        # TypeScript configuration
```

## 🔐 Security Features

- Password hashing with **bcryptjs**
- **JWT**-based authentication
- HTTP security headers via **@fastify/helmet**
- Schema-based input validation with **Zod**
- Cookie handling via **@fastify/cookie**

## 📄 License

ISC
