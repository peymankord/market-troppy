'use client';

import { useTransition } from 'react';
import { newsletterCsv } from '@/lib/admin/actions';
import { Download, Loader2 } from 'lucide-react';

// دانلود CSV اعضای خبرنامه
export default function NewsletterExportButton() {
  const [pending, startTransition] = useTransition();

  const download = () => {
    startTransition(async () => {
      const csv = await newsletterCsv();
      const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' }); // BOM برای Excel فارسی
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `newsletter-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <button onClick={download} disabled={pending} className="btn-outline text-sm">
      {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
      خروجی CSV خبرنامه
    </button>
  );
}
