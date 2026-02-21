import { prisma } from '@/lib/prisma';
import { t } from '@/lib/i18n/config';

export default async function MembershipDetail({ params }: { params: { locale: string; slug: string } }) {
  const plan = await prisma.membershipPlan.findUniqueOrThrow({ where: { slug: params.slug } });
  return <div className="container py-12"><h1 className="text-4xl">{t(params.locale,{ru:plan.titleRu,en:plan.titleEn})}</h1><p className="mt-3">{t(params.locale,{ru:plan.descriptionRu,en:plan.descriptionEn})}</p><button className="mt-6 bg-tiara text-white px-4 py-2">Купить</button></div>;
}
