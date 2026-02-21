import { auth } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect('/ru');
  if (session.user.role !== 'ADMIN') redirect('/ru/account');
  const [sessions, locations, trainers, plans, posts, slides, leads] = await Promise.all([
    prisma.classSession.findMany({ take: 5 }),
    prisma.location.findMany(),
    prisma.trainer.findMany(),
    prisma.membershipPlan.findMany(),
    prisma.blogPost.findMany({ take: 5 }),
    prisma.heroSlide.findMany(),
    prisma.lead.findMany({ take: 10, orderBy: { createdAt: 'desc' } })
  ]);
  return <div className="container py-12"><h1 className="text-4xl mb-6">Admin</h1><p>Расписание: {sessions.length}</p><p>Локации: {locations.length}</p><p>Тренеры: {trainers.length}</p><p>Тарифы: {plans.length}</p><p>Новости: {posts.length}</p><p>Акции: {slides.length}</p><p>Лиды: {leads.length}</p></div>;
}
