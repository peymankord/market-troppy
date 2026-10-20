'use client';

import { useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, CalendarClock, Sparkles, PlayCircle } from 'lucide-react';

// لود تنبل Lottie فقط در کلاینت — سبک و بدون کاهش LCP
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className="w-full aspect-square max-w-sm rounded-full bg-teal/10 animate-pulse" />,
});

import aiAnimation from '@/public/lottie/ai.json';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // پارالاکس بر اساس اسکرول
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 120]);
  const yArt = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduceMotion ? 1 : 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-hero-gradient"
    >
      {/* لایه ذرات نقطه‌ای */}
      <div className="absolute inset-0 bg-dots opacity-60" aria-hidden />
      {/* هاله نور */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-teal/25 blur-[120px]"
        aria-hidden
      />

      <div className="container relative z-10 grid lg:grid-cols-2 gap-14 items-center pt-28 pb-20">
        {/* تایپوگرافی */}
        <motion.div style={{ y: yText, opacity }} className="text-center lg:text-start">
          <motion.p
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/15 text-teal-200 px-4 py-2 text-sm mb-7"
          >
            <Sparkles className="w-4 h-4" />
            مشاوره تخصصی بازاریابی و مدیریت بازاریابی
          </motion.p>

          <motion.h1
            initial={reduceMotion ? undefined : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="h-display text-white"
          >
            از استراتژی تا
            <span className="block text-gradient mt-2">اتوماسیون هوشمند فروش</span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? undefined : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="text-lead text-white/70 max-w-xl mx-auto lg:mx-0 mt-6"
          >
            ما به کسب‌وکارها کمک می‌کنیم با تحلیل داده، برندسازی حرفه‌ای و اتوماسیون‌های
            هوش مصنوعی، فروش و سودآوری خود را به‌صورت پایدار رشد دهند.
          </motion.p>

          {/* CTAها */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-10"
          >
            <Link href="/consultation" className="btn-primary shadow-glow animate-float-y">
              <CalendarClock className="w-5 h-5" />
              رزرو مشاوره رایگان
            </Link>
            <Link
              href="/services/ai-automation"
              className="btn text-white border-2 border-white/25 hover:border-teal hover:text-teal px-6 py-3"
            >
              <PlayCircle className="w-5 h-5" />
              اتوماسیون AI چیست؟
            </Link>
          </motion.div>

          {/* نشانه‌های اعتماد */}
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-2 mt-12 text-white/50 text-sm"
          >
            <span>+۲۰۰ پروژه موفق</span>
            <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden />
            <span>۹۸٪ رضایت مشتری</span>
            <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden />
            <span>۱۲ سال تجربه</span>
          </motion.div>
        </motion.div>

        {/* انیمیشن Lottie هوش مصنوعی */}
        <motion.div
          style={{ y: yArt }}
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="relative flex justify-center"
          aria-hidden
        >
          <div className="relative">
            <Lottie
              animationData={aiAnimation}
              loop
              autoplay={!reduceMotion}
              className="w-72 md:w-96 lg:w-[28rem]"
            />
            <div className="absolute inset-0 -z-10 bg-teal/20 rounded-full blur-3xl scale-75" />
          </div>
        </motion.div>
      </div>

      {/* نشانگر اسکرول */}
      <motion.a
        href="#stats"
        style={{ opacity }}
        className="absolute bottom-6 right-1/2 translate-x-1/2 text-white/50 hover:text-teal transition-colors"
        aria-label="اسکرول به پایین"
      >
        <ArrowDown className="w-6 h-6 animate-bounce" />
      </motion.a>
    </section>
  );
}
