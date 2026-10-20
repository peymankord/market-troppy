'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

type Options = { scope?: React.RefObject<HTMLElement | null> };

/**
 * هوک امن GSAP برای React — با gsap.context و revert خودکار
 * اگر کاربر prefers-reduced-motion داشته باشد، هیچ انیمیشی ثبت نمی‌شود
 */
export function useGSAP(callback: () => void, options?: Options) {
  const { scope } = options ?? {};
  const done = useRef(false);

  useLayoutEffect(() => {
    if (done.current) return;
    done.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(callback, scope ?? undefined);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
