"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    id: "spring",
    title: "Spring Collection 2026",
    subtitle: "Fresh arrivals for modern wardrobes.",
    cta: "Shop New In"
  },
  {
    id: "tech",
    title: "Upgrade Your Everyday Tech",
    subtitle: "Trending gadgets with limited-time pricing.",
    cta: "Explore Tech"
  },
  {
    id: "home",
    title: "Home Essentials Sale",
    subtitle: "Create your cozy space with curated picks.",
    cta: "View Deals"
  }
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-2xl bg-slate-900 text-white shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/80 to-cyan-500/70" />
      <div className="relative z-10 px-6 py-14 sm:px-10 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-100">Featured Campaign</p>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl">{slides[active].title}</h1>
        <p className="mt-4 max-w-xl text-sm text-slate-100 sm:text-base">{slides[active].subtitle}</p>
        <button
          type="button"
          className="mt-8 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
        >
          {slides[active].cta}
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setActive(index)}
            className={`h-2.5 w-2.5 rounded-full ${index === active ? "bg-white" : "bg-white/50"}`}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
