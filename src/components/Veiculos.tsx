import { useEffect, useRef, PointerEvent } from "react";
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { useLanguage } from "@/i18n/LanguageContext";

function Veiculos(): JSX.Element {
  const { t } = useLanguage();
  const backgroundControls = useAnimationControls();
  const sectionRef = useRef<HTMLElement | null>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const pointerTranslateX = useSpring(useTransform(pointerX, [-1, 1], [-40, 40]), {
    stiffness: 120,
    damping: 22,
    mass: 0.7,
  });
  const pointerTranslateY = useSpring(useTransform(pointerY, [-1, 1], [-30, 30]), {
    stiffness: 120,
    damping: 22,
    mass: 0.7,
  });
  
  // Parallax scroll for pointer interaction
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const scrollOffset = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const translateX = useTransform([pointerTranslateX, scrollOffset], (values) => {
    const [pointer, scroll] = values as number[];
    return pointer + scroll;
  });
  const translateY = useTransform([pointerTranslateY, scrollOffset], (values) => {
    const [pointer, scroll] = values as number[];
    return pointer + scroll * 0.6;
  });

  // Section entrance parallax (fade in from below)
  const { scrollYProgress: entranceProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const sectionOpacity = useTransform(entranceProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const sectionY = useTransform(entranceProgress, [0, 1], [100, 0]);
  const sectionScale = useTransform(entranceProgress, [0, 0.5, 1], [0.95, 0.98, 1]);

  useEffect(() => {
    const initialState = { opacity: 0, scale: 1.05, rotate: -6 };
    const animationSequence = {
      opacity: [0, 0.5, 0.22],
      scale: [1.05, 1, 1.04],
      rotate: [-6, 0.6, -1.8],
      transition: {
        duration: 6.8,
        ease: "easeInOut" as const,
        repeat: Infinity,
        repeatType: "mirror" as const,
      },
    };

    backgroundControls.set(initialState);
    void backgroundControls.start(animationSequence);

    return () => {
      backgroundControls.stop();
    };
  }, [backgroundControls]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const element = sectionRef.current;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const normalizedX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = ((event.clientY - rect.top) / rect.height) * 2 - 1;

    pointerX.set(Math.max(-1, Math.min(1, normalizedX)));
    pointerY.set(Math.max(-1, Math.min(1, normalizedY)));
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      id="veiculos"
      className="relative flex min-h-[calc(100vh-72px)] w-full flex-col items-center justify-center overflow-hidden bg-[#2A2A2A] px-6 py-12 text-white sm:py-16 md:px-10 lg:h-screen lg:px-20"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Background decorativo com asset vermelho à esquerda e branco à direita */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#2A2A2A]" />

        {/* Assets mobile/tablet */}
  <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-40 sm:opacity-60 md:opacity-100 lg:hidden">
          <img
            src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2018@4x.webp"
            alt=""
            className="absolute top-0 left-0 w-[38vw] max-w-[210px] -translate-x-[12%] object-contain object-left-top"
            loading="lazy"
          />
          <img
            src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2019@4x.webp"
            alt=""
            className="absolute top-0 right-0 w-[37vw] max-w-[160px] translate-x-[10%] object-contain object-right-top"
            loading="lazy"
          />
        </div>

        {/* Asset vermelho - desktop */}
        <div aria-hidden="true" className="absolute inset-0 hidden opacity-30 md:opacity-100 lg:block">
          <img
            src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2018@4x.webp"
            alt=""
            className="absolute left-0 top-0 h-full object-contain object-left-top"
            loading="lazy"
          />
        </div>

        {/* Asset branco - desktop */}
        <div aria-hidden="true" className="absolute inset-0 hidden lg:block">
          <img
            src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2019@4x.webp"
            alt=""
            className="absolute right-0 top-0 h-auto max-h-[30vh] max-w-[155px] object-contain object-right-top"
            loading="lazy"
          />
        </div>

        {/* Radial gradient overlay */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(220, 38, 38, 0.25) 0%, rgba(0, 0, 0, 0) 65%)",
            mixBlendMode: "screen",
            translateX,
            translateY,
          }}
          initial={false}
          animate={backgroundControls}
        />

        {/* Noise overlay */}
        <NoiseOverlay alpha={48} color="#DC2626" tintStrength={0.35} />
      </div>

      {/* Conteúdo principal com entrada parallax */}
      <motion.div
        className="relative z-10 flex w-full max-w-[1200px] flex-col items-center gap-10 sm:gap-12 md:gap-14 lg:max-w-[1500px]"
        style={{ opacity: sectionOpacity, y: sectionY, scale: sectionScale }}
      >
        {/* Título principal */}
        <motion.div
          className="flex w-full flex-col items-center gap-6 px-2 text-center sm:items-start sm:px-0 sm:text-left"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <picture>
            <source
              media="(min-width: 640px)"
              srcSet="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2020@4x.webp"
            />
            <img
              src="/Assets/Ativo%2037@4x.webp"
              alt="Veículos e Infraestrutura"
              className="w-full max-w-[260px] object-contain sm:max-w-[500px] lg:max-w-[1000px]"
              loading="eager"
            />
          </picture>
          <div aria-hidden="true" className="h-[4px] w-full max-w-[320px] bg-[#DC2626] sm:max-w-[560px] lg:max-w-[680px]" />
        </motion.div>

        {/* Grid de 4 colunas */}
        <motion.div
          className="flex w-full flex-col items-center gap-6 px-2 sm:grid sm:grid-cols-2 sm:gap-8 sm:px-0 md:gap-10 lg:grid-cols-4 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
              },
            },
          }}
        >
          {/* Coluna 1: MOTORHOME */}
          <motion.article
            className="flex w-full max-w-[320px] flex-col items-center gap-4 text-center sm:max-w-none sm:items-start sm:text-left"
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
            whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
          >
            <a href="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2021@4x.webp" target="_blank" rel="noopener noreferrer">
              <img
                src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2021@4x.webp"
                alt="Motorhome"
                className="w-full max-w-[260px] object-contain sm:max-w-none"
              />
            </a>
            <p className="text-balance font-hero-body text-[13px] leading-[1.35] sm:text-[14px]">
              {t.veiculos.motorhome}
            </p>
            <a href="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2025@4x.png" target="_blank" rel="noopener noreferrer">
              <img
                src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2025@4x.png"
                alt="Van Iveco Daily"
                className="w-full max-w-[260px] object-contain sm:max-w-none"
              />
            </a>
          </motion.article>

          {/* Coluna 2: MOTO YAMAHA */}
          <motion.article
            className="flex w-full max-w-[320px] flex-col items-center gap-4 text-center sm:max-w-none sm:items-start sm:text-left"
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
            whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
          >
            <a href="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2022@4x.webp" target="_blank" rel="noopener noreferrer">
              <img
                src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2022@4x.webp"
                alt="Moto Yamaha XTZ 150 (2024)"
                className="w-full max-w-[260px] object-contain sm:max-w-none"
              />
            </a>
            <p className="text-balance font-hero-body text-[13px] leading-[1.35] sm:text-[14px]">
              {t.veiculos.moto}
            </p>
            <a href="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2026@4x.png" target="_blank" rel="noopener noreferrer">
              <img
                src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2026@4x.png"
                alt="Moto Yamaha XTZ 150"
                className="w-full max-w-[260px] object-contain sm:max-w-none"
              />
            </a>
          </motion.article>

          {/* Coluna 3: SETUP TECNOLÓGICO */}
          <motion.article
            className="flex w-full max-w-[320px] flex-col items-center gap-4 text-center sm:max-w-none sm:items-start sm:text-left"
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
            whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
          >
            <a href="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2023@4x.webp" target="_blank" rel="noopener noreferrer">
              <img
                src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2023@4x.webp"
                alt="Setup Tecnológico"
                className="w-full max-w-[260px] object-contain sm:max-w-none"
              />
            </a>
            <p className="text-balance font-hero-body text-[13px] leading-[1.35] sm:text-[14px]">
              {t.veiculos.setup}
            </p>
            <a href="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2027@4x.png" target="_blank" rel="noopener noreferrer">
              <img
                src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2027@4x.png"
                alt="Setup Tecnológico"
                className="w-full max-w-[260px] object-contain sm:max-w-none"
              />
            </a>
          </motion.article>

          {/* Coluna 4: ESTRUTURA STUDIO */}
          <motion.article
            className="flex w-full max-w-[320px] flex-col items-center gap-4 text-center sm:max-w-none sm:items-start sm:text-left"
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
            whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
          >
            <a href="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2024@4x.webp" target="_blank" rel="noopener noreferrer">
              <img
                src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2024@4x.webp"
                alt="Estrutura Studio"
                className="w-full max-w-[260px] object-contain sm:max-w-none"
              />
            </a>
            <p className="text-balance font-hero-body text-[13px] leading-[1.35] sm:text-[14px]">
              {t.veiculos.estrutura}
            </p>
            <a href="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2028@4x.png" target="_blank" rel="noopener noreferrer">
              <img
                src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2028@4x.png"
                alt="Estrutura Studio"
                className="w-full max-w-[260px] object-contain sm:max-w-none"
              />
            </a>
          </motion.article>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Veiculos;
