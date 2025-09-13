# FullStack Intern Challenge - Store Ratings App

**Backend:** Express + Sequelize (Postgres)  
**Frontend:** React (minimal)

---

## 🚀 How to Run

### Setup
1. `cd server && npm install`
2. `cd client && npm install`

### Steps
1. Set up a PostgreSQL database and update `server/.env.example` (copy to `.env`).
2. Install server deps: `cd server && npm install`
3. Install client deps: `cd client && npm install`
4. Run server: `cd server && npm run dev`
5. Run client: `cd client && npm start`

---

## 📦 Included Features
- 🔑 Auth (register/login) with JWT
- 👥 Roles: **Admin, User, Owner**
- 🛠️ Admin endpoints: dashboard counts, create users/stores, list users/stores
- 🏬 Stores endpoints: list, get, submit/update ratings
- 🖥️ Frontend: simple pages for login, register, and role dashboards

---

## 🗂️ Project Structure

| Folder/File   | Description |
|---------------|-------------|
| **server/**   | Express backend (APIs, authentication, role management, database models) |
| ├── index.js  | Backend entry point |
| ├── routes/   | Routes (auth, stores, ratings, admin) |
| ├── controllers/ | Controllers (business logic) |
| ├── models/   | Sequelize/Postgres models |
| ├── middleware/ | JWT auth, role check middleware |
| └── .env      | Database + JWT secrets |
| **client/**   | React frontend (UI, dashboards) |
| ├── src/pages/ | Pages (Login, Register, Dashboards) |
| ├── src/components/ | Shared UI components |
| ├── src/services/ | Axios API calls |
| ├── src/App.js | React router setup |
| └── src/index.js | React entry point |
| **README.md** | Setup instructions + documentation |

---

## 👤 User Roles & Dashboards

### System Admin
- Add stores, users (normal & admin)
- Dashboard: total users, stores, ratings
- View & filter stores/users
- View user details (incl. ratings for store owners)
- Logout

### Normal User
- Register & login
- Update password
- View/search stores
- See overall rating & their rating
- Submit/modify rating (1–5)
- Logout

### Store Owner
- Login
- Update password
- Dashboard: list of users who rated their store
- See average rating of store
- Logout

---

## ✅ Form Validation Rules

| Field    | Rule |
|----------|------|
| Name     | Min 20 chars, Max 60 chars |
| Address  | Max 400 chars |
| Password | 8–16 chars, at least 1 uppercase & 1 special char |
| Email    | Must follow standard email format |

---

## 📌 Next Steps
You can extend:
- Validation
- Sorting
- Filtering
- UI per the challenge requirements
