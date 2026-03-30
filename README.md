#  SB-Ecom (Root README)

Brief root-level documentation for the **frontend** and **backend** parts of the project. This file is a quick start reference and orientation guide for new contributors.

## Live Demo

**View the live application**: [https://sb-ecom-489613.web.app/](https://sb-ecom-489613.web.app/)

The frontend is deployed on **Firebase Hosting** for fast, reliable delivery. Note that the backend (deployed on Google Cloud Platform) may take 15-20 seconds to wake up on first access due to cold starts.

##  Repository structure

- `frontend/` - React + Vite + Redux Toolkit + Tailwind + Firebase Hosting (detailed README inside `frontend/README.md`).
- `backend/` - Spring Boot 3.5.6 + PostgreSQL + JWT + Swagger/OpenAPI (detailed README inside `backend/README.md`).

##  Quick start (frontend)

1. `cd frontend`
2. `npm install`
3. `.env` example:
   - `VITE_BACK_END_URL=http://localhost:8080`
   - `VITE_STRIPE_PUBLISHABLE_KEY=...`
4. `npm run dev` (http://localhost:5173)

##  Quick start (backend)

1. `cd backend`
2. `mvn clean install`
3. `.env` or `application.properties`:
   - `spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce`
   - `spring.datasource.username=...`
   - `spring.datasource.password=...`
   - `JWT_SECRET=...`
   - `IMGBB_API_KEY=...`
4. `mvn spring-boot:run` (http://localhost:8080)

##  Key features

- Frontend:
  - Product discovery and pagination
  - Cart management, orders, multi-step payment (Stripe + PayPal)
  - Admin panel (CRUD products, categories, orders, users)
  - Authentication and route guarding (JWT + role-based access)

- Backend:
  - REST APIs for products/categories/cart/orders/addresses
  - JWT auth with HTTP-only cookies
  - Swagger/OpenAPI docs
  - PostgreSQL + Spring Data JPA / Hibernate

##  Documentation links

- Frontend README: `frontend/README.md`
- Backend README: `backend/README.md`

##  Note

Production frontend is deployed on Firebase; backend is deployed on GCP and can have cold start delay (around 15-20 sec).

