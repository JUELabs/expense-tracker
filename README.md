Expense Tracker

A full-stack expense management application that allows users to securely manage and track their personal expenses.

Built with Next.js, React, TypeScript, Express.js, and PostgreSQL, with authentication, email verification, validation, protected routes, profile management, and expense CRUD operations.

✨ Features

🔐 Authentication

User registration

Email verification

Login and logout

JWT authentication

HTTP-only cookie authentication

Protected routes

Forgot password

Reset password

Change password

👤 Profile

View and update profile

Email change verification

Change password

💰 Expense Management

Add, view, update, and delete expenses

Delete all expenses

Expense categories and descriptions

Total expense calculation

User-specific expenses

Recent expenses on the dashboard

🛡️ Security & Validation

Password hashing with bcrypt

JWT-based authentication

HTTP-only cookies

Zod request validation

Protected backend routes

Environment variables for sensitive configuration

Centralized error handling

📱 Responsive UI

Responsive desktop, tablet, and mobile layout

Material UI (MUI)

Clean and minimal interface

🛠️ Tech Stack

Frontend

Next.js

React

TypeScript

Material UI (MUI)

CSS

Fetch API

Backend

Node.js

Express.js

TypeScript

PostgreSQL

pg

Zod

bcrypt

JSON Web Token (JWT)

Nodemailer

Development Tools

Git

GitHub

DBeaver

ESLint

📂 Project Structure

Expense Tracker/
├── client/
│   ├── app/
│   │   ├── components/dashboard/
│   │   ├── dashboard/
│   │   ├── expenses/
│   │   ├── profile/
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   └── verify-email/
│   ├── lib/
│   ├── public/
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validations/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
└── README.md

⚙️ Getting Started

1. Clone the repository

git clone https://github.com/YOUR_USERNAME/expense-tracker.git
cd expense-tracker

2. Install dependencies

cd client
npm install

cd ../server
npm install

🔑 Environment Variables

Backend

Create:

server/.env

Use the environment variable names required by the backend configuration:

PORT=5000

DB_HOST=your_database_host
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password

JWT_SECRET=your_jwt_secret

EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_USER=your_email_user
EMAIL_PASSWORD=your_email_password

Frontend

Create:

client/.env.local

NEXT_PUBLIC_API_URL=http://localhost:5000/api

Never commit .env or .env.local files to GitHub.

🗄️ Database

The project uses PostgreSQL as its relational database.

Before running the backend, make sure PostgreSQL is running and the required database and tables have been created.

▶️ Running the Application

Backend

cd server
npm run dev

Frontend

cd client
npm run dev

Then open:

http://localhost:3000

🔄 Application Flow

Register
   ↓
Email Verification
   ↓
Login
   ↓
Dashboard
   ↓
Expense Management
   ↓
Add / Edit / Delete Expenses

Users can also manage their profile and passwords through the Profile section.

🔒 Authentication Flow

Authentication uses JWT stored in an HTTP-only cookie.

Protected requests are authenticated by the backend before allowing access to user-specific resources.

The authentication system supports email verification, password reset, password change, logout, and protected routes.

📡 API Routes

Authentication

POST   /auth/register
GET    /auth/verify-email
POST   /auth/login
POST   /auth/logout
GET    /auth/me
PUT    /auth/profile
POST   /auth/change-password
POST   /auth/forgot-password
POST   /auth/reset-password

Expenses

POST   /expenses/add-expense
GET    /expenses/get-expenses
GET    /expenses/get-expense/:id
PUT    /expenses/update-expense/:id
DELETE /expenses/delete-expense/:id
DELETE /expenses/delete-all-expenses

🧪 Validation & Error Handling

The application uses Zod for request validation and centralized middleware for error handling.

Request
   ↓
Route
   ↓
Middleware
   ↓
Validation
   ↓
Controller
   ↓
Service
   ↓
PostgreSQL

🎯 Project Goals

This project was built to strengthen practical understanding of:

REST APIs

PostgreSQL and SQL

Authentication

Backend architecture

Request validation

Middleware

CRUD operations

Frontend/backend integration

Protected routes

Environment configuration

User-specific data access

🚀 Future Improvements

Possible future improvements:

Expense analytics and charts

Advanced filtering and search

Pagination

Monthly expense summaries

Detailed reporting

Production deployment

These features are not part of the current V1.

📌 Project Status

Completed — V1

The current version focuses on authentication, profile and password management, and core expense management.

👨‍💻 Author

Farouk Gamal

Full-Stack Developer

📄 License

This project is available for educational and portfolio purposes.
