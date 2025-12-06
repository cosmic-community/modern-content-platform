import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface MarkdownProps {
  content: string;
  className?: string;
}

export default function Markdown({ content, className }: MarkdownProps) {
  return (
    <div className={cn("prose prose-lg dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        components={{
          img: ({ node, ...props }) => (
            <img {...props} className="rounded-lg shadow-md my-8 w-full object-cover" loading="lazy" />
          ),
          a: ({ node, ...props }) => (
            <a {...props} className="text-primary hover:text-primary/80 underline decoration-2 underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}