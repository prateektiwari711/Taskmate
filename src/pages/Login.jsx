import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate("");

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("LogIn Successful!");
      setError("");
      navigate("/userprofile");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-[#F2F6FF] shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-[#202848] mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleLogIn}>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 text-left">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#202848]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-left">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ringring-[#202848]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#202848] text-white py-3 rounded-lg hover:bg-[#2a3a5d] hover:scale-105 transition-transform ease-out duration-300"
          >
            LogIn
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/" className="text-[#202848] hover:underline">
            Sign Up Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
