# 💬 Chat App - Prueba Técnica Full Stack

Aplicación de chat full-stack desarrollada como prueba técnica, con arquitectura separada entre frontend y backend, desplegada en producción.

---

# 🚀 Live Demo

## 🌐 Frontend (Vercel)
https://prueba-tecnica-front-virid.vercel.app/

## ⚡ Backend API (Cloudflare Workers)
https://chat-app.lmebravo6.workers.dev

---

# 💬 Chat de ejemplo

Puedes probar la aplicación directamente entrando a un chat:

👉 https://prueba-tecnica-front-virid.vercel.app/chats/1

---

# 🧱 Arquitectura del proyecto

```txt
Frontend  → Next.js (Vercel)
Backend   → Hono + Cloudflare Workers
Database  → Neon PostgreSQL

⚙️ Instalación y ejecución en local
📦 Clonar el repositorio
git clone <URL_DEL_REPO>
cd tu-repo
🖥️ Backend (Cloudflare Workers + Hono)
cd backend
npm install
npm run dev
🔐 Variables de entorno requeridas

Crear un archivo .env o configurar en Wrangler:

DATABASE_URL=postgresql://usuario:password@host/db?sslmode=require

Para Cloudflare Workers en producción:

wrangler secret put DATABASE_URL
💻 Frontend (Next.js)
cd frontend
npm install
npm run dev
🔐 Variables de entorno requeridas

Crear archivo .env.local:

NEXT_PUBLIC_API_URL=http://localhost:8787
🚀 Flujo de ejecución local
Levantar backend primero:
cd backend
npm run dev
Luego levantar frontend:
cd frontend
npm run dev
Abrir:
http://localhost:3000

Endpoints para probarlo en local

Listar todos los chats: GET /chats
Listar los mensajes de un chat: GET /chats/:id/mensajes
Crear un mensaje en un chat: POST /chats/:id/mensajes
Eliminar un mensaje: DELETE /chats/mensajes/:id

En /collections se encuentra el archivo exportable de PostMan que contiene las rutas y endpoints para probarlos.