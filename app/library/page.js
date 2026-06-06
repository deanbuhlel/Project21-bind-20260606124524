import { supabaseClient } from '@/lib/supabase';
import KnowledgeCard from '@/app/components/KnowledgeCard';
import { getServerSession } from 'next-auth'; // Assuming next-auth for session management, or adjust for Supabase auth
import { redirect } from 'next/navigation';
import { BookOpen, Loader2 } from 'lucide-react';
import { Suspense } from 'react';

async function getKnowledgeItems(userId) {
  const { data, error } = await supabaseClient
    .from('knowledge_items')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching knowledge items:', error);
    return [];
  }
  return data;
}

async function LibraryContent() {
  // In a real app, you'd get the user session here.
  // For this example, we'll simulate a user ID or redirect if not authenticated.
  // const session = await getServerSession(authOptions); // If using NextAuth
  // if (!session?.user?.id) {
  //   redirect('/login'); // Redirect to login if not authenticated
  // }
  // const userId = session.user.id;

  // For demonstration, we'll use a placeholder or assume user is logged in via Supabase client-side
  // In a server component, you'd typically get the user from a server-side Supabase client or NextAuth.
  // For now, we'll fetch all items (or filter by a dummy user_id if RLS is set up for anon access)
  // IMPORTANT: For production, ensure proper authentication and user_id filtering.
  const { data: { user } } = await supabaseClient.auth.getUser();

  if (!user) {
    redirect('/'); // Redirect to home or login if no user session
  }

  const knowledgeItems = await getKnowledgeItems(user.id);

  return (
    <div className="py-8">
      <h1 className="text-4xl font-display font-bold text-gray-900 mb-8 flex items-center gap-3">
        <BookOpen className="w-10 h-10 text-primary-500" />
        My Knowledge Library
      </h1>

      {knowledgeItems.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-600">Your library is empty. Start by submitting a new link!</p>
          <p className="mt-4 text-lg text-gray-500">
            <a href="/submit" className="text-primary-600 hover:underline">Submit a new link</a> to add knowledge.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {knowledgeItems.map((item) => (
            <KnowledgeCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function LibraryPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
        <span className="ml-4 text-lg text-gray-600">Loading your library...</span>
      </div>
    }>
      <LibraryContent />
    </Suspense>
  );
}
