'use client';

import { Analytics } from "@vercel/analytics/next"
import { useState } from "react";

export default function AnalyticsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'secret') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-2">
        <h1 className="text-4xl font-bold mb-4">Analytics Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded text-black"
            placeholder="Enter password..."
          />
          <button type="submit" className="bg-zinc-800 text-white px-4 py-2 rounded">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
      <h1 className="text-4xl font-bold mb-4">Analytics</h1>
      <p className="text-xl">Vercel Analytics is active on this page.</p>
      <Analytics />
    </div>
  );
}
