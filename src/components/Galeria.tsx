"use client";

import { useEffect, useRef, type SVGProps } from "react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { useIsMobile, useReducedMotion } from "@/hooks/use-media-query";

/**
 * Slots da galeria — troque `src` pelo caminho real em /public/gallery/ e o `alt`
 * pela descrição do trabalho quando as fotos estiverem prontas (ver comentário no
 * JSX abaixo com o <Image> que deve substituir o placeholder).
 */
const GALLERY_IMAGES = [
  { src: "/gallery/trabalho-01.jpg", alt: "TODO: descrever o trabalho 1" },
  { src: "/gallery/trabalho-02.jpg", alt: "TODO: descrever o trabalho 2" },
  { src: "/gallery/trabalho-03.jpg", alt: "TODO: descrever o trabalho 3" },
  { src: "/gallery/trabalho-04.jpg", alt: "TODO: descrever o trabalho 4" },
  { src: "/gallery/trabalho-05.jpg", alt: "TODO: descrever o trabalho 5" },
  { src: "/gallery/trabalho-06.jpg", alt: "TODO: descrever o trabalho 6" },
  { src: "/gallery/trabalho-07.jpg", alt: "TODO: descrever o trabalho 7" },
  { src: "/gallery/trabalho-08.jpg", alt: "TODO: descrever o trabalho 8" },
] as const;

// deslocamento vertical alternado por item — dá sensação de profundidade sem pesar
const PARALLAX_FACTORS = [0.06, -0.04, 0.05, -0.06, 0.04, -0.05, 0.06, -0.04];

function ImageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="M21 16.5 15.5 11 5 20" />
    </svg>
  );
}

export default function Galeria() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tickingRef = useRef(false);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  // parallax discreto, só desktop e só sem prefers-reduced-motion — no mobile o hero
  // já carrega os frames, então evitamos qualquer scroll listener extra por lá
  useEffect(() => {
    if (isMobile || reducedMotion) return;

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const viewportCenter = window.innerHeight / 2;
        itemRefs.current.forEach((el, i) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const distanceFromCenter = rect.top + rect.height / 2 - viewportCenter;
          const factor = PARALLAX_FACTORS[i % PARALLAX_FACTORS.length];
          el.style.transform = `translateY(${(distanceFromCenter * factor).toFixed(1)}px)`;
        });
        tickingRef.current = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isMobile, reducedMotion]);

  return (
    <section
      id="galeria"
      className="scroll-mt-16 border-t border-graphite/60 bg-ink px-5 py-20 md:scroll-mt-20 md:px-16 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          index="03"
          eyebrow="Trabalhos"
          title="Galeria"
          description="Uma amostra do que passa pela oficina — motos e serviços recentes."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {GALLERY_IMAGES.map((image, index) => (
            <Reveal key={image.src} delayMs={index * 60}>
              <div
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="group relative aspect-square overflow-hidden border border-graphite/60 bg-ink-soft will-change-transform"
              >
                {/* TODO: quando a foto existir em /public/gallery/, trocar por:
                    <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover grayscale transition-transform duration-500 group-hover:scale-105" /> */}
                <div
                  className="hero-grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-transform duration-500 group-hover:scale-105">
                  <ImageIcon className="h-6 w-6 text-graphite" />
                  <span className="font-body text-[10px] uppercase tracking-[0.25em] text-graphite">
                    Trabalho 0{index + 1}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
