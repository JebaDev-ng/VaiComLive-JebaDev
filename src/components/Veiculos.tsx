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
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#2A2A2A] px-6 md:px-10 lg:px-20"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Background decorativo com asset vermelho à esquerda e branco à direita */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#2A2A2A]" />
        
        {/* Asset vermelho - esquerda */}
        <div aria-hidden="true" className="absolute inset-0">
          <img
            src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2018@4x.webp"
            alt=""
            className="absolute left-0 bottom-0 h-full w-auto object-contain object-left-bottom"
            loading="lazy"
          />
        </div>
        
        {/* Asset branco - direita superior (pequeno detalhe decorativo) */}
        <div aria-hidden="true" className="absolute inset-0">
          <img
            src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2019@4x.webp"
            alt=""
            className="absolute right-0 top-0 h-auto w-auto max-h-[29vh] max-w-[155px] object-contain"
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
        className="relative z-10 flex w-full max-w-[1400px] flex-col gap-10 py-12"
        style={{ opacity: sectionOpacity, y: sectionY, scale: sectionScale }}
      >
        {/* Título principal */}
        <motion.div
          className="text-left"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2020@4x.webp"
            alt="Veículos e Infraestrutura"
            className="h-auto w-full max-w-[1000px]"
            loading="eager"
          />
        </motion.div>

        {/* Grid de 4 colunas */}
        <motion.div
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
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
            className="flex flex-col gap-3"
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
                className="h-auto w-full"
              />
            </a>
            <p className="font-hero-body text-[13px] leading-[1.3] text-white">
              {t.veiculos.motorhome}
            </p>
            <a href="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2025@4x.png" target="_blank" rel="noopener noreferrer">
              <img
                src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2025@4x.png"
                alt="Van Iveco Daily"
                className="h-auto w-full object-contain"
              />
            </a>
          </motion.article>

          {/* Coluna 2: MOTO YAMAHA */}
          <motion.article
            className="flex flex-col gap-3"
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
                className="h-auto w-full"
              />
            </a>
            <p className="font-hero-body text-[13px] leading-[1.3] text-white">
              {t.veiculos.moto}
            </p>
            <a href="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2026@4x.png" target="_blank" rel="noopener noreferrer">
              <img
                src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2026@4x.png"
                alt="Moto Yamaha XTZ 150"
                className="h-auto w-full object-contain"
              />
            </a>
          </motion.article>

          {/* Coluna 3: SETUP TECNOLÓGICO */}
          <motion.article
            className="flex flex-col gap-3"
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
                className="h-auto w-full"
              />
            </a>
            <p className="font-hero-body text-[13px] leading-[1.3] text-white">
              {t.veiculos.setup}
            </p>
            <a href="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2027@4x.png" target="_blank" rel="noopener noreferrer">
              <img
                src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2027@4x.png"
                alt="Setup Tecnológico"
                className="h-auto w-full object-contain"
              />
            </a>
          </motion.article>

          {/* Coluna 4: ESTRUTURA STUDIO */}
          <motion.article
            className="flex flex-col gap-3"
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
                className="h-auto w-full"
              />
            </a>
            <p className="font-hero-body text-[13px] leading-[1.3] text-white">
              {t.veiculos.estrutura}
            </p>
            <a href="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2028@4x.png" target="_blank" rel="noopener noreferrer">
              <img
                src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Veiculos/Ativo%2028@4x.png"
                alt="Estrutura Studio"
                className="h-auto w-full object-contain"
              />
            </a>
          </motion.article>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Veiculos;
