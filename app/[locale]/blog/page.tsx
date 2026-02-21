import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { t } from '@/lib/i18n/config';

export default async function Blog({ params }: { params: { locale: string } }) {
  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: 'desc' } });
  return <div className="container py-12"><h1 className="text-4xl mb-6">Блог</h1><div className="grid md:grid-cols-3 gap-4">{posts.map((p)=><Link key={p.id} href={`/${params.locale}/blog/${p.slug}`} className="border p-4">{t(params.locale,{ru:p.titleRu,en:p.titleEn})}</Link>)}</div></div>;
}
