"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";

/**
 * ===== CONFIGURAÇÃO DA SEQUÊNCIA DE FRAMES =====
 * Ajuste TOTAL_FRAMES e o padrão de nome em FRAME_SRC para bater
 * exatamente com o que existe em /public/frames.
 */
const TOTAL_FRAMES = 126;
const FRAME_SRC = (frameNumber: number) =>
  `/frames/frame_${String(frameNumber).padStart(3, "0")}.jpg`; // frame_001.jpg ... frame_126.jpg

/**
 * Blocos de texto (eyebrow + título em 2 linhas + subtítulo) sincronizados com o scroll.
 * `start` é o progresso (0 a 1) da seção em que a fase entra em cena.
 */
const TEXT_PHASES = [
  {
    start: 0,
    eyebrow: "OFICINA DE MOTOS · ARIQUEMES-RO",
    titleLine1: "SUA MOTO",
    titleLine2: "EM BOAS MÃOS",
    subtitle: "Serviço de verdade, feito por quem entende de moto.",
  },
  {
    start: 0.4,
    eyebrow: "REVISÃO · MOTOR · ELÉTRICA · PNEUS",
    titleLine1: "PRECISÃO",
    titleLine2: "EM CADA PEÇA",
    subtitle: "Diagnóstico honesto e mão de obra que você pode confiar.",
  },
  {
    start: 0.8,
    eyebrow: "AMIGÃO MOTOS",
    titleLine1: "REFERÊNCIA",
    titleLine2: "NO SETOR 2",
    subtitle: "A oficina que os motociclistas de Ariquemes recomendam.",
  },
] as const;

// velocidade máxima "exibida" no tacômetro ao final do scrub — só decoração, não é telemetria real
const DISPLAY_MAX_SPEED = 320;

