import Link from 'next/link';
import { Post } from '@/lib/types';
import DateFormatter from './DateFormatter';
import CategoryBadge from './CategoryBadge';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const heroImage = post.metadata.hero_image?.imgix_url;
  const author = post.metadata.author;
  const categories = post.metadata.categories || [];

  return (
    <article className={`flex flex-col group h-full ${featured ? 'md:grid md:grid-cols-2 md:gap-8' : ''}`}>
      {/* Image Container */}
      <Link href={`/posts/${post.slug}`} className={`block overflow-hidden rounded-xl bg-muted ${featured ? 'h-64 md:h-full' : 'h-56'}`}>
        {heroImage ? (
          <img
            src={`${heroImage}?w=${featured ? 1200 : 800}&h=${featured ? 800 : 600}&fit=crop&auto=format,compress`}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-secondary text-secondary-foreground">
            No Image
          </div>
        )}
      </Link>

      {/* Content Container */}
      <div className={`flex flex-col flex-grow py-6 ${featured ? 'justify-center' : ''}`}>
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((category) => (
            <CategoryBadge key={category.id} category={category} />
          ))}
        </div>

        <h2 className={`font-bold text-foreground mb-3 group-hover:text-primary transition-colors ${featured ? 'text-3xl md:text-4xl' : 'text-xl'}`}>
          <Link href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        <div className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
          {post.metadata.excerpt}
        </div>

        <div className="flex items-center mt-auto pt-4 border-t border-border/50">
          {author && (
            <div className="flex items-center mr-4">
              {author.metadata.avatar && (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={author.title}
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
              )}
              <span className="text-sm font-medium text-foreground">
                {author.title}
              </span>
            </div>
          )}
          <DateFormatter 
            dateString={post.created_at} 
            className="text-sm text-muted-foreground ml-auto" 
          />
        </div>
      </div>
    </article>
  );
}