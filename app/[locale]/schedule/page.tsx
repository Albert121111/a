import { prisma } from '@/lib/prisma';
import { t } from '@/lib/i18n/config';

export default async function SchedulePage({ params, searchParams }: { params: { locale: string }, searchParams: Record<string, string> }) {
  const locale = params.locale;
  const where: any = {};
  if (searchParams.trainer) where.trainer = { slug: searchParams.trainer };
  if (searchParams.type) where.classType = { slug: searchParams.type };
  const sessions = await prisma.classSession.findMany({ where, include: { trainer: true, classType: true, location: true, bookings: true }, orderBy: { startsAt: 'asc' }, take: 30 });
  return <div className="container py-12"><h1 className="text-4xl mb-6">Расписание</h1><div className="grid gap-4">{sessions.map((s) => <article key={s.id} className="border p-4"><p>{new Date(s.startsAt).toLocaleString()}</p><h2>{t(locale,{ru:s.titleRu,en:s.titleEn})}</h2><p>{t(locale,{ru:s.trainer.nameRu,en:s.trainer.nameEn})} · {t(locale,{ru:s.location.nameRu,en:s.location.nameEn})}</p><p>Мест: {s.seatsLimit - s.bookings.filter((b) => b.status === 'CONFIRMED').length}</p></article>)}</div></div>;
}
