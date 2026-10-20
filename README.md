# مارکت تروپی | Market Troppy

**«از استراتژی تا اتوماسیون هوشمند فروش»**

وب‌سایت شرکتی حرفه‌ای «شرکت تخصصی مشاوره بازاریابی و مدیریت بازاریابی» — ساخته‌شده با Next.js 14 (App Router)، TypeScript Strict، Tailwind CSS، Prisma + PostgreSQL، NextAuth.js v5 و انیمیشن‌های اسکرولی Framer Motion + GSAP.

---

## 🚀 راه‌اندازی سریع

```bash
# ۱. نصب وابستگی‌ها
npm install

# ۲. ساخت فایل env (حداقل DATABASE_URL و AUTH_SECRET را پر کنید)
cp .env.example .env

# تولید AUTH_SECRET:
openssl rand -base64 32

# ۳. راه‌اندازی PostgreSQL (با Docker - اختیاری)
docker run -d --name troppy-db -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=market_troppy -p 5432:5432 postgres:16

# ۴. ساخت جداول + داده اولیه (ادمین، خدمات، مقاله و کیس نمونه)
npx prisma migrate dev --name init
npm run db:seed

# ۵. اجرای پروژه
npm run dev
```

سایت روی `http://localhost:3000` بالا می‌آید.

### 👤 ورود به پنل مدیریت

پس از seed، به `/login` بروید:

| فیلد | مقدار پیش‌فرض |
|---|---|
| ایمیل | `admin@markettroppy.ir` |
| رمز عبور | `ChangeMe!123` (مقدار `SEED_ADMIN_PASSWORD` در env) |

> ⚠️ حتماً رمز ادمین را بلافاصله پس از دیپلوی تغییر دهید.

---

## 🗺️ معماری و صفحات

```
/                       صفحه اصلی (۸ سکشن موشن‌دار)
/about                  درباره ما — تیم، ماموریت، ارزش‌ها
/services               لیست ۶ خدمت اصلی
/services/[slug]        صفحه جزئیات هر خدمت (+FAQ با اسکیما)
/services/ai-automation صفحه ویژه اتوماسیون هوش مصنوعی ⭐
/blog                   بلاگ (جستجو + دسته‌بندی)
/blog/[slug]            مقاله (اسکیما Article، نویسنده، مرتبط‌ها، دیدگاه)
/case-studies           کیس استادی‌ها با نتایج قابل سنجش
/contact                تماس + فرم مشاوره + نقشه SVG
/consultation           رزرو وقت — تقویم شمسی (بدون وابستگی خارجی، با Intl)
/login                  ورود امن
/admin                  پنل مدیریت (محافظت‌شده با RBAC)
/sitemap.xml            سایت‌مپ خودکار
/robots.txt             ربات‌ها
```

### ساختار پوشه‌ها

```
├── app/                 # صفحات و Route Handlerها (App Router)
│   ├── api/             # auth, consultation, contact, newsletter
│   ├── admin/           # پنل مدیریت
│   └── (صفحات عمومی…)
├── components/
│   ├── layout/          # Header (مگامنو+موبایل), Footer, Breadcrumb, SiteChrome
│   ├── home/            # سکشن‌های صفحه اصلی (Hero, Timeline, AI, …)
│   ├── shared/          # MotionFadeIn, Counter, ServiceIcon, …
│   ├── seo/             # JsonLd
│   ├── forms/           # فرم‌های React Hook Form + Zod
│   ├── consultation/    # تقویم رزرو شمسی
│   └── admin/           # اجزای پنل (Sidebar, Chart, جدول‌ها)
├── lib/                 # db, seo, validations(Zod), rate-limit, mail, audit
├── hooks/useGSAP.ts     # هوک امن GSAP + reduced-motion
├── prisma/schema.prisma # مدل‌های دیتابیس
├── auth.ts / auth.config.ts  # NextAuth v5 (جداسازی Edge-safe)
└── middleware.ts        # محافظت RBAC از /admin
```

---

## 🎨 سیستم طراحی و موشن

- **پالت:** سرمه‌ای `#0F172A` (اصلی)، فیروزه‌ای `#14B8A6` (اکسنت)، سفید، خاکستری روشن `#F8FAFC`
- **فونت:** Vazirmatn **لوکال** (داونلود شده در `public/fonts` — بدون CDN خارجی)
- **RTL کامل:** `dir="rtl"`، `tailwindcss-rtl`، اعداد فارسی (`toFaDigits`)

| سکشن صفحه اصلی | تکنولوژی موشن |
|---|---|
| Hero (تایپوگرافی + پارالاکس + گرادینت متحرک + Lottie) | Framer Motion useScroll + lottie-react |
| آمارها | Counter (spring) هنگام ورود به دید |
| ۶ خدمت | Stagger Animation (whileInView) |
| مسیر موفقیت | GSAP ScrollTrigger **Pin** + خط پیشرفت |
| کارخانه→دیجیتال | GSAP scrub روی SVG (draw + morph) |
| نمونه‌کارها | اسکرول افقی Pin با GSAP |
| نظرات مشتریان | کاروسل Framer Motion (auto) |
| CTA نهایی | گرادینت متحرک CSS |

