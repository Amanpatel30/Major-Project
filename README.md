# 🔐 Full Stack Authentication Project

A modern full-stack application demonstrating user authentication using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## ✨ Features

- 👤 User Registration with email and password
- 🔑 User Login with JWT authentication
- 🛡️ Protected Routes
- 📱 Responsive Design
- 🎨 Modern UI with Tailwind CSS
- ✅ Form validation
- ⚠️ Error handling
- 💾 Persistent login state

## 🛠️ Tech Stack

### 🌐 Frontend
- ⚛️ React.js with Vite
- 🔄 React Router for navigation
- 🎨 Tailwind CSS for styling
- 🔌 Axios for API requests
- 📦 Context API for state management
- 🎯 Remix Icons for UI icons

### ⚙️ Backend
- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB with Mongoose
- 🔒 JWT for authentication
- 🔑 Bcrypt for password hashing
- 🔄 CORS for cross-origin requests

## 📁 Project Structure

```
├── frontend/                # Frontend application
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── context/        # Context providers
│   │   └── ...
│   ├── package.json
│   └── README.md
│
├── backend/                 # Backend application
│   ├── controllers/        # Request handlers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── package.json
│   └── README.md
│
└── README.md               # Main README file
```

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/Amanpatel30/Major-Project.git
```

2. Install MongoDB Community Server
- Download from: https://www.mongodb.com/try/download/community
- Install with default settings
- Add MongoDB to system PATH

3. Start MongoDB
```bash
mongod
```

4. Setup Backend
```bash
cd backend
npm install
npm start
```

5. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

6. Create .env files:

Backend (.env):
```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/majorproject
JWT_SECRET=your_jwt_secret_key_here
```

Frontend (.env):
```
VITE_BASE_URL=http://localhost:4000/api
```

## 📜 Available Scripts

In the backend directory:
```bash
npm start     # Start the server
```

In the frontend directory:
```bash
npm run dev   # Start development server
npm run build # Build for production
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created with ❤️ by **Aman Patel**
