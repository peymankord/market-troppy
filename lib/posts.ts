import { db } from '@/lib/db';

// بیوی نویسندگان (E-E-A-T)
export const AUTHOR_BIOS: Record<string, string> = {
  'تیم تحریریه مارکت تروپی':
    'تیم تحریریه مارکت تروپی از مشاوران ارشد فروش و بازاریابی تشکیل شده؛ با تمرکز بر رشد داده‌محور و اتوماسیون هوشمند برای کسب‌وکارهای ایرانی.',
  'مهندس نیما صدر':
    'نیما صدر، مدیر فناوری و اتوماسیون AI در مارکت تروپی است؛ متخصص طراحی ایجنت‌های هوش مصنوعی و یکپارچه‌سازی سیستم‌های فروش.',
  'دکتر مریم توکلی':
    'دکتر مریم توکلی، مدیر برند و محتواست؛ متخصص استراتژی برند، روایت‌گری و معماری پیام با بیش از ده سال تجربه اجرایی.',
};

export function authorBio(name: string): string {
  return AUTHOR_BIOS[name] ?? AUTHOR_BIOS['تیم تحریریه مارکت تروپی'];
}

// ═════════════════════════════════════════════
// لایه دسترسی به مقالات — با fallback دیتای نمونه
// تا سایت حتی بدون اتصال دیتابیس رندر شود
// ═════════════════════════════════════════════

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  readingTime: number;
  views: number;
  publishedAt: Date | null;
  updatedAt: Date;
  authorName: string;
  categoryName: string | null;
  categorySlug: string | null;
  tags: string[];
};

const SAMPLE_POSTS: BlogPost[] = [
  {
    id: 'sample-1',
    title: '۷ استراتژی اثبات‌شده برای افزایش فروش در سال جاری',
    slug: 'استراتژی-افزایش-فروش',
    excerpt: 'هفت استراتژی عملی و داده‌محور برای افزایش فروش و سودآوری کسب‌وکار شما.',
    content: `<h2>چرا فروش شما متوقف شده است؟</h2><p>بسیاری از کسب‌وکارها پس از یک دوره رشد اولیه دچار رکود فروش می‌شوند. دلیل اصلی معمولاً نبود یک سیستم فروش قابل تکرار است.</p><h2>۱. قیف فروش خود را بشناسید</h2><p>اولین قدم، نقشه‌برداری دقیق از مسیر مشتری است؛ از آشنایی تا خرید و وفاداری.</p><h2>۲. نرخ تبدیل را بهینه کنید</h2><p>بهبود ۱ درصدی نرخ تبدیل می‌تواند ده‌ها درصد به درآمد شما اضافه کند. تست A/B روی صفحات فرود فراموش نشود.</p><h2>۳. اتوماسیون فروش را جدی بگیرید</h2><p>ابزارهای هوش مصنوعی می‌توانند پیگیری لیدها را خودکار کنند و هیچ فرصتی از دست نرود.</p><blockquote>سیستم خوب، آدم‌های معمولی را به نتایج فوق‌العاده می‌رساند.</blockquote><h2>جمع‌بندی</h2><p>رشد فروش حاصل یک روش سیستماتیک است، نه شانس. از قیف شروع کنید، نرخ تبدیل را بهینه کنید و فرآیندها را خودکارسازی کنید.</p>`,
    coverImage: null,
    readingTime: 6,
    views: 1240,
    publishedAt: new Date('2026-09-20'),
    updatedAt: new Date('2026-09-20'),
    authorName: 'تیم تحریریه مارکت تروپی',
    categoryName: 'استراتژی فروش',
    categorySlug: 'استراتژی-فروش',
    tags: ['فروش', 'استراتژی', 'رشد'],
  },
  {
    id: 'sample-2',
    title: 'اتوماسیون هوش مصنوعی فروش؛ راهنمای شروع برای مدیران',
    slug: 'اتوماسیون-هوش-مصنوعی-فروش',
    excerpt: 'چگونه فرآیندهای دستی فروش را به اتوماسیون‌های هوشمند تبدیل کنیم؟ راهنمای گام‌به‌گام.',
    content: `<h2>اتوماسیون فروش یعنی چه؟</h2><p>خودکارسازی کارهای تکراری مانند پاسخ به مشتریان، پیگیری لیدها و گزارش‌گیری با کمک هوش مصنوعی.</p><h2>از کجا شروع کنیم؟</h2><ul><li>فرآیندهای تکراری را فهرست کنید</li><li>یک پایلوت کوچک بسازید (مثلاً چت‌بات پاسخ‌گو)</li><li>نتایج را سنجیده و مقیاس دهید</li></ul><h2>مزیت رقابتی واقعی</h2><p>کسب‌وکارهایی که زودتر خودکارسازی کنند، با هزینه کمتر مشتری بیشتری جذب می‌کنند.</p>`,
    coverImage: null,
    readingTime: 4,
    views: 860,
    publishedAt: new Date('2026-09-28'),
    updatedAt: new Date('2026-09-28'),
    authorName: 'مهندس نیما صدر',
    categoryName: 'هوش مصنوعی',
    categorySlug: 'هوش-مصنوعی',
    tags: ['هوش مصنوعی', 'اتوماسیون'],
  },
  {
    id: 'sample-3',
    title: 'برندسازی چیست و چرا کسب‌وکار شما به آن نیاز دارد؟',
    slug: 'برندسازی-چیست',
    excerpt: 'برند فقط لوگو نیست؛ داستان ذهنی است که مشتری درباره شما با خود حمل می‌کند.',
    content: `<h2>برند چیست؟</h2><p>برند، مجموعه‌ای از تصورات و احساسات مشتری نسبت به کسب‌وکار شماست.</p><h2>چرا برند مهم است؟</h2><p>برند قوی یعنی قیمت‌گذاری آزادتر، مشتری وفادارتر و هزینه بازاریابی کمتر.</p><h2>از کجا شروع کنیم؟</h2><p>از تعریف جایگذاری برند: برای چه کسی، چه وعده‌ای، متفاوت از چه کسی.</p>`,
    coverImage: null,
    readingTime: 5,
    views: 720,
    publishedAt: new Date('2026-10-05'),
    updatedAt: new Date('2026-10-05'),
    authorName: 'دکتر مریم توکلی',
    categoryName: 'برندینگ',
    categorySlug: 'برندینگ',
    tags: ['برندینگ'],
  },
];

