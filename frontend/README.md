# Frontend - User Authentication App

This is a React-based frontend application for user authentication.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with:
```
VITE_BASE_URL=http://localhost:4000/api
```

3. Start the development server:
```bash
npm run dev
```

## Features
- User Registration with form validation
- Modern UI with Tailwind CSS
- Responsive design
- Password visibility toggle
- Form validation
- Error handling

## Technologies Used
- **React**: Frontend library
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Context API**: State management
- **Remix Icons**: Icon library

## Features in Detail

### User Registration
- Form validation for all fields
- Password strength requirements
- Password matching validation
- Error message display
- Success feedback

### UI Components
- Responsive design
- Dark theme
- Form inputs with labels
- Password visibility toggle
- Loading states
- Error messages
- Success notifications

### Authentication
- Protected routes
- User context
- Token management
- Session handling

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_BASE_URL | Backend API URL | http://localhost:4000/api |

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
