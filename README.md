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

⚙️ Getting Started

1. Clone the repository

git clone https://github.com/YOUR_USERNAME/expense-tracker.git
cd expense-tracker

2. Install dependencies

cd client
npm install

cd ../server
npm install


🗄️ Database

The project uses PostgreSQL as its relational database.

Before running the backend, make sure PostgreSQL is running and the required database and tables have been created.

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
