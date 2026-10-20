'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { postSchema } from '@/lib/validations';
import { logAudit } from '@/lib/audit';
import { stripDangerousHtml, readingTime } from '@/lib/utils';

// بررسی دسترسی ادمین در تمام Server Actions — بدون اعتماد به کلاینت
async function requireAdmin() {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session || !['ADMIN', 'EDITOR'].includes(role ?? '')) {
    throw new Error('دسترسی غیرمجاز');
  }
  return session as { user: { id: string; role: string } };
}

// ─── مقالات ───
export async function upsertPost(formData: FormData) {
  const session = await requireAdmin();

  const raw = Object.fromEntries(formData.entries());
  const parsed = postSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }
  const d = parsed.data;

  // اطمینان از یکتا بودن اسلاگ
  const existing = await db.post.findUnique({ where: { slug: d.slug } });
  const id = formData.get('id') as string | null;
  if (existing && existing.id !== id) {
    return { ok: false, errors: { slug: ['این اسلاگ قبلاً استفاده شده است'] } };
  }

  const data = {
    title: d.title.trim(),
    slug: d.slug,
    excerpt: d.excerpt.trim(),
    content: stripDangerousHtml(d.content), // پاک‌سازی XSS
    coverImage: d.coverImage || null,
    status: d.status,
    seoTitle: d.seoTitle || null,
    seoDescription: d.seoDescription || null,
    focusKeyword: d.focusKeyword || null,
    readingTime: readingTime(d.content),
    categoryId: d.categoryId || null,
    publishedAt: d.status === 'PUBLISHED' ? (id ? undefined : new Date()) : null,
  };

  if (id) {
    await db.post.update({ where: { id }, data });
    await logAudit({ userId: session.user.id, action: 'update', entity: 'post', entityId: id });
  } else {
    const post = await db.post.create({
      data: { ...data, publishedAt: d.status === 'PUBLISHED' ? new Date() : null, authorId: session.user.id },
    });
    await logAudit({ userId: session.user.id, action: 'create', entity: 'post', entityId: post.id });
  }

  revalidatePath('/admin/posts');
  revalidatePath('/blog');
  return { ok: true };
}

export async function deletePost(id: string) {
  const session = await requireAdmin();
  await db.post.delete({ where: { id } });
  await logAudit({ userId: session.user.id, action: 'delete', entity: 'post', entityId: id });
  revalidatePath('/admin/posts');
  revalidatePath('/blog');
}

export async function togglePostStatus(id: string) {
  const session = await requireAdmin();
  const post = await db.post.findUnique({ where: { id } });
  if (!post) return;
  const next = post.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
  await db.post.update({
    where: { id },
    data: { status: next, publishedAt: next === 'PUBLISHED' && !post.publishedAt ? new Date() : post.publishedAt },
  });
  await logAudit({ userId: session.user.id, action: 'status_change', entity: 'post', entityId: id, meta: { status: next } });
  revalidatePath('/admin/posts');
  revalidatePath('/blog');
}

// ─── کاربران (فقط ADMIN) ───
async function requireFullAdmin() {
  const session = await requireAdmin();
  if (session.user.role !== 'ADMIN') throw new Error('فقط مدیر اصلی');
  return session;
}

export async function updateUserRole(userId: string, role: 'USER' | 'EDITOR' | 'ADMIN') {
  const session = await requireFullAdmin();
  if (userId === session.user.id) return; // خود را تنزل رتبه نکن
  await db.user.update({ where: { id: userId }, data: { role } });
  await logAudit({ userId: session.user.id, action: 'update', entity: 'user', entityId: userId, meta: { role } });
  revalidatePath('/admin/users');
}

export async function toggleUserActive(userId: string) {
  const session = await requireFullAdmin();
  if (userId === session.user.id) return;
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) return;
  await db.user.update({ where: { id: userId }, data: { isActive: !user.isActive } });
  await logAudit({ userId: session.user.id, action: 'update', entity: 'user', entityId: userId, meta: { isActive: !user.isActive } });
  revalidatePath('/admin/users');
}

// ─── درخواست‌های مشاوره ───
export async function updateRequestStatus(id: string, status: 'NEW' | 'IN_PROGRESS' | 'DONE') {
  const session = await requireAdmin();
  await db.consultationRequest.update({ where: { id }, data: { status } });
  await logAudit({ userId: session.user.id, action: 'status_change', entity: 'request', entityId: id, meta: { status } });
  revalidatePath('/admin/requests');
}

export async function updateBookingStatus(id: string, status: 'PENDING' | 'CONFIRMED' | 'CANCELLED') {
  const session = await requireAdmin();
  await db.booking.update({ where: { id }, data: { status } });
  await logAudit({ userId: session.user.id, action: 'status_change', entity: 'booking', entityId: id, meta: { status } });
  revalidatePath('/admin/requests');
}

// ─── دیدگاه‌ها ───
export async function approveComment(id: string) {
  const session = await requireAdmin();
  await db.comment.update({ where: { id }, data: { approved: true } });
  await logAudit({ userId: session.user.id, action: 'update', entity: 'comment', entityId: id });
  revalidatePath('/admin/comments');
}

export async function deleteComment(id: string) {
  const session = await requireAdmin();
  await db.comment.delete({ where: { id } });
  await logAudit({ userId: session.user.id, action: 'delete', entity: 'comment', entityId: id });
  revalidatePath('/admin/comments');
}

// ─── تنظیمات سایت ───
export async function saveSetting(key: string, value: Record<string, string>) {
  const session = await requireFullAdmin();
  await db.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
  await logAudit({ userId: session.user.id, action: 'update', entity: 'setting', entityId: key });
  revalidatePath('/admin/settings');
}

// ─── خروجی CSV خبرنامه ───
export async function newsletterCsv(): Promise<string> {
  const session = await requireAdmin();
  const subs = await db.newsletterSubscriber.findMany({ orderBy: { createdAt: 'desc' } });
  await logAudit({ userId: session.user.id, action: 'export', entity: 'newsletter' });
  const rows = subs.map((s) => `${s.email},${s.createdAt.toISOString()}`);
  return ['email,created_at', ...rows].join('\n');
}
