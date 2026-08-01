import type { ReactElement, SVGProps } from "react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import TelemetryCounter from "./TelemetryCounter";
import { SERVICES } from "@/lib/services";

/**
 * Ícones de linha, monocromáticos, desenhados à mão (sem dependência externa) —
 * mantém o pacote enxuto e o estilo técnico/telemetria consistente com o hero.
 */
function IconBase(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  );
}

function GaugeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M4 15a8 8 0 1 1 16 0" />
      <path d="M12 15 15.5 9" />
      <path d="M12 15h.01" />
      <path d="M4 15h1.5M18.5 15H20M12 5v1.5" />
    </IconBase>
  );
}

function EngineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M9 3h6v4H9z" />
      <path d="M8 7h8l1 4H7l1-4Z" />
      <path d="M10 11v3M14 11v3" />
      <path d="M8 14h8v3a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-3Z" />
    </IconBase>
  );
}

function BoltIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" />
    </IconBase>
  );
}

function WheelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.25" />
      <path d="M12 4v3.5M12 16.5V20M4 12h3.5M16.5 12H20M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M6.3 17.7l2.5-2.5M15.2 8.8l2.5-2.5" />
    </IconBase>
  );
}

// fallback pra qualquer serviço novo adicionado em src/lib/services.ts sem ícone dedicado
function WrenchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.83 2.83-2.5-.5-.5-2.5L14.7 6.3Z" />
    </IconBase>
  );
}

const SERVICE_ICONS: Record<string, (props: SVGProps<SVGSVGElement>) => ReactElement> = {
  "revisao-geral": GaugeIcon,
  motor: EngineIcon,
  eletrica: BoltIcon,
  pneus: WheelIcon,
};

export default function Servicos() {
  return (
    <section id="servicos" className="scroll-mt-16 bg-ink px-5 py-20 md:scroll-mt-20 md:px-16 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeader
            index="01"
            eyebrow="O que fazemos"
            title="Serviços"
            description="Manutenção completa pra moto esportiva e naked, sem enrolação."
          />
          <div className="flex items-baseline gap-2">
            <TelemetryCounter
              to={SERVICES.length}
              className="font-display text-4xl text-paper md:text-5xl"
            />
            <span className="font-body text-xs uppercase tracking-[0.3em] text-steel">
              Especialidades
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-graphite/60 bg-graphite/60 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => {
            const Icon = SERVICE_ICONS[service.id] ?? WrenchIcon;
            return (
              <Reveal key={service.id} delayMs={index * 90} className="bg-ink p-6 md:p-8">
                <Icon className="h-7 w-7 text-paper" />
                <h3 className="font-display mt-6 text-xl uppercase tracking-tight text-paper md:text-2xl">
                  {service.title}
                </h3>
                <p className="font-body mt-3 text-sm text-steel">{service.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
