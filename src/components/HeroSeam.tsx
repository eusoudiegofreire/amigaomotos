import Reveal from "./Reveal";

/**
 * Emenda entre o hero e o conteúdo: em vez de um corte duro, um "resto de fumaça"
 * se dissipando (blobs desfocados, bem sutis) e uma faixa de telemetria que costura
 * visualmente o fim da sequência de frames com o início da página. Puramente
 * decorativo — por isso aria-hidden.
 */
export default function HeroSeam() {
  return (
    <div className="relative overflow-hidden bg-ink py-14 md:py-20" aria-hidden="true">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[12%] top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-paper/[0.04] blur-3xl md:h-56 md:w-56" />
        <div className="absolute right-[18%] top-1/3 h-24 w-24 rounded-full bg-paper/[0.03] blur-3xl md:h-44 md:w-44" />
      </div>

      <Reveal className="relative mx-auto flex max-w-[1400px] items-center justify-center gap-4 px-5 md:px-16">
        <span className="h-px max-w-24 flex-1 bg-graphite/60" />
        <span className="font-body whitespace-nowrap text-[10px] uppercase tracking-[0.4em] text-graphite md:text-[11px]">
          Fim de sequência · Amigão Motos
        </span>
        <span className="h-px max-w-24 flex-1 bg-graphite/60" />
      </Reveal>
    </div>
  );
}
