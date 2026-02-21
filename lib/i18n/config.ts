export const locales = ['ru', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ru';
export const t = <T extends Record<string, string>>(locale: string, dict: T) =>
  locale === 'en' ? dict.en : dict.ru;
