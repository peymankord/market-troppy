import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';
import { breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export type Crumb = { name: string; href?: string };

// بردکرامب با اسکیمای BreadcrumbList
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: 'خانه', href: '/' }, ...items];
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          all.map((c) => ({ name: c.name, url: c.href ?? '#' }))
        )}
      />
      <nav aria-label="مسیر صفحه" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-navy-300">
          {all.map((crumb, i) => {
            const isLast = i === all.length - 1;
            return (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronLeft className="w-3.5 h-3.5 text-navy-200" aria-hidden />}
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-teal transition-colors inline-flex items-center gap-1"
                  >
                    {i === 0 && <Home className="w-3.5 h-3.5" aria-hidden />}
                    {crumb.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-teal font-medium">
                    {crumb.name}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
