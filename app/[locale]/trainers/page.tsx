import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { t } from '@/lib/i18n/config';

export default async function Trainers({ params }: { params: { locale: string } }) {
  const trainers = await prisma.trainer.findMany();
  return <div className="container py-12"><h1 className="text-4xl mb-6">Тренеры</h1><div className="grid md:grid-cols-4 gap-4">{trainers.map((tr)=><Link className="border p-4" href={`/${params.locale}/trainers/${tr.slug}`} key={tr.id}>{t(params.locale,{ru:tr.nameRu,en:tr.nameEn})}</Link>)}</div></div>;
}
