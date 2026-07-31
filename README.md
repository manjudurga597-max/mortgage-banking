# Mortgage Banking Application

A production-ready MERN stack application for mortgage banking management, customer onboarding, loan tracking, approval workflows, and document management.

## Features
- **Authentication**: JWT-based authentication with bcrypt password hashing.
- **Auto Admin Bootstrap**: Automatic creation of default admin user (`admin` / `admin123`) on startup.
- **Customer Management**: Full CRUD operations for customer records.
- **Loan Applications & Approval Workflow**: Create, edit, track status, and approve/reject loan applications.
- **Document Upload**: Manage loan documents with auto-created upload directory support.
- **EMI Calculator**: Interactive loan EMI calculation.
- **Production Readiness**: Environment variable configurable, CORS policy enforcement, centralized error handling.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Redux Toolkit, React Router DOM, Axios.
- **Backend**: Node.js, Express.js, MongoDB Atlas, Mongoose, JWT, BcryptJS, Multer.
- **Deployment**: Vercel (Frontend), Render (Backend), MongoDB Atlas (Database).

## Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/mortgagebanking?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000
```

## Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```

### 2. Frontend Setup
```bash
npm install
npm run dev
```
