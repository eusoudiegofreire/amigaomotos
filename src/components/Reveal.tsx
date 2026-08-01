"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-media-query";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** atraso do fade-in em ms — usado pra escalonar cards num grid */
  delayMs?: number;
};

/**
 * Fade + translateY sutil quando o elemento entra na viewport (IntersectionObserver,
 * dispara uma única vez). Com prefers-reduced-motion, mostra o conteúdo direto, sem
 * observer e sem transição — nunca há setState síncrono dentro do efeito (o valor
 * "reduzido" já é computado no render via `isVisible = reducedMotion || hasEntered`).
 */
export default function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const reducedMotion = useReducedMotion();
  const isVisible = reducedMotion || hasEntered;

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transitionProperty: "opacity, transform",
        transitionDuration: reducedMotion ? "0ms" : "700ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: reducedMotion ? "0ms" : `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}
