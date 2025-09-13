Fullstack Intern Challenge
Stack: Express.js + MySQL (Sequelize) backend, React frontend.

Folder structure:
- server/: Express backend
- client/: React frontend (create-react-app style)

Setup (backend):
1. Install MySQL and create a database named `fullstack_challenge` or change .env.
2. Copy server/.env.example to server/.env and fill DB credentials.
3. cd server && npm install
4. Run `npm run migrate` to seed sample data (creates admin/user/owner + 2 stores).
5. Start: npm start (or npm run dev)

Setup (frontend):
1. cd client && npm install
2. Optionally set REACT_APP_API_URL in .env to point to backend (default http://localhost:5000/api)
3. npm start

Notes:
- Password rules and name length checks applied on register.
- Admin user: admin@example.com / AdminPass!1 (after running migrate)
- Normal user: user1@example.com / UserPass!1
- Owner user: owner1@example.com / OwnerPass!1

This is a minimal working example focusing on core features required by the challenge.