function toBlogPost(p: {
  id: string; title: string; slug: string; excerpt: string; content: string;
  coverImage: string | null; readingTime: number; views: number;
  publishedAt: Date | null; updatedAt: Date;
  author: { name: string | null };
  category: { name: string; slug: string } | null;
  tags: { name: string }[];
}): BlogPost {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: p.content,
    coverImage: p.coverImage,
    readingTime: p.readingTime,
    views: p.views,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
    authorName: p.author.name ?? 'تیم مارکت تروپی',
    categoryName: p.category?.name ?? null,
    categorySlug: p.category?.slug ?? null,
    tags: p.tags.map((t) => t.name),
  };
}

export async function getPublishedPosts(opts?: {
  query?: string;
  category?: string;
  tag?: string;
}): Promise<BlogPost[]> {
  try {
    const posts = await db.post.findMany({
      where: {
        status: 'PUBLISHED',
        ...(opts?.query
          ? { OR: [{ title: { contains: opts.query } }, { excerpt: { contains: opts.query } }] }
          : {}),
        ...(opts?.category ? { category: { slug: opts.category } } : {}),
        ...(opts?.tag ? { tags: { some: { slug: opts.tag } } } : {}),
      },
      include: { author: { select: { name: true } }, category: true, tags: true },
      orderBy: { publishedAt: 'desc' },
    });
    if (posts.length === 0 && !opts?.query && !opts?.category && !opts?.tag) return SAMPLE_POSTS;
    return posts.map((p) => toBlogPost(p));
  } catch {
    return SAMPLE_POSTS;
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await db.post.findUnique({
      where: { slug },
      include: { author: { select: { name: true } }, category: true, tags: true },
    });
    if (post && post.status === 'PUBLISHED') {
      // افزایش شمارش بازدید (fire-and-forget)
      db.post.update({ where: { id: post.id }, data: { views: { increment: 1 } } }).catch(() => {});
      return toBlogPost(post);
    }
    return null;
  } catch {
    return SAMPLE_POSTS.find((p) => p.slug === slug) ?? null;
  }
}

// لینک‌سازی داخلی خودکار — مقالات مرتبط بر اساس دسته/تگ
export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const all = await getPublishedPosts();
  return all
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const score = (p: BlogPost) =>
        (p.categorySlug === post.categorySlug ? 2 : 0) +
        p.tags.filter((t) => post.tags.includes(t)).length;
      return score(b) - score(a);
    })
    .slice(0, limit);
}

export async function getCategories() {
  try {
    return await db.category.findMany({ include: { _count: { select: { posts: true } } } });
  } catch {
    return [
      { id: 'c1', name: 'استراتژی فروش', slug: 'استراتژی-فروش', _count: { posts: 1 } },
      { id: 'c2', name: 'هوش مصنوعی', slug: 'هوش-مصنوعی', _count: { posts: 1 } },
      { id: 'c3', name: 'برندینگ', slug: 'برندینگ', _count: { posts: 1 } },
    ];
  }
}
