import Link from 'next/link';
import { getAllCategories } from '@/lib/cosmic';

export default async function Header() {
  const categories = await getAllCategories();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
          <span className="bg-primary text-primary-foreground p-1 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
          </span>
          Modern Blog
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/authors" className="text-muted-foreground hover:text-foreground transition-colors">
            Authors
          </Link>
          <div className="h-4 w-px bg-border"></div>
          {categories.slice(0, 4).map((category) => (
            <Link 
              key={category.id} 
              href={`/categories/${category.slug}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {category.title}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          {/* Mobile menu could go here */}
        </div>
      </div>
    </header>
  );
}