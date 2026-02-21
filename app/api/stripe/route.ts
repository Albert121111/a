import { auth } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { planId } = await req.json();
  const plan = await prisma.membershipPlan.findUnique({ where: { id: planId } });
  if (!plan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
  if (!process.env.STRIPE_SECRET_KEY) return NextResponse.json({ checkoutUrl: '/mock/success' });
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const checkout = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price_data: { currency: 'rub', product_data: { name: plan.titleRu }, unit_amount: plan.price * 100 }, quantity: 1 }],
    success_url: `${process.env.NEXTAUTH_URL}/ru/account?paid=1`,
    cancel_url: `${process.env.NEXTAUTH_URL}/ru/memberships`
  });
  return NextResponse.json({ checkoutUrl: checkout.url });
}
