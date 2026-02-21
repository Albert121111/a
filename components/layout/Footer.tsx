'use client';

import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer
      className="mt-20 border-t border-zinc-200 bg-white/80 py-14"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container grid gap-10 text-sm text-zinc-700 md:grid-cols-4">
        <div className="space-y-2">
          <p className="text-base font-semibold text-zinc-900">Tiara Fitness Club</p>
          <p>Москва, Примерная 10</p>
          <p>Пн–Вс: 06:00–23:00</p>
        </div>

        <div className="space-y-2">
          <p className="text-base font-semibold text-zinc-900">Навигация</p>
          <p>Расписание</p>
          <p>Тарифы</p>
          <p>Тренеры</p>
        </div>

        <div className="space-y-2">
          <p className="text-base font-semibold text-zinc-900">Контакты</p>
          <p>+7 (999) 123-45-67</p>
          <p>hello@tiara.fit</p>
        </div>

        <form className="space-y-3" aria-label="newsletter-form">
          <label htmlFor="news" className="text-base font-semibold text-zinc-900">
            Подписка на новости
          </label>
          <input id="news" className="w-full rounded-xl border border-zinc-300 p-2.5 transition focus:border-tiara" placeholder="Email" />
          <motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} className="rounded-xl bg-tiara px-4 py-2 text-white transition hover:bg-tiara-light">
            Subscribe
          </motion.button>
        </form>
      </div>
    </motion.footer>
  );
}
