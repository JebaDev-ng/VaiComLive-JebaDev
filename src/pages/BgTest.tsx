import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";
import { motion, useAnimationControls } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NoiseOverlay } from "@/components/ui/noise-overlay";

const BACKGROUND_INITIAL_STATE = {
  opacity: 0,
  scale: 1.08,
  rotate: -4,
};

const BACKGROUND_ANIMATION_KEYFRAMES = {
  opacity: [0, 0.55, 0.25],
  scale: [1.08, 1, 1.03],
  rotate: [-4, 0.5, -1.5],
  transition: {
    duration: 2.4,
    ease: "easeInOut" as const,
  },
};

const OBJECTIVES_BACKGROUND_IMAGE = "/Assets/Assests-Objetivo/bg-2%20assets.svg";
const OBJECTIVES_BACKGROUND_GRADIENT =
  "radial-gradient(ellipse at 50% 40%, rgba(255, 204, 0, 0.4) 0%, rgba(0, 0, 0, 0) 65%)";
const HERO_BACKGROUND_IMAGE = "/Assets/Assets-hero/BG 1.svg";
const HERO_BACKGROUND_GRADIENT =
  "radial-gradient(ellipse at 50% 30%, rgba(25, 118, 210, 0.45) 0%, rgba(0, 0, 0, 0) 65%)";
const BASE_DARK_COLOR = "#1D1D1E";
const HERO_BASE_COLOR = "#09090B";

const BgTest = () => {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.set(BACKGROUND_INITIAL_STATE);
    void controls.start(BACKGROUND_ANIMATION_KEYFRAMES);
  }, [controls]);

  const handleReplayAnimation = useCallback(() => {
    controls.stop();
    controls.set(BACKGROUND_INITIAL_STATE);
    void controls.start(BACKGROUND_ANIMATION_KEYFRAMES);
  }, [controls]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Link
        to="/"
        className="group fixed top-8 left-8 z-50 flex items-center gap-2 rounded-full border border-border bg-card p-3 text-foreground shadow-lg transition-all hover:scale-110 hover:bg-card/80"
        title="Voltar para Home"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="max-w-0 overflow-hidden pr-0 text-sm transition-all duration-300 group-hover:max-w-xs group-hover:pr-2">
          Voltar
        </span>
      </Link>

      <div className="container mx-auto px-4 py-12">
        <header className="mb-10 space-y-2">
          <h1 className="text-4xl font-bold">Opção C — SVG Assets + Textura de Ruído Azul</h1>
          <p className="text-muted-foreground">Fidelidade: 100% | Performance: ⭐⭐⭐⭐⭐</p>
        </header>

        <div className="mb-8 flex flex-wrap items-center gap-4">
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm uppercase tracking-[0.25em] text-primary">
            pré-visualização
          </span>
          <Button
            onClick={handleReplayAnimation}
            aria-label="Reproduzir animação do background"
            variant="outline"
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            Reproduzir animação
          </Button>
        </div>

        <section className="relative h-[600px] overflow-hidden rounded-3xl border border-border bg-[#050505]">
          <div aria-hidden="true" className="absolute inset-0" style={{ backgroundColor: BASE_DARK_COLOR }} />

          <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full" style={{ aspectRatio: "1920 / 1080" }}>
              <img
                src={OBJECTIVES_BACKGROUND_IMAGE}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>

          <motion.div
            className="absolute inset-0"
            initial={BACKGROUND_INITIAL_STATE}
            animate={controls}
            style={{ background: OBJECTIVES_BACKGROUND_GRADIENT, mixBlendMode: "screen" }}
          />

          <NoiseOverlay alpha={56} color="#1E3A8A" tintStrength={0.55} />

          <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-6">
            <span className="rounded bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-white/50">
              visual completo do background
            </span>
          </div>
        </section>

        <div className="mt-16 space-y-3">
          <h2 className="text-3xl font-semibold">Apresentação — Hero</h2>
          <p className="text-muted-foreground">
            Fiel ao layout principal, usando o mesmo SVG de fundo, gradiente de luz e textura de ruído aplicada na home.
          </p>
        </div>

        <section className="relative mt-10 h-[600px] overflow-hidden rounded-3xl border border-border bg-[#050505]">
          <div aria-hidden="true" className="absolute inset-0" style={{ backgroundColor: HERO_BASE_COLOR }} />

          <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full" style={{ aspectRatio: "1920 / 1080" }}>
              <img
                src={HERO_BACKGROUND_IMAGE}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>

          <div className="absolute inset-0" style={{ background: HERO_BACKGROUND_GRADIENT, mixBlendMode: "screen" }} />

          <NoiseOverlay alpha={56} color="#1E3A8A" tintStrength={0.55} />

          <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-6">
            <span className="rounded bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-white/50">
              apresentação hero background
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BgTest;
