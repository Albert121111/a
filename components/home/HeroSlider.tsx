'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Slide = { id: string; title: string; subtitle: string; image: string; ctaLink: string };

export function HeroSlider({ slides, locale }: { slides: Slide[]; locale: string }) {
  const [emblaRef] = useEmblaCarousel({ loop: true });
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {slides.map((s) => (
          <motion.article key={s.id} className="relative min-w-0 flex-[0_0_100%] p-8 md:p-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="h-[55vh] bg-zinc-100 p-8 md:p-14 flex flex-col justify-end" style={{ backgroundImage: `url(${s.image})`, backgroundSize: 'cover' }}>
              <h1 className="text-3xl md:text-5xl font-medium text-white max-w-2xl">{s.title}</h1>
              <p className="mt-3 text-white/90">{s.subtitle}</p>
              <Link href={`/${locale}${s.ctaLink.replace('/ru', '').replace('/en', '')}`} className="mt-6 inline-block bg-white px-4 py-2">Подробнее</Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
