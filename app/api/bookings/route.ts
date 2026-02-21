import { auth } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { canCancel } from '@/lib/booking/rules';
import { NextResponse } from 'next/server';

const cancelHours = Number(process.env.CANCEL_HOURS ?? 2);

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { classSessionId } = await req.json();
  const cls = await prisma.classSession.findUnique({ where: { id: classSessionId }, include: { bookings: true } });
  if (!cls) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const confirmed = cls.bookings.filter((b) => b.status === 'CONFIRMED').length;
  const status = confirmed >= cls.seatsLimit ? 'WAITLIST' : 'CONFIRMED';
  const booking = await prisma.booking.upsert({
    where: { userId_classSessionId: { userId: session.user.id, classSessionId } },
    update: { status },
    create: { userId: session.user.id, classSessionId, status }
  });
  return NextResponse.json(booking);
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { bookingId } = await req.json();
  const booking = await prisma.booking.findUnique({ where: { id: bookingId }, include: { classSession: true } });
  if (!booking || booking.userId !== session.user.id) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (!canCancel(booking.classSession.startsAt, cancelHours)) return NextResponse.json({ error: 'Too late' }, { status: 400 });
  await prisma.booking.update({ where: { id: bookingId }, data: { status: 'CANCELLED' } });
  return NextResponse.json({ ok: true });
}
