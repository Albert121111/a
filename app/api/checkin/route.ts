import { auth } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const { userId } = await req.json();
  const membership = await prisma.userMembership.findFirst({ where: { userId, active: true }, orderBy: { endsAt: 'desc' } });
  if (!membership) return NextResponse.json({ valid: false });
  return NextResponse.json({ valid: membership.endsAt > new Date(), membership });
}
