# ⚙️ Backend - Authentication System

The backend API for our authentication system built with Node.js, Express, and MongoDB.

## ✨ Features

- 👤 User registration and login
- 🔒 JWT authentication
- 🔑 Password hashing with bcrypt
- 🍃 MongoDB database integration
- ⚠️ Error handling middleware
- 🔄 CORS enabled
- ⚙️ Environment variable configuration
- 🔁 MongoDB connection with retry logic

## 🛠️ Tech Stack

- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB with Mongoose
- 🔒 JWT for authentication
- 🔑 Bcrypt for password hashing
- 🔄 CORS for cross-origin requests
- ⚙️ Dotenv for environment variables

## 📁 Project Structure

```
├── controllers/        # Request handlers
│   └── userController.js  # User authentication logic
├── models/            # Database models
│   └── userModel.js   # User schema and model
├── routes/            # API routes
│   └── userRoutes.js  # User-related routes
├── server.js          # Main application file
└── .env              # Environment variables
```

## 🔌 API Endpoints

### 🔐 Authentication Routes
- POST /api/register
  - Register a new user
  - Required fields: firstname, lastname, email, password
  - Returns: User data with JWT token

- POST /api/login
  - Login existing user
  - Required fields: email, password
  - Returns: User data with JWT token

## 🚀 Getting Started

1. Install MongoDB Community Server
2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory:
```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/majorproject
JWT_SECRET=your_jwt_secret_key_here
```

4. Start MongoDB:
```bash
mongod
```

5. Start the server:
```bash
npm start
```

## ⚙️ Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 4000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/majorproject |
| JWT_SECRET | Secret key for JWT | Required |

## 📊 Database Schema

### 👤 User Model
```javascript
{
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}
```

## ⚠️ Error Handling

The API implements comprehensive error handling for:
- ❌ Validation errors
- 🔒 Authentication errors
- 🗄️ Database errors
- 🚨 Server errors

All errors are returned in a consistent format:
```javascript
{
  message: "Error message",
  details: "Additional error details" // optional
}
```

## 👨‍💻 Author

Created with ❤️ by **Aman Patel** 