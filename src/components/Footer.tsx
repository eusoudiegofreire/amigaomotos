import Image from "next/image";
import { CONTACT, whatsappLink } from "@/lib/site-config";

const LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#galeria", label: "Galeria" },
  { href: "#localizacao", label: "Localização" },
  { href: "#contato", label: "Contato" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-graphite/60 bg-ink px-5 py-14 md:px-16 md:py-16">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="relative h-9 w-32">
            <Image
              src="/logo.png"
              alt="Amigão Motos"
              fill
              sizes="128px"
              className="object-contain object-left"
            />
          </div>
          <p className="font-body mt-4 max-w-xs text-sm text-steel">
            Oficina especializada em motos esportivas e naked em Ariquemes — RO.
            Serviço de verdade, feito por quem entende de moto.
          </p>
        </div>

        <div>
          <span className="font-body block text-xs uppercase tracking-[0.3em] text-graphite">
            Navegação
          </span>
          <ul className="mt-4 space-y-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-body text-sm text-steel transition-colors hover:text-paper"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="font-body block text-xs uppercase tracking-[0.3em] text-graphite">
            Contato
          </span>
          <ul className="mt-4 space-y-2 font-body text-sm text-steel">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-paper">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={CONTACT.phoneHref} className="transition-colors hover:text-paper">
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>{CONTACT.addressLine}</li>
            <li>{CONTACT.addressCity}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1400px] border-t border-graphite/60 pt-6">
        <p className="font-body text-[11px] uppercase tracking-[0.2em] text-graphite">
          Amigão Motos — Ariquemes/RO
        </p>
      </div>
    </footer>
  );
}
