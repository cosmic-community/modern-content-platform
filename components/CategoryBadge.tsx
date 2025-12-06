import Link from 'next/link';
import { Category } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CategoryBadgeProps {
  category: Category;
  className?: string;
}

export default function CategoryBadge({ category, className }: CategoryBadgeProps) {
  if (!category) return null;

  return (
    <Link 
      href={`/categories/${category.slug}`}
      className={cn(
        "inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80",
        className
      )}
    >
      {category.title}
    </Link>
  );
}