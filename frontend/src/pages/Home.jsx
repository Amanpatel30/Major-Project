import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <div className="bg-[#1e293b] p-8 rounded-xl shadow-lg flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-white text-center">
          {user ? `Welcome ${user.firstname}!` : 'Welcome Home!'}
        </h1>
        <div className="flex gap-4">
          {!user ? (
            <button 
              onClick={() => navigate('/register')} 
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Register Now
            </button>
          ) : (
            <button 
              onClick={() => {
                logout();
                navigate('/');
              }} 
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
