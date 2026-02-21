'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { key: 'visit', ru: 'Посетить', en: 'Visit', href: '/schedule' },
  { key: 'do', ru: 'Занятия', en: 'See & Do', href: '/schedule' },
  { key: 'tickets', ru: 'Тарифы', en: 'Tickets', href: '/memberships' },
  { key: 'about', ru: 'О клубе', en: 'About', href: '/trainers' }
];

export function Header({ locale }: { locale: string }) {
  const pathname = usePathname();
  const switchTo = locale === 'ru' ? 'en' : 'ru';
  const switchedPath = pathname.replace(`/${locale}`, `/${switchTo}`);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-zinc-50/90 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}`} className="text-lg font-semibold tracking-[0.2em]">
          TIARA
        </Link>
        <nav className="hidden items-center gap-5 text-sm md:flex">
          {navItems.map((item) => (
            <Link key={item.key} href={`/${locale}${item.href}`} className="text-zinc-700 transition hover:text-zinc-950">
              {locale === 'en' ? item.en : item.ru}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href={switchedPath} aria-label="switch language" className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-medium">
            {switchTo.toUpperCase()}
          </Link>
          <Link
            href={`/${locale}/memberships`}
            className="rounded-full bg-tiara px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-tiara-light"
          >
            {locale === 'en' ? 'Join now' : 'Купить абонемент'}
          </Link>
        </div>
      </div>
    </header>
  );
}
