# Notes App - Full Stack Next.js 15 Application

A full-stack notes management application built with **Next.js 15 App Router**, **TypeScript**, **Redux Toolkit**, and **local JSON storage** for backend emulation. The app supports full **CRUD functionality**, **authentication** using JWT with cookies, and is ready for **Dockerized development**.

---

## 🚀 Features

* Next.js 15 App Router (latest)
* Redux Toolkit for state management
* Auth (Sign In/Sign Up) with JWT tokens stored in **cookies**
* Notes CRUD API (GET, POST, PATCH, DELETE)
* Middleware for **route protection** (auth-guard)
* Styled auth pages with responsive design
* Data stored locally in `src/data/*.json`
* Docker + Docker Compose setup for easy local development

---


## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run in Dev Mode

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

### 3. Docker Development

```bash
docker-compose up --build
```

Also available at: [http://localhost:3000](http://localhost:3000)

---

## Auth Flow (JWT + Cookie Based)

* JWT is created on login, signed using `JWT_SECRET`, and stored in **HTTP-only cookie**.
* Protected routes are guarded via `middleware.ts`.
* Token is verified server-side in each API route.

Middleware example:

```ts
export const config = {
  matcher: ['/dashboard/:path*', '/notes/create', '/notes/edit/:path*', '/profile'],
}
```

---

##  Notes API Overview (JSON File Storage)

All notes are saved under `src/data/notes.json`:

* Each note includes: `{ id, title, content, userId }`
* Only logged-in user's notes are fetched and editable

---


## Security Considerations

* Token is stored in a secure cookie (HTTP-only, SameSite=lax)
* Backend APIs check token with `verifyToken()` on each request
* Middleware ensures UI-level protection for dashboard routes

---


## 📝 Author

Built with ❤️ by Muruganantham D

