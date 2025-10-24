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
      className="relative flex min-h-[calc(100vh-72px)] w-full flex-col items-center justify-center overflow-hidden bg-[#0F0F10] text-white lg:h-screen"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: objetivosOpacity }}
      >
        <div className="absolute inset-0 bg-[#1D1D1E]" />
        
        {/* Asset vermelho/amarelo - mobile/tablet */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 opacity-40 sm:opacity-50 md:opacity-100 lg:hidden">
          <img
            src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Objetivo/Assets-Objetivo-1.webp"
            alt=""
            className="pointer-events-none absolute bottom-[-1%] left-0 w-[36vw] max-w-[180px] translate-x-[-8%] object-contain object-left-bottom sm:w-[34vw] sm:max-w-[200px] sm:translate-x-[-6%] md:w-[32vw] md:max-w-[220px] md:translate-x-[-4%]"
            loading="lazy"
          />
          <img
            src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Objetivo/Assets-Objetivo-2.webp"
            alt=""
            className="pointer-events-none absolute bottom-[-2%] right-0 w-[36vw] max-w-[180px] translate-x-[8%] object-contain object-right-bottom sm:w-[34vw] sm:max-w-[200px] sm:translate-x-[6%] md:w-[32vw] md:max-w-[220px] md:translate-x-[4%]"
            loading="lazy"
          />
        </div>

        {/* Asset vermelho - desktop */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden opacity-20 md:opacity-100 lg:block">
          <img
            src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Objetivo/Assets-Objetivo-1.webp"
            alt=""
            className="absolute left-0 bottom-0 h-full object-contain object-left-bottom"
            loading="lazy"
          />
        </div>

        {/* Asset amarelo - desktop */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden opacity-20 md:opacity-100 lg:block">
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
        className="relative z-10 flex w-full max-w-[1200px] flex-col items-center gap-10 px-6 py-12 sm:gap-12 md:gap-16 md:px-12 lg:max-w-[1600px] lg:px-20"
        style={{ y: objetivosY, scale: objetivosScale, opacity: objetivosOpacity }}
      >
        <motion.div
          className="flex w-full flex-col items-center gap-6 px-2 text-center sm:px-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <picture>
            <source
              media="(min-width: 640px)"
              srcSet="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Objetivo/Assets-Objetivo-Titulo.webp"
            />
            <img
              src="/Assets/Ativo%2036@4x.webp"
              alt="Objetivos do projeto"
              className="w-full max-w-[260px] object-contain sm:max-w-[520px] lg:max-w-[1100px]"
              loading="lazy"
            />
          </picture>
          <div aria-hidden="true" className="h-[4px] w-full max-w-[320px] bg-[#1B3A6F] sm:max-w-[560px] lg:max-w-[680px]" />
        </motion.div>

        <motion.div
          className="flex w-full flex-col items-center gap-6 px-2 text-center sm:grid sm:grid-cols-2 sm:gap-8 sm:px-0 sm:text-left md:gap-10 lg:grid-cols-4 lg:gap-14"
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
              className="group flex flex-col items-center gap-5 sm:items-start"
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
                className="w-full max-w-[220px] object-contain sm:max-w-[240px] lg:max-w-[280px]"
              />
              <p className="text-balance text-[15px] leading-[1.55] text-white md:text-[16px] sm:text-left">
                {description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
