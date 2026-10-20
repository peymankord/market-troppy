'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { CalendarClock } from 'lucide-react';

// دکمه شناور «رزرو مشاوره رایگان» — در همه صفحات به‌جز خودِ صفحه رزرو
export default function FloatingCTA() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  if (pathname.startsWith('/consultation') || pathname.startsWith('/admin')) return null;

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.4 }}
      className="fixed bottom-5 left-5 z-40"
    >
      <Link
        href="/consultation"
        className="btn-primary shadow-glow text-sm animate-float-y"
        aria-label="رزرو مشاوره رایگان"
      >
        <CalendarClock className="w-4 h-4" />
        رزرو مشاوره رایگان
      </Link>
    </motion.div>
  );
}
