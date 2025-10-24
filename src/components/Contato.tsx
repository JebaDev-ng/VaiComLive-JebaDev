import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { FaTwitch, FaInstagram } from "react-icons/fa";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { useLanguage } from "@/i18n/LanguageContext";

const Contato = () => {
  const { t } = useLanguage();

  const socialLinks = [
    {
      icon: FaInstagram,
      label: "@vaicomlive",
      url: "https://instagram.com/vaicomlive",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: FaTwitch,
      label: "@vaicomlive",
      url: "https://twitch.tv/vaicomlive",
      color: "from-purple-500 to-purple-700"
    }
  ];
  const phoneNumber = "5531983648466";
  const message = encodeURIComponent("Olá! Gostaria de saber mais sobre o projeto Vai Com Live.");
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundControls = useAnimationControls();

  // Section entrance parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const sectionY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 0.98, 1]);

  useEffect(() => {
    const initialState = { opacity: 0, scale: 1.05, rotate: -4.5 };
    const animationSequence = {
      opacity: [0, 0.52, 0.24],
      scale: [1.05, 1, 1.02],
      rotate: [-4.5, 0.4, -1.1],
      transition: {
        duration: 6.2,
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
    <section ref={sectionRef} id="contato" className="py-24 relative overflow-hidden">
      <motion.div className="absolute inset-0" style={{ opacity: sectionOpacity }}>
        {/* Base color from BgTest - Opção C */}
        <div className="absolute inset-0 bg-[#1D1D1E]" />

        {/* Decorative gradient blob */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        </div>

        {/* Animated radial gradient overlay */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(225, 29, 72, 0.25) 0%, rgba(0, 0, 0, 0) 70%)",
            mixBlendMode: "screen",
          }}
          initial={false}
          animate={backgroundControls}
        />

        {/* Intensified noise overlay */}
        <NoiseOverlay alpha={65} color="#E11D48" tintStrength={0.48} />
      </motion.div>

      {/* Asset de fundo - Ativo 44 */}
      <img
        src="/Assets/Ativo 44@4x.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-0 left-0 z-0 h-auto w-full lg:h-full lg:w-auto object-contain object-left-bottom opacity-15 sm:opacity-100 scale-90 sm:scale-100 origin-bottom-left"
        loading="lazy"
      />

      <motion.div
        className="container mx-auto px-4 relative z-10"
        style={{ y: sectionY, scale: sectionScale, opacity: sectionOpacity }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Espaço para o asset visual na esquerda */}
            <div className="hidden lg:block"></div>

            {/* Conteúdo à direita */}
            <div className="flex-1 lg:pl-8">
              <motion.div
                className="space-y-6 mb-12"
                initial={{ opacity: 0, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex justify-center w-full mb-6">
                  <motion.img
                    src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Contato/Ativo%2034.png"
                    alt="Vamos Juntos Nessa Jornada"
                    className="h-44 sm:h-32 md:h-40 lg:h-48 w-auto object-contain"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.12 }}
                  />
                </div>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {t.contato.description}
                </p>
              </motion.div>

              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              >
                <div className="space-y-6 text-center px-4 sm:px-0">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                    {t.contato.headline}{" "}
                    <span className="text-gradient-primary">{t.contato.headlineBold}</span>
                  </h3>
                  <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed">
                    {t.contato.subheadline}
                  </p>
                </div>

                <motion.div
                  className="flex justify-center px-4 sm:px-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    variant="hero"
                    size="lg"
                    className="text-lg sm:text-xl md:text-2xl px-8 sm:px-12 md:px-16 py-6 sm:py-8 md:py-10 shadow-2xl min-h-[44px] touch-manipulation"
                    asChild
                  >
                    <a
                      href={`https://wa.me/${phoneNumber}?text=${message}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mr-2 sm:mr-3" />
                      {t.contato.cta}
                    </a>
                  </Button>
                </motion.div>

                <div className="pt-6 text-center px-4 sm:px-0">
                  <p className="text-base sm:text-lg text-muted-foreground mb-4">{t.contato.followText}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:border-primary transition-all min-h-[44px] touch-manipulation"
                        whileHover={{ scale: 1.08, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      >
                        <social.icon className="w-6 h-6" />
                        <span className="font-semibold">{social.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contato;
