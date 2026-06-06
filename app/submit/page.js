import SubmitForm from '@/app/components/SubmitForm';
import { Share2 } from 'lucide-react';
import { Suspense } from 'react';

export default function SubmitPage() {
  return (
    <div className="py-8">
      <h1 className="text-4xl font-display font-bold text-gray-900 mb-8 flex items-center gap-3">
        <Share2 className="w-10 h-10 text-primary-500" />
        Submit New Knowledge
      </h1>
      <p className="text-lg text-gray-700 mb-6 max-w-2xl">
        Paste the URL of any short video or article you want to add to your library.
        We'll analyze its content and save it for you.
      </p>
      <Suspense fallback={<div>Loading form...</div>}>
        <SubmitForm />
      </Suspense>
    </div>
  );
}
