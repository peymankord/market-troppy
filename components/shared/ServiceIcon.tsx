import {
  TrendingUp,
  Gauge,
  Fingerprint,
  PenLine,
  Compass,
  Bot,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

// نگاشت نام آیکون به کامپوننت Lucide (ایمن — بدون eval)
const ICONS: Record<string, LucideIcon> = {
  TrendingUp,
  Gauge,
  Fingerprint,
  PenLine,
  Compass,
  Bot,
  Sparkles,
};

export default function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Sparkles;
  return <Icon className={className} aria-hidden />;
}
