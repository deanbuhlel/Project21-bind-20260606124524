import { Suspense } from 'react';
import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Project21 - Knowledge Library',
  description: 'Organize and analyze knowledge from videos and articles.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </main>
        <footer className="bg-gray-800 text-white text-center p-4 mt-8">
          <p>&copy; {new Date().getFullYear()} Project21. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
