import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { db } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limit';
import authConfig from '@/auth.config';

const credentialsSchema = z.object({
  email: z.string().email().max(200),
  password: z.string().min(1).max(100),
});

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  providers: [
    // ورود با گوگل (در صورت تنظیم کلیدها فعال می‌شود)
    ...(process.env.AUTH_GOOGLE_ID
      ? [Google({ allowDangerousEmailAccountLinking: false })]
      : []),
    // ورود با ایمیل و رمز عبور
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        // اعتبارسنجی سمت سرور با Zod
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const emailNorm = email.toLowerCase().trim();

        // Rate Limiting: جلوگیری از حمله Brute Force روی لاگین
        const limit = checkRateLimit(`login:${emailNorm}`, 5, 60_000);
        if (!limit.ok) return null;

        const user = await db.user.findUnique({ where: { email: emailNorm } });
        if (!user || !user.passwordHash || !user.isActive) return null;

        // مقایسه امن با bcrypt — هرگز پسورد plain ذخیره نمی‌شود
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return { id: user.id, email: user.email, name: user.name, image: user.image, role: user.role };
      },
    }),
  ],
});
