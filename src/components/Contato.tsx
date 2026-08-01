import Reveal from "./Reveal";
import { CONTACT, whatsappLink } from "@/lib/site-config";

export default function Contato() {
  return (
    <section
      id="contato"
      className="relative scroll-mt-16 overflow-hidden border-t border-graphite/60 bg-ink px-5 py-24 md:scroll-mt-20 md:px-16 md:py-32"
    >
      <div
        className="hero-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px] text-center">
        <Reveal className="mx-auto flex flex-col items-center">
          <span className="font-body text-xs uppercase tracking-[0.35em] text-steel">
            05 · Fale com a gente
          </span>
          <h2 className="font-display mt-4 text-5xl uppercase leading-[0.95] tracking-tight text-paper sm:text-6xl md:text-8xl">
            Traga sua <span className="text-steel">moto</span>
          </h2>
          <p className="font-body mt-6 max-w-md text-sm text-steel md:text-base">
            Chame no WhatsApp ou ligue — a gente responde rápido e já adianta o
            diagnóstico antes de você chegar.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body border border-paper bg-paper px-8 py-4 text-xs uppercase tracking-[0.25em] text-ink transition-opacity hover:opacity-80"
            >
              Chamar no WhatsApp
            </a>
            <a
              href={CONTACT.phoneHref}
              className="font-body border border-graphite px-8 py-4 text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-paper"
            >
              {CONTACT.phoneDisplay}
            </a>
          </div>

          <div className="mt-14 grid w-full max-w-md grid-cols-2 gap-6 border-t border-graphite/60 pt-8 text-left">
            <div>
              <span className="font-body block text-[11px] uppercase tracking-[0.25em] text-graphite">
                Seg. a sex.
              </span>
              <span className="font-body text-sm text-steel">{CONTACT.hours.weekdays}</span>
            </div>
            <div>
              <span className="font-body block text-[11px] uppercase tracking-[0.25em] text-graphite">
                Sábado
              </span>
              <span className="font-body text-sm text-steel">{CONTACT.hours.saturday}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
