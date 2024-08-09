"use client";

import React, { useState } from "react";
import { useUserAuth } from "../_utils/auth-context"; // Adjust the path as necessary
import { useRouter } from "next/router";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signInWithEmail } = useUserAuth();
  //   const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmail(email, password);
      console.log("User logged in successfully:", userCredential.user);
      onLogin(userCredential.user);
      router.push("/dashboard"); // Redirect to dashboard or desired page
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-purple-500 to-[#0F0529]">
      <div className="p-8 bg-white rounded shadow-md text-center">
        <h1 className="text-lg font-bold text-yellow-600 mb-6">
          Stock Management
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border text-black border-gray-300 rounded focus:outline-none focus:border-yellow-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border text-black border-gray-300 rounded focus:outline-none focus:border-yellow-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-600 text-white font-bold py-2 px-4 rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline"
          >
            Enter
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
