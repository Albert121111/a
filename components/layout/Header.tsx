'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header({ locale }: { locale: string }) {
  const pathname = usePathname();
  const switchTo = locale === 'ru' ? 'en' : 'ru';
  const switchedPath = pathname.replace(`/${locale}`, `/${switchTo}`);
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between text-sm">
        <Link href={`/${locale}`} className="font-semibold">TIARA</Link>
        <nav className="flex items-center gap-5">
          <Link href={`/${locale}/schedule`}>See & Do</Link>
          <Link href={`/${locale}/memberships`}>Tickets</Link>
          <Link href={`/${locale}/trainers`}>About</Link>
          <Link href={switchedPath} aria-label="switch language" className="border px-2 py-1">{switchTo.toUpperCase()}</Link>
          <Link href={`/${locale}/memberships`} className="rounded bg-tiara px-3 py-2 text-white">Купить абонемент</Link>
        </nav>
      </div>
    </header>
  );
}
