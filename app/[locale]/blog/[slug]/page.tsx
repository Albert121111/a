import { prisma } from '@/lib/prisma';
import { t } from '@/lib/i18n/config';

export default async function PostPage({ params }: { params: { locale: string; slug: string } }) {
  const post = await prisma.blogPost.findUniqueOrThrow({ where: { slug: params.slug } });
  return <article className="container py-12"><h1 className="text-4xl">{t(params.locale,{ru:post.titleRu,en:post.titleEn})}</h1><p className="mt-6">{t(params.locale,{ru:post.contentRu,en:post.contentEn})}</p></article>;
}