// leitura de prefers-reduced-motion via useSyncExternalStore: evita setState em efeito
// e mismatch de hidratação (servidor não tem window, então assume "motion normal" até o cliente confirmar)
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // arrays/valores que mudam a cada frame de scroll não devem passar pelo state do React
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef(-1);
  const tickingRef = useRef(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressLabelRef = useRef<HTMLSpanElement>(null);
  const speedLabelRef = useRef<HTMLSpanElement>(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [activePhase, setActivePhase] = useState(0);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // fase exibida: em modo reduzido sempre a última (estúdio com fumaça), sem depender de setState
  const displayPhase = reducedMotion ? TEXT_PHASES.length - 1 : activePhase;

  // desenha um frame no canvas respeitando "object-fit: cover" (preenche sem distorcer)
  const drawFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !img.complete || img.naturalWidth === 0) return;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let sx = 0;
    let sy = 0;
    let sw = img.naturalWidth;
    let sh = img.naturalHeight;

    if (imgRatio > canvasRatio) {
      // imagem mais larga que a tela: corta as laterais
      sw = img.naturalHeight * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      // imagem mais alta que a tela: corta topo/base
      sh = img.naturalWidth / canvasRatio;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  }, []);

  // redimensiona o canvas em pixels reais (devicePixelRatio) para não borrar em telas retina
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2); // limite de 2x já é nítido e evita canvas gigante em telas 3x
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);

    const currentImg = imagesRef.current[lastFrameRef.current];
    if (currentImg) drawFrame(currentImg);
  }, [drawFrame]);

  // calcula o progresso do scroll dentro da seção e atualiza canvas + textos + tacômetro
  const updateFrame = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const scrollableHeight = section.offsetHeight - window.innerHeight;
    const progress =
      scrollableHeight > 0
        ? Math.min(Math.max(-rect.top / scrollableHeight, 0), 1)
        : 0;

    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.round(progress * (TOTAL_FRAMES - 1))
    );

    // só redesenha quando o frame muda de fato — evita trabalho à toa a cada tick
    if (frameIndex !== lastFrameRef.current) {
      const img = imagesRef.current[frameIndex];
      if (img) drawFrame(img);
      lastFrameRef.current = frameIndex;
    }

    // tacômetro: escrita direta no DOM via ref, fora do ciclo de render do React
    const percent = Math.round(progress * 100);
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${percent}%`;
    }
    if (progressLabelRef.current) {
      progressLabelRef.current.textContent = `${percent}%`;
    }
    if (speedLabelRef.current) {
      speedLabelRef.current.textContent = `${Math.round(progress * DISPLAY_MAX_SPEED)} KM/H`;
    }

    // fase de texto ativa — só mexe no state do React quando ela realmente muda
    let phase = 0;
    for (let i = TEXT_PHASES.length - 1; i >= 0; i -= 1) {
      if (progress >= TEXT_PHASES[i].start) {
        phase = i;
        break;
      }
    }
    setActivePhase((prev) => (prev === phase ? prev : phase));
  }, [drawFrame]);

  const handleScroll = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      updateFrame();
      tickingRef.current = false;
    });
  }, [updateFrame]);

  // pré-carrega os frames antes de ativar o efeito de scroll
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;

    // com movimento reduzido, carregamos só o frame final (estúdio com fumaça se dissipando)
    const frameNumbers = reducedMotion
      ? [TOTAL_FRAMES]
      : Array.from({ length: TOTAL_FRAMES }, (_, i) => i + 1);

    frameNumbers.forEach((frameNumber, arrayIndex) => {
      const img = new window.Image();
      img.decoding = "async";
      img.onload = img.onerror = () => {
        if (cancelled) return;
        loadedCount += 1;
        setLoadProgress(Math.round((loadedCount / frameNumbers.length) * 100));
        if (loadedCount === frameNumbers.length) setIsReady(true);
      };
      img.src = FRAME_SRC(frameNumber);

      const slot = reducedMotion ? TOTAL_FRAMES - 1 : arrayIndex;
      imagesRef.current[slot] = img;
    });

    return () => {
      cancelled = true;
    };
  }, [reducedMotion]);

  // ativa canvas + scroll listener assim que os frames terminam de carregar
  useEffect(() => {
    if (!isReady) return;

    resizeCanvas();

    if (reducedMotion) {
      // modo reduzido: só o frame final, estático, com o texto da última fase já visível
      const lastImg = imagesRef.current[TOTAL_FRAMES - 1];
      lastFrameRef.current = TOTAL_FRAMES - 1;
      if (lastImg) drawFrame(lastImg);
      if (progressBarRef.current) progressBarRef.current.style.width = "100%";
      if (progressLabelRef.current) progressLabelRef.current.textContent = "100%";
      if (speedLabelRef.current) {
        speedLabelRef.current.textContent = `${DISPLAY_MAX_SPEED} KM/H`;
      }
      return;
    }

    updateFrame();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isReady, reducedMotion, handleScroll, resizeCanvas, updateFrame, drawFrame]);

  return (
    <section
      ref={sectionRef}
      className={reducedMotion ? "relative h-dvh" : "relative h-[300vh]"}
      aria-label="Amigão Motos"
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-ink">
        {/* canvas com a sequência de frames — o "vídeo" controlado pelo scroll */}
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* textura sutil de grão sobre o canvas — atmosfera, com muita moderação */}
        <div
          className="hero-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          aria-hidden="true"
        />

        {/* loader enquanto os frames pré-carregam */}
        {!isReady && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-ink">
            <span className="font-body text-xs uppercase tracking-[0.35em] text-steel">
              Carregando
            </span>
            <div className="h-px w-48 bg-graphite">
              <div
                className="h-full bg-paper transition-[width] duration-150 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <span className="font-body text-xs tabular-nums text-steel">
              {loadProgress}%
            </span>
          </div>
        )}

        {/* logo fixa no topo do hero */}
        <div className="absolute left-6 top-6 z-20 h-10 w-32 md:left-10 md:top-10 md:h-12 md:w-40">
          <Image
            src="/logo.png"
            alt="Amigão Motos"
            fill
            priority
            sizes="160px"
            className="object-contain object-left"
          />
        </div>

        {/* blocos de texto sincronizados com as fases do scroll */}
        <div className="absolute inset-x-0 bottom-28 z-20 px-6 md:bottom-32 md:px-16">
          <div className="relative min-h-[170px] md:min-h-[210px]">
            {TEXT_PHASES.map((phase, index) => {
              const isActive = displayPhase === index;
              return (
                <div
                  key={phase.titleLine1}
                  className="absolute inset-0 transition-all duration-700 ease-out"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(12px)",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  aria-hidden={!isActive}
                >
                  <span className="font-body block text-xs uppercase tracking-[0.35em] text-steel">
                    {phase.eyebrow}
                  </span>
                  <h1 className="font-display mt-3 text-4xl uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
                    <span className="block text-steel">{phase.titleLine1}</span>
                    <span className="block text-white">{phase.titleLine2}</span>
                  </h1>
                  <p className="font-body mt-4 max-w-md text-sm text-steel md:text-base">
                    {phase.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* indicador de progresso — estilo tacômetro / barra de aceleração */}
        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-graphite/60 bg-ink/80 px-6 py-4 backdrop-blur-sm md:px-16">
          <div className="flex items-center justify-between font-body text-[11px] uppercase tracking-[0.25em] text-steel">
            <span>Aceleração — Setor {displayPhase + 1}/{TEXT_PHASES.length}</span>
            <span ref={speedLabelRef} className="tabular-nums text-paper">
              0 KM/H
            </span>
            <span ref={progressLabelRef} className="tabular-nums">
              0%
            </span>
          </div>
          <div className="mt-2 h-[2px] w-full bg-graphite/60">
            <div ref={progressBarRef} className="h-full w-0 bg-paper" />
          </div>
        </div>
      </div>
    </section>
  );
}
