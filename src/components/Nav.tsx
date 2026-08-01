import Image from "next/image";
import { whatsappLink } from "@/lib/site-config";

const LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#galeria", label: "Galeria" },
  { href: "#localizacao", label: "Localização" },
  { href: "#contato", label: "Contato" },
] as const;

/**
 * Nav sem nenhum JavaScript: por estar em fluxo normal (não `fixed`) logo após o
 * <Hero />, o `sticky top-0` só passa a grudar no topo quando o hero termina de
 * rolar — o hero mantém sua própria logo fixa enquanto pinado, então não há
 * duplicidade nem disputa visual entre os dois.
 */
export default function Nav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-graphite/60 bg-ink/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-16">
        <a href="#" className="relative h-8 w-24 shrink-0 md:h-9 md:w-28">
          <Image
            src="/logo.png"
            alt="Amigão Motos"
            fill
            sizes="112px"
            className="object-contain object-left"
          />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-xs uppercase tracking-[0.25em] text-steel transition-colors hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body shrink-0 border border-paper bg-paper px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-ink transition-opacity hover:opacity-80 md:px-5 md:text-xs"
        >
          <span className="md:hidden">Chamar</span>
          <span className="hidden md:inline">Falar no WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
