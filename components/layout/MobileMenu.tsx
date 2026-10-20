'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, CalendarClock } from 'lucide-react';
import { NAV_ITEMS, SERVICES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Logo from './Logo';

// منوی همبرگری موبایل با انیمیشن کشویی
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        className="btn-ghost p-2"
        aria-label="باز کردن منو"
        aria-expanded={open}
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* پس‌زمینه تیره */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-50 bg-navy/50 backdrop-blur-sm"
              aria-hidden
            />
            {/* پنل کشویی از سمت راست */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 bottom-0 right-0 z-50 w-80 max-w-[85vw] bg-white shadow-soft-lg flex flex-col"
              role="dialog"
              aria-label="منوی موبایل"
            >
              <div className="flex items-center justify-between p-4 border-b border-navy-100">
                <Logo />
                <button onClick={close} className="btn-ghost p-2" aria-label="بستن منو">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4" aria-label="ناوبری موبایل">
                <ul className="space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const active =
                      item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                    if (item.mega) {
                      return (
                        <li key={item.href}>
                          <button
                            onClick={() => setServicesOpen((v) => !v)}
                            className={cn(
                              'w-full flex items-center justify-between rounded-xl px-4 py-3 font-medium transition-colors',
                              active ? 'bg-teal-50 text-teal' : 'text-navy hover:bg-navy-50'
                            )}
                            aria-expanded={servicesOpen}
                          >
                            {item.label}
                            <ChevronDown
                              className={cn('w-4 h-4 transition-transform', servicesOpen && 'rotate-180')}
                            />
                          </button>
                          <AnimatePresence>
                            {servicesOpen && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden mr-4 border-r-2 border-teal/20 space-y-1"
                              >
                                {SERVICES.map((s) => (
                                  <li key={s.slug}>
                                    <Link
                                      href={`/services/${encodeURIComponent(s.slug)}`}
                                      onClick={close}
                                      className="block px-4 py-2 text-sm text-navy-400 hover:text-teal transition-colors"
                                    >
                                      {s.title}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    }
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={close}
                          className={cn(
                            'block rounded-xl px-4 py-3 font-medium transition-colors',
                            active ? 'bg-teal-50 text-teal' : 'text-navy hover:bg-navy-50'
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="p-4 border-t border-navy-100">
                <Link href="/consultation" onClick={close} className="btn-primary w-full">
                  <CalendarClock className="w-4 h-4" />
                  رزرو مشاوره رایگان
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
