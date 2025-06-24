import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup Successful!");
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          Name: name,
        });
      }
      navigate("/login");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-[#F2F6FF] shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-[#202848] mb-6">
          Sign Up
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 text-left">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#202848]"
              required
            />
          </div>

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
            className="w-full bg-[#202848] text-white py-3 rounded-lg hover:bg-[#334977] hover:scale-105 transition-transform ease-out duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
