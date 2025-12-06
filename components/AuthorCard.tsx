import Link from 'next/link';
import { Author } from '@/lib/types';

interface AuthorCardProps {
  author: Author;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const avatarUrl = author.metadata.avatar?.imgix_url;
  
  return (
    <Link href={`/authors/${author.slug}`} className="group block h-full">
      <div className="flex flex-col items-center p-6 bg-white dark:bg-zinc-900 rounded-xl border border-border transition-all duration-300 hover:shadow-lg hover:border-primary/20 h-full">
        {avatarUrl ? (
          <div className="relative w-24 h-24 mb-4 overflow-hidden rounded-full border-2 border-border group-hover:border-primary transition-colors">
            <img
              src={`${avatarUrl}?w=200&h=200&fit=crop&auto=format,compress`}
              alt={author.title}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div className="w-24 h-24 mb-4 rounded-full bg-secondary flex items-center justify-center text-3xl font-bold text-secondary-foreground">
            {author.title.charAt(0)}
          </div>
        )}
        
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors text-center">
          {author.title}
        </h3>
        
        {/* Simple truncation for bio if it's long */}
        <div className="text-sm text-muted-foreground text-center line-clamp-3">
          {author.metadata.bio}
        </div>
      </div>
    </Link>
  );
}