type SectionHeaderProps = {
  /** numeração estilo telemetria (ex: "01") — opcional, decorativo */
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

/**
 * Cabeçalho padrão de seção — reaproveita exatamente o vocabulário tipográfico do
 * hero (eyebrow tracked-out + display Anton uppercase + hairline), sem introduzir
 * nenhum token novo de cor ou fonte.
 */
export default function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={`max-w-2xl ${className ?? ""}`}>
      <div className="flex items-center gap-3">
        {index && (
          <span className="font-body text-xs tabular-nums tracking-[0.3em] text-graphite">
            {index}
          </span>
        )}
        <span className="font-body text-xs uppercase tracking-[0.35em] text-steel">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-display mt-3 text-4xl uppercase leading-[0.95] tracking-tight text-paper sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="font-body mt-4 max-w-md text-sm text-steel md:text-base">
          {description}
        </p>
      )}
      <div className="mt-6 h-px w-16 bg-graphite" />
    </div>
  );
}
