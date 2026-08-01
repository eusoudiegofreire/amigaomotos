"use client";

import { useEffect, useState, useSyncExternalStore, type SVGProps } from "react";
import Image from "next/image";
import { whatsappLink } from "@/lib/site-config";

const LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#galeria", label: "Galeria" },
  { href: "#localizacao", label: "Localização" },
  { href: "#contato", label: "Contato" },
] as const;

// a partir daqui o header deixa de ser transparente sobre o hero e vira sólido/blur
const SCROLL_THRESHOLD = 64;

// mesmo padrão do Hero (useSyncExternalStore): evita setState síncrono em efeito e
// mismatch de hidratação — no servidor assume "não rolou" até o cliente confirmar
function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getScrollSnapshot() {
  return window.scrollY > SCROLL_THRESHOLD;
}

function getScrollServerSnapshot() {
  return false;
}

function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      {...props}
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      {...props}
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

/**
 * Header fixo, sobreposto ao hero desde o carregamento (fundo transparente) e a
 * todas as seções depois (fundo sólido + blur, acionado pelo scroll). Como agora
 * é `fixed` — fora do fluxo — a logo do hero foi removida de Hero.tsx pra não
 * duplicar: este header passa a ser a única logo fixa da página, inclusive sobre
 * o hero.
 */
export default function Nav() {
  const isScrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getScrollServerSnapshot
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // fecha o menu mobile automaticamente se a tela crescer pro breakpoint desktop
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-graphite/60 bg-ink/90 backdrop-blur-sm"
          : "border-transparent bg-transparent"
      }`}
    >
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

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body shrink-0 border border-paper bg-paper px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-ink transition-opacity hover:opacity-80 md:px-5 md:text-xs"
          >
            <span className="md:hidden">Chamar</span>
            <span className="hidden md:inline">Falar no WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="nav-mobile-menu"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            className="shrink-0 border border-graphite/60 p-2 text-paper md:hidden"
          >
            {isMenuOpen ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        id="nav-mobile-menu"
        className={`overflow-hidden border-t transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          isMenuOpen
            ? "max-h-80 border-graphite/60 bg-ink/95 opacity-100 backdrop-blur-sm"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="px-5 py-2">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block border-b border-graphite/40 py-3 font-body text-sm uppercase tracking-[0.2em] text-steel transition-colors last:border-none hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
