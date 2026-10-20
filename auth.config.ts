import type { NextAuthConfig } from 'next-auth';

/**
 * پیکربندی Edge-safe احراز هویت — بدون Prisma و bcrypt
 * این فایل در middleware (محیط Edge) استفاده می‌شود.
 * پر‌کردن providers در auth.ts انجام می‌شود.
 */
export const authConfig = {
  pages: { signIn: '/login' },
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 * 7 }, // JWT — ۷ روز
  providers: [],
  callbacks: {
    // تزریق نقش کاربر به JWT و Session (برای RBAC) — بدون کوئری دیتابیس
    jwt({ token, user }) {
      if (user) token.role = user.role ?? 'USER';
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        if (token.sub) session.user.id = token.sub;
        session.user.role = (token.role as 'ADMIN' | 'EDITOR' | 'USER' | undefined) ?? 'USER';
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;
