import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/schedule', '/memberships', '/trainers', '/blog', '/contact'];
  return locales.flatMap((l) => routes.map((r) => ({ url: `https://tiara-fitness.local/${l}${r}`, lastModified: new Date() })));
}
