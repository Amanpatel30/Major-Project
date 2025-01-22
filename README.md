# User Authentication System

A full-stack authentication system built with MERN stack (MongoDB, Express.js, React, Node.js) featuring a modern UI and secure backend implementation.


## 🌟 Project Overview

This project consists of two main parts:
- A React frontend built with Vite and Tailwind CSS
- A Node.js/Express backend with MongoDB integration

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/Amanpatel30/Major-Project.git
cd Major-Project
```

2. Setup Backend:
```bash
cd backend
npm install
cp .env.example .env  # Create and configure your .env file
npm run dev
```

3. Setup Frontend:
```bash
cd frontend
npm install
cp .env.example .env  # Create and configure your .env file
npm run dev
```

## 🛠️ Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management
- Axios for API requests

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Express Validator for input validation

## 📁 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
```

## ✨ Features

- User Authentication
  - Register new account
  - Login with existing account
  - Password hashing for security
  - JWT token based authentication

- User Management
  - Profile viewing and editing
  - Secure password reset
  - Email verification

- Security Features
  - Protected routes
  - Input validation
  - Error handling
  - Session management

## 🔒 Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## 🚀 API Endpoints

### Auth Routes
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/profile - Get user profile
- PUT /api/auth/profile - Update user profile

## 💻 Development

To start development servers:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Aman Patel - Initial work

## 🙏 Acknowledgments

- React.js community
- Node.js community
- MongoDB team
- All contributors to this project
