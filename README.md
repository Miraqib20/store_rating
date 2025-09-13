FullStack Intern Challenge - Minimal Scaffold
Server: Express + Sequelize (Postgres)
Client: React (minimal)

How to run:
1. Set up a PostgreSQL database and update server/.env.example (copy to .env).
2. Install server deps: cd server && npm install
3. Install client deps: cd client && npm install
4. Run server: cd server && npm run dev
5. Run client: cd client && npm start

This scaffold includes:
- Auth (register/login) with JWT
- Roles: admin, user, owner
- Admin endpoints: dashboard counts, create users/stores, list users/stores
- Stores endpoints: list, get, submit/update ratings
- Frontend: simple pages for login, register, and role dashboards.

You can extend validation, sorting, filtering, and UI per the challenge requirements.
