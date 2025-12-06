import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/40 mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-lg font-bold mb-2">Modern Blog</span>
            <p className="text-sm text-muted-foreground text-center md:text-left max-w-xs">
              A showcase of articles, stories, and ideas powered by Cosmic CMS.
            </p>
          </div>
          
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/authors" className="hover:text-foreground transition-colors">Authors</Link>
            <a href="https://www.cosmicjs.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Cosmic</a>
          </nav>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          &copy; {year} Modern Blog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}