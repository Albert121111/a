import { HeroSlider } from '@/components/home/HeroSlider';
import { AnimateIn } from '@/components/ui/animate-in';
import { prisma } from '@/lib/prisma';
import { t } from '@/lib/i18n/config';
import Link from 'next/link';

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
      <h2 className="text-2xl font-semibold md:text-4xl">{title}</h2>
      <p className="text-sm text-zinc-500">{subtitle}</p>
    </div>
  );
}

export default async function Home({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const [slides, trainers, reviews, posts, sessions] = await Promise.all([
    prisma.heroSlide.findMany({ where: { active: true }, take: 4 }),
    prisma.trainer.findMany({ take: 8 }),
    prisma.review.findMany({ take: 6 }),
    prisma.blogPost.findMany({ take: 3, orderBy: { publishedAt: 'desc' } }),
    prisma.classSession.findMany({ take: 8, include: { classType: true } })
  ]);

  return (
    <div>
      <HeroSlider
        locale={locale}
        slides={slides.map((s) => ({
          id: s.id,
          title: t(locale, { ru: s.titleRu, en: s.titleEn }),
          subtitle: t(locale, { ru: s.subtitleRu, en: s.subtitleEn }),
          image: s.image,
          ctaLink: s.ctaLink
        }))}
      />

      <AnimateIn className="container section-space">
        <SectionHeader title={locale === 'en' ? 'Popular classes' : 'Популярные тренировки'} subtitle={locale === 'en' ? 'Our highlights' : 'Подборка недели'} />
        <div className="grid gap-4 md:grid-cols-4">
          {sessions.map((s) => (
            <article key={s.id} className="card-surface p-5">
              <p className="mb-2 text-xs uppercase tracking-wide text-tiara">{t(locale, { ru: s.classType.nameRu, en: s.classType.nameEn })}</p>
              <h3 className="text-lg font-medium">{t(locale, { ru: s.titleRu, en: s.titleEn })}</h3>
            </article>
          ))}
        </div>
      </AnimateIn>

      <AnimateIn className="container section-space pt-0" delay={0.05}>
        <SectionHeader title={locale === 'en' ? 'Trainers' : 'Тренеры'} subtitle={locale === 'en' ? 'Meet the team' : 'Команда Tiara'} />
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {trainers.map((tr) => (
            <div key={tr.id}>
              <Link href={`/${locale}/trainers/${tr.slug}`} className="card-surface block p-5">
                <p className="text-lg font-medium">{t(locale, { ru: tr.nameRu, en: tr.nameEn })}</p>
                <p className="mt-2 text-sm text-zinc-600">{tr.specializations.join(' · ')}</p>
              </Link>
            </div>
          ))}
        </div>
      </AnimateIn>

      <AnimateIn className="container section-space pt-0" delay={0.1}>
        <SectionHeader title={locale === 'en' ? 'Reviews' : 'Отзывы'} subtitle={locale === 'en' ? 'What members say' : 'Что говорят клиенты'} />
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((r) => (
            <article key={r.id} className="card-surface p-5">
              <p className="text-zinc-700">“{t(locale, { ru: r.textRu, en: r.textEn })}”</p>
              <p className="mt-3 text-sm text-zinc-500">— {r.author}</p>
            </article>
          ))}
        </div>
      </AnimateIn>

      <AnimateIn className="container section-space pt-0" delay={0.15}>
        <SectionHeader title={locale === 'en' ? 'Blog & News' : 'Блог / Новости'} subtitle={locale === 'en' ? 'Fresh updates' : 'Свежие материалы'} />
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((p) => (
            <div key={p.id}>
              <Link href={`/${locale}/blog/${p.slug}`} className="card-surface block p-5">
                <h3 className="text-xl font-medium">{t(locale, { ru: p.titleRu, en: p.titleEn })}</h3>
                <p className="mt-2 text-sm text-zinc-600">{t(locale, { ru: p.excerptRu, en: p.excerptEn })}</p>
              </Link>
            </div>
          ))}
        </div>
      </AnimateIn>
    </div>
  );
}
