"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** The final numeric value to count to */
  end: number;
  /** Duration in ms (default 2000) */
  duration?: number;
  /** Prefix like "€" */
  prefix?: string;
  /** Suffix like "M+", "x", " days" */
  suffix?: string;
  /** Decimal places (default 0) */
  decimals?: number;
  /** CSS className */
  className?: string;
}

export function CountUp({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Trigger when element scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        // Fire only once the element is clearly inside the viewport so the
        // user actually sees the count-up happen (not before they scroll to it).
        rootMargin: "0px 0px -120px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Animate the count
  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a nice deceleration
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(eased * end);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setValue(end);
      }
    }

    requestAnimationFrame(tick);
  }, [hasStarted, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
