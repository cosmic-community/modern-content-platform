import { getAllAuthors } from '@/lib/cosmic';
import AuthorCard from '@/components/AuthorCard';

export default async function AuthorsPage() {
  const authors = await getAllAuthors();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Our Authors</h1>
        <p className="text-muted-foreground text-lg">
          Meet the brilliant minds behind our stories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {authors.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>
    </div>
  );
}