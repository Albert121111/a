import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://tiara-fitness.local'),
  title: 'Tiara Fitness Club',
  description: 'Minimal fitness club experience',
  openGraph: { title: 'Tiara Fitness Club', description: 'Book classes and memberships', type: 'website' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ru"><body>{children}</body></html>;
}
