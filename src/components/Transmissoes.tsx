import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useScroll, useTransform } from "framer-motion";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { useLanguage } from "@/i18n/LanguageContext";

const Transmissoes = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundControls = useAnimationControls();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const sectionY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 0.98, 1]);

  useEffect(() => {
    const initialState = { opacity: 0, scale: 1.07, rotate: -7 };
    const animationSequence = {
      opacity: [0, 0.6, 0.3],
      scale: [1.07, 0.99, 1.04],
      rotate: [-7, 1.1, -2.4],
      transition: {
        duration: 5.8,
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
  <section ref={sectionRef} id="transmissoes" className="relative overflow-hidden bg-[#1D1D1E] pt-24 pb-0 lg:pt-28">
      <motion.div className="absolute inset-0" style={{ opacity: sectionOpacity }}>
        <div className="absolute inset-0 bg-[#1D1D1E]" />
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute left-[-10%] top-1/4 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-[12%] right-[-12%] h-[420px] w-[420px] rounded-full bg-accent/20 blur-3xl" />
        </div>
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 45%, rgba(225, 29, 72, 0.18) 0%, rgba(0, 0, 0, 0) 70%)",
            mixBlendMode: "screen",
          }}
          initial={false}
          animate={backgroundControls}
        />
        <NoiseOverlay alpha={58} color="#E11D48" tintStrength={0.38} />
      </motion.div>

      <motion.div
        className="relative z-10"
        style={{ y: sectionY, scale: sectionScale, opacity: sectionOpacity }}
      >
  <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-start gap-10 px-6 pb-10 lg:grid-cols-12 lg:gap-14 lg:items-end lg:pb-0">
          {/* Coluna Esquerda: Ícones informativos */}
          <motion.div
            className="flex w-full max-w-[280px] flex-col gap-5 lg:col-span-3 lg:self-start"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <img
              src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Transmissoes/Ativo%2019@4x.webp"
              alt={t.transmissoes.alt1}
              className="w-full"
            />
            <img
              src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Transmissoes/Ativo%2020@4x.webp"
              alt={t.transmissoes.alt2}
              className="w-full"
            />
            <img
              src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Transmissoes/Ativo%2018@4x.webp"
              alt={t.transmissoes.alt3}
              className="w-full"
            />
          </motion.div>

          {/* Coluna Direita: Imagem principal */}
          <motion.div
            className="flex w-full items-end justify-center self-end lg:col-span-9 lg:self-end"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <img
              src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Transmissoes/Ativo%2021@4x.webp"
              alt={t.transmissoes.altMain}
              className="w-full max-w-[980px] self-end"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Transmissoes;
