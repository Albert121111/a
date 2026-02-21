import { prisma } from '@/lib/prisma';
import { t } from '@/lib/i18n/config';

export default async function TrainerPage({ params }: { params: { locale: string; slug: string } }) {
  const tr = await prisma.trainer.findUniqueOrThrow({ where: { slug: params.slug } });
  return <div className="container py-12"><h1 className="text-4xl">{t(params.locale,{ru:tr.nameRu,en:tr.nameEn})}</h1><p className="mt-4">{t(params.locale,{ru:tr.bioRu,en:tr.bioEn})}</p><form className="mt-8 space-y-2 max-w-md"><input className="w-full border p-2" placeholder="Email"/><textarea className="w-full border p-2" placeholder="Записаться к тренеру"/><button className="bg-tiara px-4 py-2 text-white">Отправить</button></form></div>;
}
