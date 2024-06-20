"use client";
import React, { useState } from 'react';
import Dashboard from './dashboard';
import ScanAndManage from './scan_and_manage';
import StockInsertion from './stock_insertion';

function Page() {
  const [view, setView] = useState('login'); // Manage views: 'login', 'dashboard', 'scanAndManage'

  // Login logic
  const login = (username, password) => {
    if (username === "admin" && password === "admin") {
      setView('dashboard');
    } else {
      alert('Incorrect credentials!');
    }
  };

  // Navigation helper
  const navigateTo = (page) => {
    setView(page);
  };

  return (
    view === 'login' ? <Login onLogin={login} /> :
    view === 'dashboard' ? <Dashboard onNavigate={navigateTo} onLogout={() => navigateTo('login')} /> :
    view === 'scanAndManage' ? <ScanAndManage onBack={() => navigateTo('dashboard')} /> :
    view === 'stockInsertion' ? <StockInsertion /> :
    null
  );
}

// Login component
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-purple-800">
      <div className="p-8 bg-white rounded shadow-md text-center">
        <h1 className="text-lg font-bold text-yellow-600 mb-6">Stock Management</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border text-black border-gray-300 rounded focus:outline-none focus:border-yellow-600"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border text-black border-gray-300 rounded focus:outline-none focus:border-yellow-600"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-600 text-white font-bold py-2 px-4 rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
