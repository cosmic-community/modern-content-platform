import { getAllPosts } from '@/lib/cosmic';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

export default async function Home() {
  const posts = await getAllPosts();
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {/* Featured Section */}
      {featuredPost && (
        <section className="mb-16">
          <h2 className="sr-only">Featured Post</h2>
          <PostCard post={featuredPost} featured={true} />
        </section>
      )}

      {/* Recent Posts Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Recent Articles</h2>
          <Link href="/categories/technology" className="text-sm font-medium text-primary hover:underline">
            View All
          </Link>
        </div>
        
        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No more posts found. Check back soon!
          </div>
        )}
      </section>
    </div>
  );
}