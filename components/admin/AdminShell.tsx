'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Newspaper,
  Handshake,
  Users,
  MessageSquare,
  Settings,
  Sparkles,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  Globe,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import Logo from '@/components/layout/Logo';

const NAV = [
  { href: '/admin', label: 'داشبورد', icon: LayoutDashboard, exact: true },
  { href: '/admin/posts', label: 'مدیریت مقالات', icon: Newspaper },
  { href: '/admin/services', label: 'مدیریت خدمات', icon: Sparkles },
  { href: '/admin/requests', label: 'درخواست‌ها و رزروها', icon: Handshake },
  { href: '/admin/comments', label: 'دیدگاه‌ها', icon: MessageSquare },
  { href: '/admin/users', label: 'کاربران', icon: Users },
  { href: '/admin/settings', label: 'تنظیمات', icon: Settings },
];

// پوسته پنل مدیریت — سایدبار راست‌چین + دارک‌مود + موبایل drawer
export default function AdminShell({
  children,
  userLabel,
}: {
  children: React.ReactNode;
  userLabel: string;
}) {
  const [drawer, setDrawer] = useState(false);
  const [dark, setDark] = useState(false);
  const pathname = usePathname();

  const links = NAV.map((item) => {
    const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setDrawer(false)}
        className={cn(
          'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
          active
            ? 'bg-teal text-white shadow-glow'
            : 'text-navy-300 hover:bg-navy-50 hover:text-navy'
        )}
      >
        <item.icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
        {item.label}
      </Link>
    );
  });

  return (
    <div className={cn('min-h-screen', dark && 'dark')} dir="rtl">
      <div className="min-h-screen bg-mist dark:bg-navy-950 transition-colors">
        {/* سایدبار دسکتاپ */}
        <aside className="fixed top-0 bottom-0 right-0 z-40 hidden lg:flex w-64 flex-col bg-white dark:bg-navy-900 border-l border-navy-100 dark:border-navy-800 p-4">
          <div className="px-2 py-4 border-b border-navy-100 dark:border-navy-800 mb-4">
            <Logo />
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto" aria-label="منوی مدیریت">
            {links}
          </nav>
          <div className="border-t border-navy-100 dark:border-navy-800 pt-3 space-y-1">
            <Link href="/" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-navy-300 hover:bg-navy-50 transition-colors" target="_blank">
              <Globe className="w-[18px] h-[18px]" />
              مشاهده سایت
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-[18px] h-[18px]" />
              خروج از حساب
            </button>
          </div>
        </aside>

        {/* هدر موبایل */}
        <div className="lg:hidden sticky top-0 z-40 bg-white dark:bg-navy-900 border-b border-navy-100 dark:border-navy-800 px-4 h-16 flex items-center justify-between">
          <button onClick={() => setDrawer(true)} aria-label="باز کردن منو" className="btn-ghost p-2">
            <Menu className="w-6 h-6" />
          </button>
          <Logo />
          <span className="w-10" />
        </div>

        {/* drawer موبایل */}
        <AnimatePresence>
          {drawer && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDrawer(false)}
                className="fixed inset-0 z-50 bg-navy/50 lg:hidden"
              />
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="fixed top-0 bottom-0 right-0 z-50 w-72 bg-white dark:bg-navy-900 p-4 lg:hidden flex flex-col"
              >
                <div className="flex items-center justify-between py-3 border-b border-navy-100 mb-4">
                  <Logo />
                  <button onClick={() => setDrawer(false)} aria-label="بستن منو" className="btn-ghost p-2">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-1 flex-1">{links}</nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* محتوا */}
        <div className="lg:mr-64 min-h-screen flex flex-col">
          {/* بار بالای محتوا */}
          <header className="sticky top-0 z-30 bg-mist/80 dark:bg-navy-950/80 backdrop-blur border-b border-navy-100 dark:border-navy-800 px-4 md:px-8 h-16 flex items-center justify-between">
            <p className="text-sm text-navy-400 dark:text-navy-200">
              خوش آمدید، <span className="font-medium text-navy dark:text-white">{userLabel}</span>
            </p>
            <button
              onClick={() => setDark((v) => !v)}
              className="btn-ghost p-2"
              aria-label={dark ? 'حالت روشن' : 'حالت تاریک'}
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </header>
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
