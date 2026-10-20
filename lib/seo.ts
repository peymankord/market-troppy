import type { Metadata } from 'next';

export const SITE = {
  name: 'Market Troppy | مارکت تروپی',
  shortName: 'مارکت تروپی',
  slogan: 'از استراتژی تا اتوماسیون هوشمند فروش',
  description:
    'شرکت تخصصی مشاوره بازاریابی و مدیریت بازاریابی — افزایش فروش، بهره‌وری سازمانی، برندسازی، تولید محتوا و اتوماسیون هوش مصنوعی فروش.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  locale: 'fa_IR',
} as const;

/** ساخت Metadata استاندارد برای هر صفحه */
export function buildMetadata({
  title,
  description,
  path = '/',
  image,
  noIndex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const url = `${SITE.url}${path}`;
  const ogImage = image ?? '/og-default.jpg';
  return {
    title: `${title} | ${SITE.shortName}`,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(type === 'article' ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

// ─── سازندگان JSON-LD (Schema.org) ───

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.shortName,
    alternateName: 'Market Troppy',
    url: SITE.url,
    slogan: SITE.slogan,
    description: SITE.description,
    areaServed: 'IR',
    '@id': `${SITE.url}/#organization`,
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    inLanguage: 'fa-IR',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function articleJsonLd(post: {
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  publishedAt?: string | Date | null;
  updatedAt?: string | Date | null;
  authorName?: string | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? [`${SITE.url}${post.coverImage}`] : undefined,
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
    inLanguage: 'fa-IR',
    author: {
      '@type': 'Person',
      name: post.authorName ?? SITE.shortName,
    },
    publisher: { '@id': `${SITE.url}/#organization` },
    mainEntityOfPage: `${SITE.url}/blog/${encodeURIComponent(post.slug)}`,
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.url}`,
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function serviceJsonLd(service: {
  title: string;
  slug: string;
  summary: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    url: `${SITE.url}/services/${encodeURIComponent(service.slug)}`,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: 'IR',
  };
}
