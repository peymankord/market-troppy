import { DefaultSession } from 'next-auth';

// افزودن نقش کاربر به تایپ‌های NextAuth v5 (RBAC)
declare module 'next-auth' {
  interface User {
    role?: 'ADMIN' | 'EDITOR' | 'USER';
  }
  interface Session {
    user: {
      id?: string;
      role?: 'ADMIN' | 'EDITOR' | 'USER';
    } & DefaultSession['user'];
  }
}

// NextAuth v5 داخلی از @auth/core استفاده می‌کند
declare module '@auth/core/jwt' {
  interface JWT {
    role?: 'ADMIN' | 'EDITOR' | 'USER';
  }
}
