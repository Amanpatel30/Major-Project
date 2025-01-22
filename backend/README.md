# Backend - User Authentication API

This is the backend API for user authentication built with Node.js, Express, and MongoDB.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/userauth
JWT_SECRET=your_jwt_secret_key_here
```

3. Make sure MongoDB is running on your system

4. Start the server:
```bash
npm start
```

## API Endpoints

### User Registration
- POST `/api/register`
- Body: 
  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

## Technologies Used
- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing 