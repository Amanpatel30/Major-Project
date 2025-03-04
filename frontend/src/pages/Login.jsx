import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import axios from "axios";
import { useUser } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setError("");

    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        user
      );
      if (response.status === 200) {
        login(response.data);
        setEmail("");
        setPassword("");
        navigate("/home");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Login failed');
      } else if (error.request) {
        setError('Network error. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-2/3 lg:w-1/3 bg-[#1e293b] h-auto rounded-xl shadow-lg flex flex-col p-4 md:p-8 gap-4 md:gap-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-2 md:mb-4">
          Login
        </h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col w-full gap-2">
          <label htmlFor="email" className="text-white text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
        </div>

        <div className="flex flex-col w-full gap-2">
          <label htmlFor="password" className="text-white text-sm">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <RiEyeOffLine size={20} />
              ) : (
                <RiEyeLine size={20} />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md mt-2 md:mt-4 hover:bg-blue-700 transition-colors text-sm md:text-base"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
