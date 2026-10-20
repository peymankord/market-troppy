import Link from 'next/link';

// لوگوی تایپوگرافیک Market Troppy
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 group"
      aria-label="Market Troppy — صفحه اصلی"
    >
      <span className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-teal to-navy flex items-center justify-center text-white font-bold text-lg shadow-glow group-hover:scale-105 transition-transform">
        M
        <span className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-teal animate-pulse" />
      </span>
      <span className="leading-tight">
        <span className={`block font-bold text-lg ${light ? 'text-white' : 'text-navy'}`}>
          مارکت <span className="text-teal">تروپی</span>
        </span>
        <span
          className={`block text-[10px] tracking-wider ${light ? 'text-white/60' : 'text-navy-300'}`}
          dir="ltr"
        >
          market troppy
        </span>
      </span>
    </Link>
  );
}
