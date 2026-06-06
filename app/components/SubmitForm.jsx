"use client";

import { useState } from 'react';
import { supabaseClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Loader2, Send, CheckCircle2, XCircle } from 'lucide-react';

export default function SubmitForm() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    if (!url) {
      setMessage('Please enter a URL.');
      setIsError(true);
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabaseClient.auth.getUser();

      if (!user) {
        setMessage('You must be logged in to submit knowledge items.');
        setIsError(true);
        router.push('/login'); // Redirect to login page
        return;
      }

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, userId: user.id }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('URL submitted successfully! It will be processed shortly.');
        setIsError(false);
        setUrl('');
        router.refresh(); // Refresh the library page if user navigates there
      } else {
        setMessage(result.error || 'Failed to submit URL.');
        setIsError(true);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage('An unexpected error occurred. Please try again.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl max-w-2xl mx-auto">
      <div className="mb-6">
        <label htmlFor="url" className="block text-lg font-medium text-gray-800 mb-2">
          Knowledge Source URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="e.g., https://youtube.com/shorts/..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-gray-700"
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
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Add to Library
          </>
        )}
      </button>

      {message && (
        <div className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {isError ? <XCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
          <p className="text-sm">{message}</p>
        </div>
      )}
    </form>
  );
}
