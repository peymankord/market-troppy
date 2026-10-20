import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import authConfig from '@/auth.config';

// ساخت نمونه Edge-safe از NextAuth (بدون Prisma/bcrypt)
const { auth } = NextAuth(authConfig);

// محافظت از مسیر /admin — فقط نقش‌های ADMIN و EDITOR
export default auth((req) => {
  const role = req.auth?.user?.role;

  if (!req.auth || !['ADMIN', 'EDITOR'].includes(role ?? '')) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*'],
};
