'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Slide = { id: string; title: string; subtitle: string; image: string; ctaLink: string };

export function HeroSlider({ slides, locale }: { slides: Slide[]; locale: string }) {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <section className="container pt-8 md:pt-10">
      <motion.div
        className="mb-5 flex items-end justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Now on display</p>
        <p className="text-xs text-zinc-500">Tiara Fitness Club</p>
      </motion.div>

      <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
        <div className="flex">
          {slides.map((s) => (
            <motion.article
              key={s.id}
              className="relative min-w-0 flex-[0_0_100%]"
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55 }}
            >
              <div
                className="relative flex h-[58vh] min-h-[420px] items-end overflow-hidden rounded-3xl bg-zinc-300 p-8 md:p-14"
                style={{
                  backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.15)), url(${s.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <motion.div
                  className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-tiara/30 blur-3xl"
                  animate={{ x: [0, -12, 0], y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
                />

                <motion.div
                  className="max-w-2xl"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.12 }}
                >
                  <h1 className="text-3xl font-medium leading-tight text-white md:text-5xl">{s.title}</h1>
                  <p className="mt-3 text-white/90 md:text-lg">{s.subtitle}</p>
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href={`/${locale}${s.ctaLink.replace('/ru', '').replace('/en', '')}`}
                      className="mt-7 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-medium text-zinc-900"
                    >
                      {locale === 'en' ? 'Learn more' : 'Подробнее'}
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
