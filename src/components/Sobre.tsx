import type { SVGProps } from "react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import TelemetryCounter from "./TelemetryCounter";

// diferenciais fornecidos pelo cliente — texto real, não placeholder
const HIGHLIGHTS = ["Serviço honesto", "Referência local em Ariquemes"] as const;

function CameraIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M4 8h3l2-2h6l2 2h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

export default function Sobre() {
  return (
    <section
      id="sobre"
      className="scroll-mt-16 border-t border-graphite/60 bg-ink px-5 py-20 md:scroll-mt-20 md:px-16 md:py-28"
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <Reveal>
          <SectionHeader index="02" eyebrow="Quem somos" title="A Oficina" />

          {/* TODO: substituir pelo texto institucional real — quem é a Amigão Motos, história, experiência */}
          <p className="font-body mt-6 max-w-md text-sm leading-relaxed text-steel md:text-base">
            TODO: texto institucional da Amigão Motos — quem somos, há quanto tempo
            estamos em Ariquemes e por que motociclistas confiam a moto pra gente.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {HIGHLIGHTS.map((item) => (
              <span
                key={item}
                className="font-body border border-graphite/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-steel"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-10 flex items-baseline gap-2">
            {/* TODO: ajustar para o número real de anos de oficina */}
            <TelemetryCounter to={10} className="font-display text-5xl text-paper md:text-6xl" />
            <span className="font-display ml-1 text-2xl text-paper md:text-3xl">+</span>
            <span className="font-body text-xs uppercase tracking-[0.3em] text-steel">
              Anos de oficina
            </span>
          </div>
        </Reveal>

        <Reveal delayMs={120}>
          <div className="relative aspect-[4/5] overflow-hidden border border-graphite/60 bg-ink-soft">
            <div
              className="hero-grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
              aria-hidden="true"
            />
            {/* TODO: trocar este placeholder por <Image src="/sobre-foto.jpg" alt="Equipe Amigão Motos" fill className="object-cover grayscale" /> quando houver foto real */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <CameraIcon className="h-8 w-8 text-graphite" />
              <span className="font-body px-6 text-center text-[11px] uppercase tracking-[0.25em] text-graphite">
                Foto da oficina — TODO: substituir
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
