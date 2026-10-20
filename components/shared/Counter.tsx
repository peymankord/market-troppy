'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { toFaDigits } from '@/lib/utils';

// شمارنده انیمیشنی — هنگام ورود به دید اجرا می‌شود (یک‌بار)
export default function Counter({
  value,
  suffix = '',
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduceMotion = useReducedMotion();
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 2, bounce: 0 });

  useEffect(() => {
    if (inView && !reduceMotion) motionVal.set(value);
  }, [inView, value, motionVal, reduceMotion]);

  useEffect(() => {
    return spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = toFaDigits(Math.round(v));
    });
  }, [spring]);

  return (
    <span className={className}>
      <span ref={ref}>{reduceMotion ? toFaDigits(value) : toFaDigits(0)}</span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
