// رندر امن JSON-LD — داده‌ها فقط از توابع سازنده داخلی می‌آیند (بدون ورودی کاربر)
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'), // جلوگیری از خروج از تگ script
      }}
    />
  );
}
