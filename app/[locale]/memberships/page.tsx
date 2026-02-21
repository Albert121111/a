import { prisma } from '@/lib/prisma';
import { t } from '@/lib/i18n/config';
import Link from 'next/link';

export default async function Memberships({ params }: { params: { locale: string } }) {
  const plans = await prisma.membershipPlan.findMany();
  return <div className="container py-12"><h1 className="text-4xl mb-6">Тарифы</h1><div className="grid md:grid-cols-3 gap-4">{plans.map((p)=><Link key={p.id} href={`/${params.locale}/memberships/${p.slug}`} className="border p-5"><h2>{t(params.locale,{ru:p.titleRu,en:p.titleEn})}</h2><p>{p.price} ₽</p></Link>)}</div></div>;
}
