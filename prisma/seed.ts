import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.booking.deleteMany();
  await prisma.classSession.deleteMany();
  await prisma.classType.deleteMany();
  await prisma.location.deleteMany();
  await prisma.trainer.deleteMany();
  await prisma.membershipPlan.deleteMany();
  await prisma.heroSlide.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.review.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.userMembership.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const hash = await bcrypt.hash('password123', 10);
  const admin = await prisma.user.create({ data: { email: 'admin@tiara.fit', name: 'Admin', role: Role.ADMIN, passwordHash: hash } });
  const member = await prisma.user.create({ data: { email: 'member@tiara.fit', name: 'Member', role: Role.MEMBER, passwordHash: hash } });

  const locations = await prisma.$transaction([
    prisma.location.create({ data: { nameRu: 'Главный зал', nameEn: 'Main Hall', capacity: 24 } }),
    prisma.location.create({ data: { nameRu: 'Йога студия', nameEn: 'Yoga Studio', capacity: 18 } }),
    prisma.location.create({ data: { nameRu: 'Cycle room', nameEn: 'Cycle Room', capacity: 16 } })
  ]);

  const trainers = await Promise.all(Array.from({ length: 8 }).map((_, i) => prisma.trainer.create({ data: {
    slug: `trainer-${i+1}`,
    nameRu: `Тренер ${i+1}`,
    nameEn: `Coach ${i+1}`,
    bioRu: 'Опытный тренер клуба Тиара.',
    bioEn: 'Experienced Tiara coach.',
    specializations: ['Strength', 'Mobility'],
    certifications: ['ACE', 'TRX'],
    socialLinks: { instagram: `https://instagram.com/trainer${i+1}` },
    image: '/images/trainers/placeholder.jpg'
  }})));

  const classTypes = await Promise.all(['Yoga','Pilates','HIIT','Boxing','Dance','Cycle','Crossfit','Stretch','Zumba','Kids Fit','Core','Functional'].map((name, idx) =>
    prisma.classType.create({ data: { slug: name.toLowerCase(), nameRu: `${name} RU`, nameEn: name, level: idx % 2 === 0 ? 'Beginner' : 'Advanced' } })
  ));

  for (let d = 0; d < 14; d++) {
    for (let slot = 0; slot < 3; slot++) {
      const startsAt = new Date();
      startsAt.setDate(startsAt.getDate() + d);
      startsAt.setHours(8 + slot * 4, 0, 0, 0);
      await prisma.classSession.create({ data: {
        startsAt,
        endsAt: new Date(startsAt.getTime() + 55 * 60000),
        seatsLimit: 12 + slot * 4,
        titleRu: `Занятие ${d + 1}-${slot + 1}`,
        titleEn: `Session ${d + 1}-${slot + 1}`,
        classTypeId: classTypes[(d + slot) % classTypes.length].id,
        trainerId: trainers[(d + slot) % trainers.length].id,
        locationId: locations[(d + slot) % locations.length].id
      }});
    }
  }

  await Promise.all([
    prisma.heroSlide.create({ data: { titleRu: 'Сейчас актуально: Tiara Reset', titleEn: 'Now on: Tiara Reset', subtitleRu: 'Новый 21-дневный челлендж', subtitleEn: 'New 21-day challenge', image: '/images/hero/slide1.jpg', ctaLink: '/ru/memberships' } }),
    prisma.heroSlide.create({ data: { titleRu: 'Ночной пилатес', titleEn: 'Night Pilates', subtitleRu: 'Новый формат после 21:00', subtitleEn: 'Late evening format', image: '/images/hero/slide2.jpg', ctaLink: '/ru/schedule' } }),
    prisma.heroSlide.create({ data: { titleRu: 'Family weekend', titleEn: 'Family weekend', subtitleRu: 'Тренировки для родителей и детей', subtitleEn: 'Kids + parents classes', image: '/images/hero/slide3.jpg', ctaLink: '/ru/schedule' } }),
    prisma.heroSlide.create({ data: { titleRu: 'Открытая лекция', titleEn: 'Open lecture', subtitleRu: 'Питание и восстановление', subtitleEn: 'Nutrition and recovery', image: '/images/hero/slide4.jpg', ctaLink: '/ru/blog' } })
  ]);

  await Promise.all(Array.from({ length: 6 }).map((_, i) => prisma.membershipPlan.create({ data: {
    slug: `plan-${i+1}`,
    titleRu: `Тариф ${i+1}`,
    titleEn: `Plan ${i+1}`,
    descriptionRu: 'Доступ к лучшим тренировкам Tiara.',
    descriptionEn: 'Access to Tiara premium classes.',
    price: 3900 + i * 1200,
    visits: i < 3 ? 8 + i * 4 : null,
    durationDays: 30 + i * 30
  }})));

  await Promise.all(Array.from({ length: 10 }).map((_, i) => prisma.blogPost.create({ data: {
    slug: `post-${i+1}`,
    titleRu: `Новость ${i+1}`,
    titleEn: `Post ${i+1}`,
    excerptRu: 'Короткий анонс обновлений клуба Tiara.',
    excerptEn: 'A short update from Tiara club.',
    contentRu: 'Подробный текст статьи о тренировках и здоровье.',
    contentEn: 'Detailed article about training and health.',
    image: '/images/blog/placeholder.jpg'
  }})));

  await Promise.all(Array.from({ length: 12 }).map((_, i) => prisma.review.create({ data: {
    author: `Client ${i+1}`,
    textRu: 'Отличный клуб, стиль и тренеры.',
    textEn: 'Great club, style and coaches.',
    rating: 5 - (i % 2)
  }})));

  const firstPlan = await prisma.membershipPlan.findFirstOrThrow();
  await prisma.userMembership.create({ data: { userId: member.id, planId: firstPlan.id, endsAt: new Date(Date.now() + 1000*60*60*24*30), remainingVisits: 8 } });
  await prisma.payment.create({ data: { userId: member.id, amount: firstPlan.price, status: 'paid', provider: 'seed' } });
  console.log({ admin: admin.email, member: member.email });
}

main().finally(() => prisma.$disconnect());
