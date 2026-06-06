import Link from 'next/link';
import { Sparkles, BookOpen, Share2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-center py-12 px-4">
      <Sparkles className="w-24 h-24 text-primary-500 mb-6 animate-pulse" />
      <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6 leading-tight">
        Curate Your Knowledge, Effortlessly.
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-3xl mb-10">
        Project21 helps you capture insights from any short video or article.
        Just share a URL, and we'll analyze, categorize, and add it to your personal knowledge library.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/submit" className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg shadow-lg hover:bg-primary-700 transition-transform transform hover:scale-105 flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            Submit New Link
        </Link>
        <Link href="/library" className="px-8 py-4 bg-secondary-600 text-white font-semibold rounded-lg shadow-lg hover:bg-secondary-700 transition-transform transform hover:scale-105 flex items-center justify-center gap-2">
            <BookOpen className="w-5 h-5" />
            View My Library
        </Link>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <Share2 className="w-10 h-10 text-accent mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Share Anything</h3>
          <p className="text-gray-600">
            From YouTube shorts to insightful articles, simply paste the URL.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <Sparkles className="w-10 h-10 text-accent mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Intelligent Analysis</h3>
          <p className="text-gray-600">
            We extract key information like title, description, and relevant images.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <BookOpen className="w-10 h-10 text-accent mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Library</h3>
          <p className="text-gray-600">
            Build a curated collection of knowledge, always at your fingertips.
          </p>
        </div>
      </div>
    </div>
  );
}
