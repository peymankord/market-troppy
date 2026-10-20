import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

async function main() {
  console.log('🌱 شروع seed دیتابیس...');

  // ─── ادمین اولیه (پسورد با bcrypt + 12 salt rounds) ───
  const adminEmail = (process.env.SEED_ADMIN_EMAIL ?? 'admin@markettroppy.ir').toLowerCase();
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe!123';
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await db.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'مدیر سایت',
      passwordHash,
      role: 'ADMIN',
    },
  });
  console.log('✅ ادمین:', admin.email);

  // ─── ۶ خدمت اصلی ───
  const services = [
    {
      title: 'مشاوره افزایش فروش و سودآوری',
      slug: 'مشاوره-افزایش-فروش',
      summary: 'تحلیل قیف فروش، شناسایی نقاط نشتی درآمد و طراحی مسیر رشد پایدار فروش و سودآوری.',
      description: 'با تحلیل داده‌محور رفتار مشتریان و قیف فروش، نقاط ضعف مسیر خرید را شناسایی کرده و برنامه‌ای عملیاتی برای افزایش نرخ تبدیل، میانگین سبد خرید و درآمد مادام‌العمر مشتری ارائه می‌دهیم.',
      icon: 'TrendingUp',
      order: 1,
      features: JSON.stringify(['تحلیل قیف فروش', 'بهینه‌سازی نرخ تبدیل', 'استراتژی قیمت‌گذاری', 'برنامه رشد درآمد']),
    },
    {
      title: 'افزایش بهره‌وری سازمانی',
      slug: 'افزایش-بهره-وری-سازمانی',
      summary: 'بازطراحی فرآیندها، حذف هدررفت‌ها و ساخت تیم‌های چابک با KPIهای قابل اندازه‌گیری.',
      description: 'فرآیندهای سازمان را نقشه‌برداری و بازطراحی می‌کنیم تا با کمترین منابع، بیشترین خروجی را بگیرید. از تعریف KPI تا ساختار تیمی چابک، همراه شما هستیم.',
      icon: 'Gauge',
      order: 2,
      features: JSON.stringify(['نقشه‌برداری فرآیندها', 'تعریف KPI و OKR', 'بازطراحی ساختار سازمانی', 'آموزش تیم‌ها']),
    },
    {
      title: 'برندسازی (Branding) حرفه‌ای',
      slug: 'برندسازی-حرفه-ای',
      summary: 'از استراتژی برند تا هویت بصری و لحن ارتباطی؛ برندی که در ذهن مشتری ماندگار شود.',
      description: 'با ترکیب تحلیل بازار و روایت‌گری، استراتژی برند، هویت بصری، لحن ارتباطی و معماری برند شما را طراحی می‌کنیم تا در ذهن مشتری جایگاهی ماندگار بسازید.',
      icon: 'Fingerprint',
      order: 3,
      features: JSON.stringify(['استراتژی برند', 'طراحی هویت بصری', 'تدوین لحن ارتباطی', 'پیام‌رسانی برند']),
    },
    {
      title: 'تولید محتوا استراتژیک',
      slug: 'تولید-محتوا-استراتژیک',
      summary: 'تقویم محتوایی هدفمند، سئومحور و هم‌راستا با قیف فروش برای جذب و نگهداشت مشتری.',
      description: 'محتوای شما باید فروش بسازد، نه فقط دیده شود. استراتژی محتوای مبتنی بر سفر مشتری، تقویم انتشار و چارچوب سنجش اثرگذاری طراحی می‌کنیم.',
      icon: 'PenLine',
      order: 4,
      features: JSON.stringify(['استراتژی محتوا', 'تقویم انتشار', 'محتوای سئومحور', 'سنجش اثرگذاری']),
    },
    {
      title: 'تدوین برنامه و استراتژی سازمانی',
      slug: 'استراتژی-سازمانی',
      summary: 'چشم‌انداز، ماموریت و برنامه استراتژیک ۳ تا ۵ ساله با نقشه راه اجرایی روشن.',
      description: 'از تحلیل محیط رقبا و تحلیل SWOT تا تدوین چشم‌انداز و نقشه راه اجرایی — استراتژی‌ای که روی کاغذ نماند و در عملیات روزانه سازمان جاری شود.',
      icon: 'Compass',
      order: 5,
      features: JSON.stringify(['تحلیل SWOT و رقبا', 'تدوین چشم‌انداز و ماموریت', 'نقشه راه اجرایی', 'جلسات راهبردی دوره‌ای']),
    },
    {
      title: 'اتوماسیون هوش مصنوعی فروش',
      slug: 'ai-automation',
      summary: 'تبدیل فرآیندهای دستی فروش و بازاریابی به اتوماسیون‌های هوشمند مبتنی بر AI.',
      description: 'گفت‌وگوهای فروش، پیگیری لیدها، پاسخ به مشتریان و گزارش‌گیری را با ایجنت‌های هوش مصنوعی خودکار می‌کنیم تا تیم شما روی کارهای ارزشمند تمرکز کند.',
      icon: 'Bot',
      order: 6,
      features: JSON.stringify(['چت‌بات فروش هوشمند', 'اتوماسیون پیگیری لید', 'تحلیل مکالمات با AI', 'گزارش‌گیری خودکار']),
    },
  ];

  for (const s of services) {
    await db.service.upsert({ where: { slug: s.slug }, update: {}, create: s });
  }
  console.log('✅ خدمات:', services.length);

  // ─── دسته‌بندی و مقاله نمونه ───
  const cat = await db.category.upsert({
    where: { slug: 'استراتژی-فروش' },
    update: {},
    create: { name: 'استراتژی فروش', slug: 'استراتژی-فروش' },
  });

  await db.post.upsert({
    where: { slug: 'استراتژی-افزایش-فروش' },
    update: {},
    create: {
      title: '۷ استراتژی اثبات‌شده برای افزایش فروش در سال جاری',
      slug: 'استراتژی-افزایش-فروش',
      excerpt: 'در این مقاله هفت استراتژی عملی و داده‌محور برای افزایش فروش و سودآوری کسب‌وکار شما را بررسی می‌کنیم.',
      content: `<h2>چرا فروش شما متوقف شده است؟</h2><p>بسیاری از کسب‌وکارها پس از یک دوره رشد اولیه، دچار رکود فروش می‌شوند. دلیل اصلی معمولاً نبود یک سیستم فروش قابل تکرار است.</p><h2>۱. قیف فروش خود را بشناسید</h2><p>اولین قدم، نقشه‌برداری دقیق از مسیر مشتری است؛ از آشنایی تا خرید و وفاداری.</p><h2>۲. نرخ تبدیل را بهینه کنید</h2><p>بهبود ۱ درصدی نرخ تبدیل می‌تواند ده‌ها درصد به درآمد شما اضافه کند.</p><h2>۳. اتوماسیون فروش را جدی بگیرید</h2><p>ابزارهای هوش مصنوعی می‌توانند پیگیری لیدها را به‌صورت خودکار انجام دهند و هیچ فرصتی از دست نرود.</p>`,
      status: 'PUBLISHED',
      seoTitle: '۷ استراتژی افزایش فروش | Market Troppy',
      seoDescription: 'با ۷ استراتژی داده‌محور و عملی، فروش و سودآوری کسب‌وکارتان را افزایش دهید. مشاوره تخصصی فروش و بازاریابی.',
      focusKeyword: 'استراتژی افزایش فروش',
      readingTime: 6,
      publishedAt: new Date(),
      authorId: admin.id,
      categoryId: cat.id,
    },
  });
  console.log('✅ مقاله نمونه ایجاد شد');

  // ─── نمونه‌کار نمونه ───
  await db.caseStudy.upsert({
    where: { slug: 'رشد-فروش-فروشگاه-آرمیس' },
    update: {},
    create: {
      title: 'رشد ۶۵٪ فروش فروشگاه اینترنتی آرمیس',
      slug: 'رشد-فروش-فروشگاه-آرمیس',
      client: 'فروشگاه آرمیس',
      industry: 'تجارت الکترونیک',
      summary: 'با بازطراحی قیف فروش و اتوماسیون پیگیری مشتریان، نرخ تبدیل فروشگاه آرمیس در ۶ ماه ۶۵٪ رشد کرد.',
      results: JSON.stringify([
        { label: 'رشد فروش', value: '۶۵٪+' },
        { label: 'کاهش هزینه جذب مشتری', value: '۴۰٪' },
        { label: 'افزایش مشتریان وفادار', value: '۲.۳ برابر' },
      ]),
    },
  });
  console.log('✅ کیس استادی نمونه ایجاد شد');

  // ─── تنظیمات پیش‌فرض سایت ───
  const settings: Record<string, unknown> = {
    contact: {
      phone: '۰۲۱-۲۸۴۲۱۲۳۴',
      email: 'info@markettroppy.ir',
      address: 'تهران، خیابان ولیعصر، بالاتر از پارک ساعی، برج نگین، طبقه ۱۲',
    },
    social: {
      instagram: 'https://instagram.com/markettroppy',
      linkedin: 'https://linkedin.com/company/markettroppy',
      telegram: 'https://t.me/markettroppy',
      whatsapp: 'https://wa.me/989120000000',
    },
  };
  for (const [key, value] of Object.entries(settings)) {
    await db.siteSetting.upsert({
      where: { key },
      update: { value: value as object },
      create: { key, value: value as object },
    });
  }
  console.log('✅ تنظیمات سایت ذخیره شد');
  console.log('🎉 seed با موفقیت انجام شد!');
}

main()
  .catch((e) => {
    console.error('❌ خطا در seed:', e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
