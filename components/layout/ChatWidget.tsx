'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, MessageSquare } from 'lucide-react';

// ویجت چت شناور — UI آماده؛ دکمه‌ها به تلگرام/واتساپ متصل می‌شوند
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="card w-72 overflow-hidden"
            role="dialog"
            aria-label="گفت‌وگوی آنلاین"
          >
            <div className="bg-navy text-white p-4">
              <p className="font-bold text-sm">با ما گفت‌وگو کنید</p>
              <p className="text-xs text-white/60 mt-1">
                معمولاً در کمتر از ۵ دقیقه پاسخ می‌دهیم.
              </p>
            </div>
            <div className="p-4 space-y-2">
              <a
                href="https://t.me/markettroppy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-navy-100 p-3 hover:border-teal hover:bg-teal-50 transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-teal-50 text-teal flex items-center justify-center">
                  <Send className="w-4 h-4" />
                </span>
                <span className="text-sm">
                  <span className="block font-medium text-navy">تلگرام</span>
                  <span className="block text-xs text-navy-300">@markettroppy</span>
                </span>
              </a>
              <a
                href="https://wa.me/989120000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-navy-100 p-3 hover:border-teal hover:bg-teal-50 transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-teal-50 text-teal flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </span>
                <span className="text-sm">
                  <span className="block font-medium text-navy">واتساپ</span>
                  <span className="block text-xs text-navy-300">پاسخ‌گویی ۹ تا ۱۸</span>
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'بستن گفت‌وگو' : 'شروع گفت‌وگوی آنلاین'}
        aria-expanded={open}
        className="relative w-14 h-14 rounded-full bg-teal text-white shadow-glow flex items-center justify-center hover:bg-teal-600 hover:scale-105 transition-all"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-teal/40 animate-pulse-ring" aria-hidden />
        )}
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
