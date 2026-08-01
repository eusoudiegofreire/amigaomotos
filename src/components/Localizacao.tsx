import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { CONTACT } from "@/lib/site-config";

const FULL_ADDRESS = `${CONTACT.addressLine}, ${CONTACT.addressCity}`;

// TODO: trocar pela URL gerada em Google Maps > Compartilhar > Incorporar mapa assim
// que as coordenadas exatas forem confirmadas — por ora, busca direto pelo endereço
// (funciona sem chave de API, só não é tão preciso quanto um pino manual).
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(
  FULL_ADDRESS
)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

export default function Localizacao() {
  return (
    <section
      id="localizacao"
      className="scroll-mt-16 border-t border-graphite/60 bg-ink px-5 py-20 md:scroll-mt-20 md:px-16 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader index="04" eyebrow="Onde estamos" title="Localização" />

        <div className="mt-12 grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-12">
          <Reveal className="flex flex-col justify-center gap-6 border border-graphite/60 p-6 md:p-8">
            <div>
              <span className="font-body block text-xs uppercase tracking-[0.3em] text-graphite">
                Endereço
              </span>
              <p className="font-display mt-2 text-2xl uppercase leading-tight text-paper md:text-3xl">
                {CONTACT.addressLine}
              </p>
              <p className="font-body mt-1 text-sm text-steel">{CONTACT.addressCity}</p>
            </div>

            <div className="h-px w-full bg-graphite/60" />

            <div>
              <span className="font-body block text-xs uppercase tracking-[0.3em] text-graphite">
                Horário
              </span>
              <p className="font-body mt-2 text-sm text-steel">
                Seg. a sex.: {CONTACT.hours.weekdays}
              </p>
              <p className="font-body text-sm text-steel">Sábado: {CONTACT.hours.saturday}</p>
            </div>
          </Reveal>

          <Reveal
            delayMs={120}
            className="relative aspect-video overflow-hidden border border-graphite/60 md:aspect-auto md:h-full"
          >
            <iframe
              title="Localização da Amigão Motos no mapa"
              src={MAP_EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full grayscale invert-[0.9] contrast-[0.9] brightness-[0.9]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
