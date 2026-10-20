'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, CalendarClock, ArrowLeft } from 'lucide-react';
import { NAV_ITEMS, SERVICES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // سایه و پس‌زمینه هدر هنگام اسکرول
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // با تغییر مسیر، مگامنو بسته شود
  useEffect(() => setMegaOpen(false), [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-navy-100 shadow-soft'
          : 'bg-transparent'
      )}
    >
      <div className="container">
        <nav className="relative flex items-center justify-between h-20" aria-label="ناوبری اصلی">
          <Logo />

          {/* ناوبری دسکتاپ */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.mega && setMegaOpen(true)}
                  onMouseLeave={() => item.mega && setMegaOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'btn-ghost gap-1 text-sm',
                      active && 'text-teal bg-teal-50'
                    )}
                    aria-expanded={item.mega ? megaOpen : undefined}
                  >
                    {item.label}
                    {item.mega && (
                      <ChevronDown
                        className={cn('w-4 h-4 transition-transform', megaOpen && 'rotate-180')}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA دسکتاپ + همبرگر موبایل */}
          <div className="flex items-center gap-3">
            <Link href="/consultation" className="btn-primary hidden lg:inline-flex text-sm">
              <CalendarClock className="w-4 h-4" />
              رزرو مشاوره رایگان
            </Link>
            <MobileMenu />
          </div>

          {/* ══════ مگامنو خدمات ══════ */}
          <AnimatePresence>
            {megaOpen && (
              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
                className="hidden lg:block absolute top-full right-1/2 translate-x-1/2 pt-3 w-[720px] max-w-[90vw]"
              >
                <div className="card p-6 grid grid-cols-2 gap-2 bg-white/95 backdrop-blur-xl">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${encodeURIComponent(s.slug)}`}
                      className="group flex items-start gap-3 rounded-xl p-3 hover:bg-teal-50 transition-colors"
                    >
                      <span className="mt-0.5 w-2 h-2 rounded-full bg-teal/40 group-hover:bg-teal transition-colors shrink-0" />
                      <span>
                        <span className="block font-medium text-navy group-hover:text-teal transition-colors text-sm">
                          {s.title}
                        </span>
                        <span className="block text-xs text-navy-300 mt-1 leading-5">
                          {s.summary}
                        </span>
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className="col-span-2 mt-2 flex items-center justify-center gap-2 rounded-xl bg-navy text-white py-3 text-sm hover:bg-navy-700 transition-colors"
                  >
                    مشاهده همه خدمات
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
}
