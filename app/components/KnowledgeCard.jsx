import Image from 'next/image';
import { ExternalLink, BookOpen, Video, Link as LinkIcon } from 'lucide-react';

export default function KnowledgeCard({ item }) {
  const defaultImage = "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&h=600&fit=crop&q=80"; // Default nature image

  const getIcon = (contentType) => {
    switch (contentType) {
      case 'article':
        return <BookOpen className="w-5 h-5 text-secondary-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-red-500" />;
      default:
        return <LinkIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative w-full h-48">
        <Image
          src={item.image_url || defaultImage}
          alt={item.title || 'Knowledge item'}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 font-display">
          {item.title || 'Untitled Knowledge'}
        </h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
          {item.description || 'No description available.'}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
          <span className="flex items-center gap-1">
            {getIcon(item.content_type)}
            {item.content_type ? item.content_type.charAt(0).toUpperCase() + item.content_type.slice(1) : 'Unknown'}
          </span>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary-600 hover:text-primary-800 hover:underline transition-colors"
          >
            View Source
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
