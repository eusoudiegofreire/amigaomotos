"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-media-query";

type TelemetryCounterProps = {
  to: number;
  durationMs?: number;
  className?: string;
};

/**
 * Número que "conta" até `to` quando entra na viewport — estilo telemetria/tacômetro,
 * o mesmo vocabulário visual do hero. Com prefers-reduced-motion, mostra `to` direto.
 */
export default function TelemetryCounter({
  to,
  durationMs = 1200,
  className,
}: TelemetryCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          setValue(Math.round(to * progress));
          if (progress < 1) rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, to, durationMs]);

  return (
    <span ref={ref} className={className}>
      {reducedMotion ? to : value}
    </span>
  );
}
