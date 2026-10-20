'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Quote, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';
import SectionHeading from '@/components/shared/SectionHeading';
import { cn } from '@/lib/utils';

// کاروسل نرم نظرات مشتریان — پیشروی خودکار + درگ
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const reduceMotion = useReducedMotion();

  const go = useCallback((next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(((next % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, [index]);

  // پیشروی خودکار هر ۶ ثانیه (توقف با کاهش موشن)
  useEffect(() => {
    if (reduceMotion) return;
    const t = setInterval(() => go(index + 1), 6000);
    return () => clearInterval(t);
  }, [index, go, reduceMotion]);

  const t = TESTIMONIALS[index];

  return (
    <section className="section-pad bg-white" aria-labelledby="testimonials-heading">
      <div className="container max-w-4xl">
        <div id="testimonials-heading">
          <SectionHeading overline="نظرات مشتریان" title="اعتماد، با نتیجه ساخته می‌شود" />
        </div>

        <div className="relative">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={index}
              custom={dir}
              initial={reduceMotion ? undefined : { opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="card p-8 md:p-12 text-center"
            >
              <Quote className="w-10 h-10 text-teal/20 mx-auto mb-6" aria-hidden />
              <blockquote className="text-lg md:text-2xl leading-relaxed md:leading-relaxed text-navy font-medium">
                «{t.text}»
              </blockquote>
              <div className="flex items-center justify-center gap-1 mt-6" aria-label="امتیاز ۵ از ۵">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-teal text-teal" aria-hidden />
                ))}
              </div>
              <figcaption className="mt-4">
                <p className="font-bold text-navy">{t.name}</p>
                <p className="text-sm text-navy-300">{t.role}</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          {/* کنترل‌ها */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => go(index - 1)}
              className="w-10 h-10 rounded-full border border-navy-200 flex items-center justify-center text-navy-400 hover:border-teal hover:text-teal transition-colors"
              aria-label="نظر قبلی"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`نظر ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    i === index ? 'w-8 bg-teal' : 'w-2 bg-navy-200 hover:bg-navy-300'
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => go(index + 1)}
              className="w-10 h-10 rounded-full border border-navy-200 flex items-center justify-center text-navy-400 hover:border-teal hover:text-teal transition-colors"
              aria-label="نظر بعدی"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
