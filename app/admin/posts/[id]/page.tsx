import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import PostForm from '@/components/admin/PostForm';

export default async function EditPostPage({ params }: { params: { id: string } }) {
  let post = null;
  let categories: { id: string; name: string }[] = [];
  try {
    [post, categories] = await Promise.all([
      db.post.findUnique({ where: { id: params.id } }),
      db.category.findMany({ orderBy: { name: 'asc' } }),
    ]);
  } catch {}
  if (!post) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy">ویرایش مقاله</h1>
      <PostForm
        categories={categories}
        defaults={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage,
          status: post.status,
          seoTitle: post.seoTitle,
          seoDescription: post.seoDescription,
          focusKeyword: post.focusKeyword,
          categoryId: post.categoryId,
        }}
      />
    </div>
  );
}
