import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useScroll, useTransform } from "framer-motion";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Objetivos() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundControls = useAnimationControls();

  const objectivesContent = [
    {
      svgFileName: "https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Objetivo/Assets-Objetivo-Explorar",
      description: t.objetivos.explorar,
    },
    {
      svgFileName: "https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Objetivo/Assets-Objetivo-Produzir.webp",
      description: t.objetivos.produzir,
    },
    {
      svgFileName: "https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Objetivo/Assets-Objetivo-Podcast.webp",
      description: t.objetivos.podcast,
    },
    {
      svgFileName: "https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Objetivo/Assets-Objetivo-interacao.webp",
      description: t.objetivos.interacao,
    },
  ] as const;

  // Scroll-based parallax and opacity
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  // Objetivos fades in and moves up as it enters viewport
  const objetivosOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const objetivosY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const objetivosScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 0.98, 1]);

  useEffect(() => {
    const initialState = { opacity: 0, scale: 1.06, rotate: -4 };
    const animationSequence = {
      opacity: [0, 0.5, 0.28],
      scale: [1.06, 1.01, 1.04],
      rotate: [-4, 0.35, -1.2],
      transition: {
        duration: 7,
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

  return (
    <section
      ref={sectionRef}
      id="objetivos"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden text-white"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: objetivosOpacity }}
      >
        <div className="absolute inset-0 bg-[#1D1D1E]" />
        
        {/* Asset vermelho - esquerda */}
        <div aria-hidden="true" className="absolute inset-0">
          <img
            src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Objetivo/Assets-Objetivo-1.webp"
            alt=""
            className="absolute left-0 bottom-0 h-full object-contain object-left-bottom"
            loading="lazy"
          />
        </div>
        
        {/* Asset amarelo - direita */}
        <div aria-hidden="true" className="absolute inset-0">
          <img
            src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Objetivo/Assets-Objetivo-2.webp"
            alt=""
            className="absolute right-0 top-0 h-full object-contain object-right-top"
            loading="lazy"
          />
        </div>
        
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(28, 166, 221, 0.4) 0%, rgba(0, 0, 0, 0) 65%)",
            mixBlendMode: "screen",
          }}
          initial={false}
          animate={backgroundControls}
        />
        <NoiseOverlay alpha={52} color="#1B3A6F" tintStrength={0.4} />
      </motion.div>

      <motion.div
        className="relative z-10 flex w-full max-w-[1600px] flex-col items-center gap-12 px-6 py-8 md:gap-16 md:px-12 lg:px-20"
        style={{ y: objetivosY, scale: objetivosScale, opacity: objetivosOpacity }}
      >
        <motion.div
          className="flex w-full flex-col items-center gap-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Objetivo/Assets-Objetivo-Titulo.webp"
            alt="Objetivos do projeto"
            className="w-full max-w-[1100px]"
          />
          <div aria-hidden="true" className="h-[4px] w-full max-w-[680px] bg-[#1B3A6F]" />
        </motion.div>

        <motion.div
          className="grid w-full gap-8 text-left sm:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {objectivesContent.map(({ svgFileName, description }, index) => (
            <motion.article
              key={svgFileName}
              className="flex flex-col gap-5"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <img
                src={svgFileName}
                alt={description}
                className="w-full max-w-[280px]"
              />
              <p className="text-[15px] leading-[1.5] text-white md:text-[16px]">
                {description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
