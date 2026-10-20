'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import FloatingCTA from './FloatingCTA';
import ChatWidget from './ChatWidget';

/**
 * کروم سایت — برای مسیرهای /admin و /login هدر/فوتر رندر نمی‌شود
 * (پنل مدیریت پوسته اختصاصی خودش را دارد)
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname.startsWith('/admin') || pathname.startsWith('/login');

  if (bare) return <>{children}</>;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-[100] focus:bg-teal focus:text-white focus:px-4 focus:py-2 focus:rounded-full"
      >
        پرش به محتوای اصلی
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingCTA />
      <ChatWidget />
    </>
  );
}