> همه انیمیشن‌ها `viewport={{ once: true }}`، سبک (60fps) و با رعایت **`prefers-reduced-motion`** هستند.

---

## 🔍 سئو (E-E-A-T)

- متادیتای داینامیک هر صفحه با Metadata API (عنوان ۶۰، توضیح ۱۵۵، canonical، OG، Twitter)
- **JSON-LD:** Organization، WebSite (SearchAction)، Article، FAQPage، BreadcrumbList، Service
- اسلاگ‌های فارسی تمیز: `/blog/استراتژی-افزایش-فروش`
- `sitemap.xml` و `robots.txt` خودکار
- یک H1 در هر صفحه + سلسله‌مراتب H2/H3 معنایی + تصاویر با alt
- Web Vitals: `next/image` (AVIF/WebP)، فونت لوکال با `display: swap`، Lottie با dynamic import
- در هر مقاله: نویسنده + باکس بیو، تاریخ انتشار/بروزرسانی، زمان مطالعه، Related Posts خودکار

> نکته: به‌جای `next-seo`/`next-sitemap` (مناسب Pages Router) از **Metadata API و sitemap.ts بومی** App Router استفاده شده — استاندارد رسمی Next.js 14.

---

## 🔐 امنیت (OWASP)

| تهدید | راهکار پیاده‌شده |
|---|---|
| Broken Access Control | Middleware RBAC روی `/admin` + بررسی مجدد در سرور اکشن‌ها |
| SQL Injection | فقط Prisma Client — بدون raw query |
| XSS | پاک‌سازی HTML (`stripDangerousHtml`)، هدر CSP قوی، escape در ایمیل |
| Brute Force | Rate Limiting روی لاگین و همه فرم‌ها (5/دقیقه) + Honeypot ضد ربات |
| رمز عبور | bcryptjs با **12 salt rounds** — هرگز plain ذخیره نمی‌شود |
| Session | JWT کوتاه‌مدت + کوکی‌های HttpOnly پیش‌فرض NextAuth |
| Headers | HSTS، X-Frame-Options DENY، nosniff، Referrer-Policy، Permissions-Policy |
| لاگ ادمین | جدول `audit_logs` — چه کسی، چه تغییری، چه زمانی |
| Secrets | همه در `.env` (گیت‌ایگنور شده) |

---

## 🛠 پنل مدیریت `/admin`

- **داشبورد:** آمار (مقالات، کاربران، درخواست‌ها) + نمودار بازدید Recharts
- **مقالات:** CRUD کامل، تغییر وضعیت، جستجو، صفحه‌بندی، تنظیمات سئو
- **درخواست‌ها:** وضعیت (جدید/پیگیری/تکمیل) — رزروها (تایید/لغو)
- **دیدگاه‌ها:** تایید/حذف – **کاربران:** تغییر نقش و غیرفعال‌سازی (فقط ADMIN)
- **تنظیمات:** اطلاعات تماس، شبکه‌های اجتماعی، **خروجی CSV خبرنامه**
- سایدبار راست‌چین، دارک‌مود، ریسپانسیو

---

## 📬 پک بازاریابی

- فرم مشاوره (نام، موبایل، حوزه، بودجه، توضیح) → ذخیره DB + ایمیل (Resend)
- تقویم رزرو شمسی با اسلات‌های ۳۰ دقیقه‌ای + جلوگیری از رزرو دوبل
- خبرنامه + خروجی CSV
- ویجت چت شناور (اتصال به تلگرام/واتساپ)
- CTA شناور «رزرو مشاوره رایگان» در همه صفحات

---

## ☁️ دیپلوی (Vercel / Liara)

**Vercel:** متغیرهای env را در پنل تنظیم کنید، مخزن را ایمپورت کنید. برای دیتابیس از Vercel Postgres یا Neon استفاده کنید و `npx prisma migrate deploy` در build command اضافه شود:

```json
{ "scripts": { "build": "prisma migrate deploy && prisma generate && next build" } }
```

**لیارا (Liara.ir):** برنامه Node بسازید، دیتابیس PostgreSQL لیارا را متصل کنید و:

```bash
liara deploy --platform=node --port=3000
```

---

## 📋 اسکریپت‌ها

```bash
npm run dev        # توسعه
npm run build      # بیلد production
npm start          # اجرای production
npm run db:migrate # مایگریشن توسعه
npm run db:seed    # داده اولیه
npm run db:studio  # Prisma Studio
```

---

## ⚠️ نکات مهم

- فونت Vazirmatn لوکال است؛ اگر وزن دیگری خواستید، woff2 آن را در `public/fonts` بگذارید و در `app/layout.tsx` اضافه کنید.
- Rate Limiter فعلی In-Memory است؛ برای دیپلوی چندنمونه‌ای، Upstash Redis را فعال کنید (env آماده است).
- تصویر `about-team.jpg` نمونه استارتر است؛ با عکس واقعی تیم جایگزین کنید. برای تصاویر OG از `public/og-default.jpg` استفاده کنید (1200×630).
