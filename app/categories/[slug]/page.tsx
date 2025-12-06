// app/categories/[slug]/page.tsx
import { getCategory, getPostsByCategory, getAllCategories } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import PostCard from '@/components/PostCard';

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.id);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <div className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold mb-4">
          Category
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">{category.title}</h1>
        {category.metadata.description && (
          <p className="text-muted-foreground text-lg">
            {category.metadata.description}
          </p>
        )}
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-xl">
          <p className="text-muted-foreground">No posts found in this category yet.</p>
        </div>
      )}
    </div>
  );
}