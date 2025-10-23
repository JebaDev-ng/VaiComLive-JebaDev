import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useScroll, useTransform } from "framer-motion";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { useLanguage } from "@/i18n/LanguageContext";

function Hero(): JSX.Element {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundControls = useAnimationControls();

  // Scroll-based parallax and opacity
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Hero fades out and moves up as you scroll down
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  useEffect(() => {
    const initialState = { opacity: 0, scale: 1.08, rotate: -5.5 };
    const animationSequence = {
      opacity: [0, 0.55, 0.25],
      scale: [1.08, 1, 1.03],
      rotate: [-5.5, 0.5, -2],
      transition: {
        duration: 6.4,
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
      id="hero"
  className="relative flex h-auto min-h-[calc(100vh-72px)] w-full items-center justify-start overflow-hidden bg-black/80 px-6 pt-20 pb-16 sm:pt-24 sm:pb-20 md:px-10 lg:min-h-screen lg:h-screen lg:items-center lg:justify-center lg:px-16 lg:pt-0 lg:pb-0"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: heroOpacity }}
      >
        <div className="absolute inset-0 bg-[#09090B]" />
        <div aria-hidden="true" className="absolute inset-0">
          <img
            src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Hero/Assets-hero-bg@4x.webp"
            alt=""
            className="h-full w-full object-cover object-bottom sm:object-contain sm:object-left"
            loading="lazy"
          />
        </div>
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(25, 118, 210, 0.45) 0%, rgba(0, 0, 0, 0) 65%)",
            mixBlendMode: "screen",
          }}
          initial={false}
          animate={backgroundControls}
        />
        <NoiseOverlay alpha={56} color="#1E3A8A" tintStrength={0.55} />
      </motion.div>

      <motion.div
        className="relative z-10 flex w-full max-w-[1200px] flex-col items-center justify-center gap-8 sm:gap-10 md:gap-12 lg:flex-row lg:justify-between lg:items-start"
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
      >
        <motion.figure
          className="w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[460px] px-4 sm:px-0"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <img
            src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Hero/Assets-hero-logo@4x.webp"
            alt="Logo Vai Com Live"
            className="h-auto w-full object-contain"
            loading="eager"
          />
        </motion.figure>

        <motion.div
          className="flex w-full max-w-[540px] flex-col text-left text-white px-4 sm:px-0"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.img
            src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Hero/Assets-hero-apresentacao@4x.webp"
            alt="Titulo Apresentação"
            className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[460px] object-contain"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            loading="eager"
          />

          <motion.p
            className="mt-8 font-hero-body text-[clamp(0.875rem,1.5vw,1.125rem)] leading-[1.6] text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {t.hero.description1}
          </motion.p>

          <motion.p
            className="mt-4 font-hero-body text-[clamp(0.875rem,1.5vw,1.125rem)] leading-[1.6] text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {t.hero.description2}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
