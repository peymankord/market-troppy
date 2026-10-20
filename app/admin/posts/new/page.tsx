import { db } from '@/lib/db';
import PostForm from '@/components/admin/PostForm';

export default async function NewPostPage() {
  let categories: { id: string; name: string }[] = [];
  try {
    categories = await db.category.findMany({ orderBy: { name: 'asc' } });
  } catch {}

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy">مقاله جدید</h1>
      <PostForm categories={categories} />
    </div>
  );
}
