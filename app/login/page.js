"use client";

import { useState } from 'react';
import { supabaseClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn, Loader2, UserPlus } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setLoading(true);

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setIsError(true);
    } else {
      setMessage('Logged in successfully! Redirecting...');
      setIsError(false);
      router.push('/library'); // Redirect to library after login
      router.refresh(); // Refresh session
    }
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setLoading(true);

    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage(error.message);
      setIsError(true);
    } else {
      setMessage('Sign up successful! Please check your email for a verification link.');
      setIsError(false);
      setEmail('');
      setPassword('');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <h1 className="text-4xl font-display font-bold text-gray-900 mb-8">
        Welcome to Project21
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-gray-700"
              required
              disabled={loading}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-gray-700"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 transition-transform transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Login
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600">
          <p>Don't have an account?</p>
          <button
            onClick={handleSignUp}
            className="mt-2 w-full flex items-center justify-center gap-3 px-6 py-3 bg-secondary-600 text-white font-semibold rounded-lg shadow-md hover:bg-secondary-700 transition-transform transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing up...
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Sign Up
              </>
            )}
          </button>
        </div>

        {message && (
          <div className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {isError ? <XCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
            <p className="text-sm">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
