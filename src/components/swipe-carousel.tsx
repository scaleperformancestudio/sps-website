"use client";

import { Children, useEffect, useRef, useState } from "react";

/**
 * SwipeCarousel — on mobile, renders children as a horizontal scroll-snap
 * carousel with pagination dots and a subtle swipe hint. On md+ breakpoints
 * it falls back to a CSS grid using the className passed in `gridClass`.
 *
 * Cards "peek" at the right edge on mobile so the user immediately sees
 * that more content is available beyond the first card.
 */
interface SwipeCarouselProps {
  children: React.ReactNode;
  /** Tailwind grid class for desktop, e.g. "md:grid-cols-2" or "md:grid-cols-3" */
  gridClass: string;
  /** Optional override for the gap between items. Defaults to `gap-4 md:gap-6`. */
  gapClass?: string;
}

export function SwipeCarousel({
  children,
  gridClass,
  gapClass = "gap-4 md:gap-6",
}: SwipeCarouselProps) {
  const items = Children.toArray(children);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Track which card is most visible while scrolling.
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the highest intersection ratio
        let best = { ratio: 0, index: active };
        entries.forEach((entry) => {
          const idx = itemRefs.current.findIndex((el) => el === entry.target);
          if (idx >= 0 && entry.intersectionRatio > best.ratio) {
            best = { ratio: entry.intersectionRatio, index: idx };
          }
        });
        if (best.ratio > 0) setActive(best.index);
      },
      {
        root,
        threshold: [0.5, 0.75, 1],
      }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  // Click a dot → scroll to that card.
  const goTo = (i: number) => {
    const el = itemRefs.current[i];
    if (el) el.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <div>
      {/* Carousel / grid container.
          touch-action: pan-x tells the browser the user's intent is horizontal so
          a sideways swipe doesn't fight with vertical page scroll.
          snap-proximity (not mandatory) makes the snap feel softer — the browser
          only snaps when the user is clearly close to a slide boundary.
          pt-4 on mobile gives badges (e.g. "Most popular") that sit above the card
          enough vertical room — overflow-x:auto unfortunately clips overflow-y too. */}
      <div
        ref={scrollRef}
        className={`-mx-4 flex snap-x snap-proximity touch-pan-x items-stretch overflow-x-auto overscroll-x-contain scroll-px-4 px-4 pt-4 ${gapClass} pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid ${gridClass} md:overflow-visible md:px-0 md:pt-0 md:pb-0`}
      >
        {items.map((child, i) => (
          <div
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={`flex w-[85%] shrink-0 snap-start transition-opacity duration-500 ease-out sm:w-[70%] md:w-auto md:shrink ${
              active === i ? "opacity-100" : "opacity-65 md:opacity-100"
            }`}
          >
            <div className="flex w-full [&>*]:w-full [&>*]:h-full">{child}</div>
          </div>
        ))}
      </div>

      {/* Mobile-only swipe affordance: pagination dots + subtle hint */}
      <div className="mt-5 flex flex-col items-center gap-2 md:hidden">
        <div className="flex items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === i ? "w-6 bg-brand-bright" : "w-1.5 bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-ink-dim/40">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
            Swipe
          </span>
          <span className="inline-block animate-pulse-slow">→</span>
        </div>
      </div>
    </div>
  );
}
