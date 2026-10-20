import { db } from '@/lib/db';
import type { Prisma } from '@prisma/client';

// ثبت لاگ فعالیت ادمین — چه کسی، چه چیزی را تغییر داد
export async function logAudit({
  userId,
  action,
  entity,
  entityId,
  meta,
}: {
  userId?: string;
  action: 'create' | 'update' | 'delete' | 'status_change' | 'export';
  entity: string;
  entityId?: string;
  meta?: Record<string, unknown>;
}) {
  try {
    await db.auditLog.create({
      data: { userId, action, entity, entityId, meta: meta as Prisma.InputJsonValue | undefined },
    });
  } catch (e) {
    // لاگ حساسیت‌زا نیست؛ نیازی به توقف فرآیند اصلی نیست
    console.error('Audit log failed:', e);
  }
}
