# Frontend - Authentication System

The frontend of our authentication system built with React.js, Vite, and Tailwind CSS.

## Features

- Modern and responsive UI
- Form validation
- Protected routes
- User context for state management
- Persistent login state
- Error handling
- Loading states
- Password visibility toggle

## Tech Stack

- React.js 18+ with Vite
- React Router v6 for routing
- Tailwind CSS for styling
- Axios for API requests
- Context API for state management
- Remix Icons for UI elements

## Project Structure

```
src/
├── pages/          # Page components
│   ├── Home.jsx    # Home page
│   ├── Login.jsx   # Login page
│   └── Register.jsx # Registration page
├── context/        # Context providers
│   └── UserContext.jsx # User authentication context
├── App.jsx         # Main app component
└── main.jsx       # Entry point
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create a .env file in the root directory:
```
VITE_BASE_URL=http://localhost:4000/api
```

3. Start the development server:
```bash
npm run dev
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_BASE_URL | Backend API URL | http://localhost:4000/api |

## Pages

### Home (/)
- Landing page
- Shows login/register buttons for non-authenticated users
- Shows welcome message and logout button for authenticated users

### Register (/register)
- User registration form
- Form validation
- Error handling
- Password visibility toggle
- Redirects to home on successful registration

### Login (/login)
- User login form
- Form validation
- Error handling
- Password visibility toggle
- Redirects to home on successful login

## State Management

User authentication state is managed through the UserContext, which provides:
- Current user data
- Login function
- Logout function
- Persistent state through localStorage

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Development Guidelines

- Follow ESLint configuration
- Use functional components
- Implement proper error handling
- Write clean, documented code
- Follow the existing project structure

## Troubleshooting

### Common Issues

1. **API Connection Error**
   - Verify backend server is running
   - Check VITE_BASE_URL in .env
   - Ensure CORS is enabled on backend

2. **Build Issues**
   - Clear npm cache
   - Delete node_modules and reinstall
   - Check for dependency conflicts

## License

This project is licensed under the ISC License.
