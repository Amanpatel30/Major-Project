import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from './context/UserContext'
import Home from './pages/Home'
import Register from './pages/Register'

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

const App = () => {
  return (
    <div className="min-h-screen bg-black">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  )
}

export default App
