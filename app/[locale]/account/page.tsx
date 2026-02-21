import { auth } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { QRCodeCanvas } from 'next-qrcode';

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect('/ru');
  const [bookings, membership, payments] = await Promise.all([
    prisma.booking.findMany({ where: { userId: session.user.id }, include: { classSession: true } }),
    prisma.userMembership.findFirst({ where: { userId: session.user.id, active: true }, include: { plan: true } }),
    prisma.payment.findMany({ where: { userId: session.user.id } })
  ]);

  return <div className="container py-12"><h1 className="text-4xl mb-6">Личный кабинет</h1><QRCodeCanvas text={session.user.id}/><h2 className="mt-6 text-2xl">Мои брони</h2>{bookings.map((b)=><p key={b.id}>{new Date(b.classSession.startsAt).toLocaleString()} — {b.status}</p>)}<h2 className="mt-6 text-2xl">Абонемент</h2><p>{membership?.plan.titleRu} ({membership?.remainingVisits ?? '∞'} посещений)</p><h2 className="mt-6 text-2xl">Платежи</h2>{payments.map((p)=><p key={p.id}>{p.amount}₽ {p.status}</p>)}</div>;
}
