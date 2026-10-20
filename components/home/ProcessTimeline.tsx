'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';
import { Search, Map, Rocket, Bot } from 'lucide-react';
import { PROCESS_STEPS } from '@/lib/constants';

const STEP_ICONS = [Search, Map, Rocket, Bot];

/**
 * سکشن «مسیر موفقیت» — تایم‌لاین عمودی با GSAP ScrollTrigger
 * - پنل سمت راست روی دسکتاپ Pin می‌شود
 * - خط پیشرفت با اسکرول پر می‌شود
 * - هر مرحله با ورود به دید فعال می‌شود
 */
export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      // Pin فقط روی دسکتاپ
      mm.add('(min-width: 1024px)', () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 100px',
          end: 'bottom bottom-=200',
          pin: panelRef.current,
          pinSpacing: false,
        });
      });

      // خط پیشرفت عمودی با scrub
      if (lineRef.current && stepsRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top',
            ease: 'none',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: 0.5,
            },
          }
        );
      }

      // ظاهر شدن مراحل یکی‌یکی
      const steps = gsap.utils.toArray<HTMLElement>('.process-step');
      steps.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 78%', once: true },
          }
        );
        // فعال شدن گره دایره‌ای
        const node = step.querySelector('.process-node');
        if (node) {
          ScrollTrigger.create({
            trigger: step,
            start: 'top 65%',
            once: true,
            onEnter: () => node.classList.add('is-active'),
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="section-pad bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-40" aria-hidden />
      <div className="container relative">
        <div className="grid lg:grid-cols-5 gap-14">
          {/* پنل Pin شونده */}
          <div className="lg:col-span-2">
            <div ref={panelRef}>
              <p className="inline-flex items-center gap-2 text-teal font-medium text-sm mb-4">
                <span className="w-6 h-0.5 bg-teal rounded-full" aria-hidden />
                روش کار ما
              </p>
              <h2 className="h-title text-white mb-5">مسیر موفقیت در ۴ گام</h2>
              <p className="text-white/60 leading-8 mb-8">
                فرآیند شفاف و ساخت‌یافته است؛ از جلسه کشف تا اتوماسیون هوشمند، در هر مرحله
                می‌دانید چه اتفاقی در حال رخ دادن است و چرا.
              </p>
              <div className="hidden lg:block card bg-white/5 border-white/10 p-6 backdrop-blur">
                <p className="text-teal text-sm font-medium mb-1">مدت متوسط همکاری</p>
                <p className="text-white text-2xl font-bold">۳ تا ۹ ماه</p>
                <p className="text-white/50 text-sm mt-2 leading-6">
                  با گزارش شفاف هفتگی و جلسات مدیریتی ماهانه
                </p>
              </div>
            </div>
          </div>

          {/* لیست مراحل */}
          <div className="lg:col-span-3 relative">
            {/* ریل خط پیشرفت */}
            <div
              className="absolute top-0 bottom-0 right-[27px] w-0.5 bg-white/10 rounded-full"
              aria-hidden
            >
              <div ref={lineRef} className="w-full h-full bg-teal rounded-full" />
            </div>

            <ol ref={stepsRef} className="space-y-10">
              {PROCESS_STEPS.map((step, i) => {
                const Icon = STEP_ICONS[i];
                return (
                  <li key={step.step} className="process-step relative flex gap-6 ps-0">
                    {/* گره */}
                    <div className="process-node relative z-10 w-14 h-14 shrink-0 rounded-full bg-white/5 border-2 border-white/15 flex items-center justify-center text-white/60 transition-all duration-500 [&.is-active]:bg-teal [&.is-active]:border-teal [&.is-active]:text-white [&.is-active]:shadow-glow">
                      <Icon className="w-6 h-6" aria-hidden />
                    </div>
                    <div className="pt-1 pb-2">
                      <span className="text-teal/70 font-bold text-sm tracking-widest">
                        مرحله {step.step}
                      </span>
                      <h3 className="text-white text-xl font-bold mt-1.5 mb-2">{step.title}</h3>
                      <p className="text-white/55 leading-8 text-sm md:text-base max-w-lg">
                        {step.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
