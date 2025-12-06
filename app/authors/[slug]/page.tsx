// app/authors/[slug]/page.tsx
import { getAuthor, getPostsByAuthor, getAllAuthors } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';
import Markdown from '@/components/Markdown';

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

export default async function AuthorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await getAuthor(slug);

  if (!author) {
    notFound();
  }

  const posts = await getPostsByAuthor(author.id);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
        {author.metadata.avatar && (
          <img
            src={`${author.metadata.avatar.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
            alt={author.title}
            className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-background shadow-md"
          />
        )}
        <h1 className="text-4xl font-bold mb-4">{author.title}</h1>
        {author.metadata.bio && (
          <div className="prose dark:prose-invert">
            <Markdown content={author.metadata.bio} />
          </div>
        )}
      </div>

      <div className="border-t border-border pt-12">
        <h2 className="text-2xl font-bold mb-8">Posts by {author.title}</h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            {author.title} hasn't published any posts yet.
          </p>
        )}
      </div>
    </div>
  );
}