import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { toFaDigits, cn } from '@/lib/utils';

// صفحه‌بندی جداول پنل
export default function Pagination({
  page,
  pages,
  basePath,
  query,
}: {
  page: number;
  pages: number;
  basePath: string;
  query?: string;
}) {
  if (pages <= 1) return null;
  const mk = (p: number) => `${basePath}?page=${p}${query ? `&q=${encodeURIComponent(query)}` : ''}`;

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="صفحه‌بندی">
      <Link
        href={mk(Math.max(1, page - 1))}
        aria-disabled={page === 1}
        className={cn('btn-outline !px-3 !py-2 text-sm', page === 1 && 'opacity-40 pointer-events-none')}
      >
        <ChevronRight className="w-4 h-4" />
      </Link>
      {Array.from({ length: pages }).slice(0, 7).map((_, i) => (
        <Link
          key={i}
          href={mk(i + 1)}
          aria-current={page === i + 1}
          className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
            page === i + 1 ? 'bg-teal text-white' : 'border border-navy-200 text-navy-400 hover:border-teal'
          )}
        >
          {toFaDigits(i + 1)}
        </Link>
      ))}
      <Link
        href={mk(Math.min(pages, page + 1))}
        aria-disabled={page === pages}
        className={cn('btn-outline !px-3 !py-2 text-sm', page === pages && 'opacity-40 pointer-events-none')}
      >
        <ChevronLeft className="w-4 h-4" />
      </Link>
    </nav>
  );
}
