import { HeroSlider } from '@/components/home/HeroSlider';
import { prisma } from '@/lib/prisma';
import { t } from '@/lib/i18n/config';
import Link from 'next/link';

export default async function Home({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const [slides, trainers, reviews, posts, sessions] = await Promise.all([
    prisma.heroSlide.findMany({ where: { active: true }, take: 4 }),
    prisma.trainer.findMany({ take: 4 }),
    prisma.review.findMany({ take: 6 }),
    prisma.blogPost.findMany({ take: 3, orderBy: { publishedAt: 'desc' } }),
    prisma.classSession.findMany({ take: 5, include: { classType: true } })
  ]);

  return (
    <div>
      <HeroSlider locale={locale} slides={slides.map((s) => ({ id: s.id, title: t(locale, { ru: s.titleRu, en: s.titleEn }), subtitle: t(locale, { ru: s.subtitleRu, en: s.subtitleEn }), image: s.image, ctaLink: s.ctaLink }))} />
      <section className="container py-14"><h2 className="text-3xl mb-6">Популярные тренировки</h2><div className="grid md:grid-cols-3 gap-4">{sessions.map((s) => <article key={s.id} className="border p-5"><h3>{t(locale,{ru:s.titleRu,en:s.titleEn})}</h3><p>{t(locale,{ru:s.classType.nameRu,en:s.classType.nameEn})}</p></article>)}</div></section>
      <section className="container py-14"><h2 className="text-3xl mb-6">Тренеры</h2><div className="grid md:grid-cols-4 gap-4">{trainers.map((tr) => <Link key={tr.id} href={`/${locale}/trainers/${tr.slug}`} className="border p-5">{t(locale,{ru:tr.nameRu,en:tr.nameEn})}</Link>)}</div></section>
      <section className="container py-14"><h2 className="text-3xl mb-6">Отзывы</h2><div className="grid md:grid-cols-3 gap-4">{reviews.map((r) => <article key={r.id} className="border p-5">{t(locale,{ru:r.textRu,en:r.textEn})}</article>)}</div></section>
      <section className="container py-14"><h2 className="text-3xl mb-6">Блог/Новости</h2><div className="grid md:grid-cols-3 gap-4">{posts.map((p) => <Link key={p.id} href={`/${locale}/blog/${p.slug}`} className="border p-5">{t(locale,{ru:p.titleRu,en:p.titleEn})}</Link>)}</div></section>
    </div>
  );
}
