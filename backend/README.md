# User Authentication API Backend

A robust Node.js/Express backend API for user authentication with MongoDB database integration.

## Features

- User registration with data validation
- Password hashing using bcryptjs
- JWT-based authentication
- MongoDB database integration
- Error handling and validation
- CORS enabled for frontend integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running locally
- npm or yarn package manager

## Installation

1. Clone the repository
2. Navigate to the backend directory:
```bash
cd backend
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env` file in the root directory with the following variables:
```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/majorproject
JWT_SECRET=your_jwt_secret_key_here
```

## Project Structure

```
backend/
├── controllers/
│   └── userController.js    # User-related controller logic
├── models/
│   └── userModel.js        # User MongoDB schema
├── routes/
│   └── userRoutes.js       # API route definitions
├── .env                    # Environment variables
├── package.json           # Project dependencies
└── server.js             # Main application file
```

## API Endpoints

### User Registration
- **POST** `/api/register`
- **Body:**
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "_id": "user_id",
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "token": "jwt_token"
}
```

## Running the Server

### Development mode:
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

## Dependencies

- `express`: Web framework
- `mongoose`: MongoDB object modeling
- `bcryptjs`: Password hashing
- `jsonwebtoken`: JWT authentication
- `dotenv`: Environment variables
- `cors`: CORS middleware

## Error Handling

The API includes comprehensive error handling for:
- Invalid requests
- Database errors
- Authentication errors
- Validation errors

## Security Features

- Password hashing using bcrypt
- JWT token authentication
- Input validation
- CORS protection
- Environment variable security

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 