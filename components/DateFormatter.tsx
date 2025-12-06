import { format, parseISO } from 'date-fns';

interface DateFormatterProps {
  dateString: string;
  className?: string;
}

export default function DateFormatter({ dateString, className }: DateFormatterProps) {
  if (!dateString) return null;
  
  const date = parseISO(dateString);
  return <time className={className} dateTime={dateString}>{format(date, 'MMMM d, yyyy')}</time>;
}