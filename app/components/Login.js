"use client";
import React, { useState } from "react";
import { useUserAuth } from "../_utils/auth-context"; // Adjust the path as necessary
import { useRouter } from "next/router";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signInWithEmail } = useUserAuth();
  // const router = useRouter();

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
    <div className="flex justify-center items-center h-screen bg-[#0F0529]">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-yellow-600 mb-10">
          Stock Management
        </h1>
        <div className="bg-transparent p-8 rounded">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-white text-lg mb-2"
              >
                Login
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-300 text-black focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-white text-lg mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-300 text-black focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-yellow-700 focus:outline-none focus:shadow-outline"
            >
              Enter
            </button>
          </form>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
