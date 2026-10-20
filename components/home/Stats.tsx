import { STATS } from '@/lib/constants';
import Counter from '@/components/shared/Counter';
import { Stagger, StaggerItem } from '@/components/shared/MotionFadeIn';

// سکشن آمار — Counter Animation هنگام اسکرول
export default function Stats() {
  return (
    <section id="stats" className="section-pad bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-dots-dark opacity-50" aria-hidden />
      <div className="container relative">
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" staggerDelay={0.12}>
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="card card-hover p-6 md:p-8 text-center">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="block text-4xl md:text-5xl font-bold text-teal tabular-nums"
                />
                <p className="mt-3 text-navy-400 text-sm md:text-base">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
