import { cn } from '@/lib/utils';
import { FadeIn } from './MotionFadeIn';

// تیتر استاندارد سکشن‌ها — ساختار معنایی H2
export default function SectionHeading({
  overline,
  title,
  description,
  align = 'center',
  dark = false,
}: {
  overline?: string;
  title: string;
  description?: string;
  align?: 'center' | 'start';
  dark?: boolean;
}) {
  return (
    <FadeIn
      className={cn(
        'max-w-2xl mb-12 md:mb-16',
        align === 'center' ? 'mx-auto text-center' : 'text-start'
      )}
    >
      {overline && (
        <p className="inline-flex items-center gap-2 text-teal font-medium text-sm mb-4">
          <span className="w-6 h-0.5 bg-teal rounded-full" aria-hidden />
          {overline}
          {align === 'center' && <span className="w-6 h-0.5 bg-teal rounded-full" aria-hidden />}
        </p>
      )}
      <h2 className={cn('h-title', dark ? 'text-white' : 'text-navy')}>{title}</h2>
      {description && (
        <p className={cn('mt-4 text-lead', dark && 'text-white/60')}>{description}</p>
      )}
    </FadeIn>
  );
}
