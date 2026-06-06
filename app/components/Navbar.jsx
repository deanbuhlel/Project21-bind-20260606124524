"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, BookOpen, Share2, LogIn, LogOut, User } from 'lucide-react';
import { supabaseClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabaseClient.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    setUser(null);
    // Optionally redirect to home or login page
    window.location.href = '/';
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: Sparkles },
    { name: 'Submit', href: '/submit', icon: Share2 },
    { name: 'Library', href: '/library', icon: BookOpen },
  ];

  return (
    <nav className="bg-gradient-to-r from-primary-700 to-primary-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-display font-bold hover:text-primary-100 transition-colors">
            <Sparkles className="w-7 h-7" />
            Project21
        </Link>

        <div className="flex items-center gap-6">
          <ul className="flex space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <li key={link.name}>
                  <Link href={link.href} className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                      isActive ? 'bg-primary-600 text-white shadow-inner' : 'hover:bg-primary-800 text-primary-100'
                    }`}>
                      <Icon className="w-5 h-5" />
                      {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-6 h-6 rounded-full bg-primary-500 animate-pulse"></div>
            ) : user ? (
              <>
                <span className="text-primary-100 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-md"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="flex items-center gap-2 px-4 py-2 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 transition-colors shadow-md">
                  <LogIn className="w-5 h-5" />
                  Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
