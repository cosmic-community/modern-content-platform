// app/posts/[slug]/page.tsx
import { getPost, getAllPosts } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import Markdown from '@/components/Markdown';
import DateFormatter from '@/components/DateFormatter';
import CategoryBadge from '@/components/CategoryBadge';
import Link from 'next/link';

// Helper for generating static params
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const { title, metadata, created_at } = post;
  const author = metadata.author;
  const categories = metadata.categories || [];

  return (
    <article className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
      <div className="mb-8 text-center">
        <div className="flex justify-center gap-2 mb-6">
          {categories.map((category) => (
            <CategoryBadge key={category.id} category={category} className="px-3 py-1 text-sm" />
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6">
          {title}
        </h1>
        
        <div className="flex items-center justify-center gap-4 text-muted-foreground">
          {author && (
            <Link href={`/authors/${author.slug}`} className="flex items-center hover:text-foreground transition-colors">
              {author.metadata.avatar && (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=40&h=40&fit=crop&auto=format,compress`}
                  alt={author.title}
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
              )}
              <span className="font-medium">{author.title}</span>
            </Link>
          )}
          <span>•</span>
          <DateFormatter dateString={created_at} />
        </div>
      </div>

      {metadata.hero_image && (
        <div className="rounded-xl overflow-hidden mb-12 shadow-lg">
          <img
            src={`${metadata.hero_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert mx-auto">
        {metadata.content ? (
           <Markdown content={metadata.content} />
        ) : (
           <p>No content available.</p>
        )}
      </div>

      {author && (
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-muted/30 p-8 rounded-xl">
            {author.metadata.avatar && (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                alt={author.title}
                className="w-24 h-24 rounded-full object-cover border-2 border-background shadow-sm"
              />
            )}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold mb-2">About {author.title}</h3>
              <p className="text-muted-foreground mb-4">{author.metadata.bio}</p>
              <Link href={`/authors/${author.slug}`} className="text-primary font-medium hover:underline">
                View all posts by {author.title} →
              </Link>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}