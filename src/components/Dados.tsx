import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useAnimationControls } from "framer-motion";
import { Users, Clock, TrendingUp, MessageCircle, ArrowRight, Mail } from "lucide-react";
import { Youtube } from "lucide-react";
import { FaTwitch, FaInstagram, FaKickstarter, FaWhatsapp } from "react-icons/fa";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const Dados = () => {
  const { t } = useLanguage();
  
  const stats = [
    {
      icon: Users,
      asset: "https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Dados/espectadores@4x.webp",
      value: "+90",
      label: t.dados.viewers,
      gradient: "from-primary to-primary/50"
    },
    {
      icon: Clock,
      asset: "https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Dados/horas@4x.webp",
      value: "4-6",
      label: t.dados.hours,
      gradient: "from-accent to-accent/50"
    },
    {
      icon: FaTwitch,
      asset: "/Assets/Ativo%2039@4x.webp",
      value: "33K",
      label: t.dados.twitchFollowers,
      gradient: "from-purple-500 to-purple-700"
    },
    {
      icon: FaInstagram,
      asset: "/Assets/Ativo%2038@4x.webp",
      value: "11K",
      label: t.dados.instaFollowers,
      gradient: "from-pink-500 to-rose-500"
    }
  ];
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
    const initialState = { opacity: 0, scale: 1.06, rotate: -5 };
    const animationSequence = {
      opacity: [0, 0.48, 0.26],
      scale: [1.06, 1, 1.03],
      rotate: [-5, 0.6, -1.4],
      transition: {
        duration: 6.5,
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
      id="dados"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden pt-16 pb-6 sm:pt-20 sm:pb-10 lg:block lg:min-h-0 lg:py-24"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ opacity: sectionOpacity }}
      >
        {/* Base color from BgTest - Opção C */}
        <div className="absolute inset-0 bg-[#1D1D1E]" />
        
        {/* Decorative gradient blobs */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        </div>
 {/* Mobile decorative asset */}
        
        {/* Mobile dark overlay */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] bg-black/55 lg:hidden" />
        {/* Animated radial gradient overlay */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(225, 29, 72, 0.18) 0%, rgba(0, 0, 0, 0) 65%)",
            mixBlendMode: "screen",
          }}
          initial={false}
          animate={backgroundControls}
        />
        
        {/* Intensified noise overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <NoiseOverlay alpha={58} color="#E11D48" tintStrength={0.38} />
        </div>
      </motion.div>

      {/* Asset de fundo - Ativo 41 */}
      <img
        src="/Assets/Ativo%2041@4x.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-auto w-[140%] -translate-x-1/2 object-cover opacity-20 sm:left-0 sm:h-full sm:w-auto sm:translate-x-0 sm:object-contain sm:opacity-100 sm:scale-75 lg:scale-100"
        loading="lazy"
      />



      <motion.div
        className="container relative z-10 mx-auto flex w-full flex-col gap-10 px-4 sm:gap-12 lg:block"
        style={{ y: sectionY, scale: sectionScale, opacity: sectionOpacity }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-2">
            {/* Espaço para o asset visual na esquerda */}
            <div className="hidden lg:block"></div>
            
            {/* Conteúdo à direita */}
            <div className="flex-1 lg:pl-8">
              <div className="mb-12 space-y-3 text-center sm:mb-14 lg:mb-16 lg:text-left">
                <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
                  <TrendingUp className="w-10 h-10 text-primary" />
                  <picture className="block">
                    <source
                      media="(min-width: 640px)"
                      srcSet="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Dados/dados-e-alcance.png"
                    />
                    <img
                      src="/Assets/Ativo%2042@4x.webp"
                      alt="Dados e Alcance"
                      className="h-32 sm:h-20 md:h-20 lg:h-20 w-auto object-contain"
                      loading="lazy"
                    />
                  </picture>
                </div>
                <div className="space-y-2">
                  <p className="text-xl text-muted-foreground">
                    {t.dados.subtitle}
                  </p>
                  <p className="text-base text-muted-foreground/80 leading-relaxed">
                    {t.dados.description}
                  </p>
                </div>
              </div>

              <div className="mb-10 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 sm:gap-8 lg:mb-12 lg:gap-12 lg:justify-items-start max-w-6xl">
                {stats.map((stat, index) => (
                  <div key={index} className="flex justify-center lg:justify-start">
                    <img 
                      src={stat.asset} 
                      alt={stat.label}
                      className={`h-auto w-full object-contain transition-transform hover:scale-105 ${
                        index === 0 
                          ? 'max-w-[280px] sm:max-w-[360px] lg:max-w-[580px]'
                          : 'max-w-[260px] sm:max-w-[340px] lg:max-w-[550px]'
                      }`}
                    />
                  </div>
                ))}
              </div>

              <div className="mx-auto w-full max-w-[360px] rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/15 via-accent/10 to-primary/15 p-5 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_80px_rgba(225,29,72,0.15)] transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.5),0_0_100px_rgba(225,29,72,0.25)] sm:max-w-[420px] sm:p-8 md:max-w-[520px] md:p-10 lg:mx-0 lg:max-w-none">
              <p className="mb-8 text-lg sm:text-xl md:text-2xl font-semibold leading-relaxed text-white font-['Inter',sans-serif]">
                {t.dados.potential} <span className="text-primary font-bold">{t.dados.potentialBold}</span> {t.dados.potential2} <span className="text-accent font-bold">{t.dados.potential2Bold}</span>.
              </p>

              {/* Botão de Ação */}
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="hero" size="lg" className="flex w-full items-center justify-center gap-2 text-lg px-6 py-6 sm:w-auto sm:px-8" asChild>
                    <a 
                      href="https://wa.me/5531983648466?text=Olá!%20Vi%20os%20dados%20do%20projeto%20Vai%20Com%20Live%20e%20gostaria%20de%20saber%20mais%20sobre%20oportunidades%20de%20parceria%20e%20patrocínio." 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <MessageCircle className="h-5 w-5" />
                      {t.dados.cta}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </a>
                  </Button>
                </motion.div>
              </div>

              {/* Links Sociais Rápidos */}
              <div className="mx-auto mt-6 flex w-full max-w-[360px] flex-wrap items-center justify-center gap-4 border-t border-primary/20 pt-6 sm:max-w-[420px] md:max-w-[520px] lg:mx-0 lg:max-w-none">
                <p className="text-sm font-medium text-muted-foreground">{t.dados.followUs}</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <motion.a
                    href="https://www.twitch.tv/vaicomlive"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-500/50 bg-purple-500/20 transition-colors hover:bg-purple-500/30"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Seguir na Twitch"
                  >
                    <FaTwitch className="h-5 w-5 text-purple-400" />
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/vaicomlive/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-500/50 bg-pink-500/20 transition-colors hover:bg-pink-500/30"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Seguir no Instagram"
                  >
                    <FaInstagram className="h-5 w-5 text-pink-400" />
                  </motion.a>
                  <motion.a
                    href="https://www.youtube.com/channel/UCHypzzU5k8kCG6NKp92me1w"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500/50 bg-red-500/20 transition-colors hover:bg-red-500/30"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Seguir no YouTube"
                  >
                    <Youtube className="h-5 w-5 text-red-400" />
                  </motion.a>
                  <motion.a
                    href="https://kick.com/vaicomlive"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-green-500/50 bg-green-500/20 transition-colors hover:bg-green-500/30"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Seguir no Kick"
                  >
                    <FaKickstarter className="h-5 w-5 text-green-400" />
                  </motion.a>
                  <motion.a
                    href="https://wa.me/5531983648466"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-green-400/50 bg-green-400/20 transition-colors hover:bg-green-400/30"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Contatar no WhatsApp"
                  >
                    <FaWhatsapp className="h-5 w-5 text-green-400" />
                  </motion.a>
                  <motion.a
                    href="mailto:contato@vaicomlive.com.br"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 bg-primary/20 transition-colors hover:bg-primary/30"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Enviar email"
                  >
                    <Mail className="h-5 w-5 text-primary" />
                  </motion.a>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Dados;
