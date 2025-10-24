import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useScroll, useTransform } from "framer-motion";
import { Users, Truck, Megaphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { useLanguage } from "@/i18n/LanguageContext";

// ============================================================================
// CONSTANTS
// ============================================================================



// ============================================================================
// ANIMATION CONFIGS
// ============================================================================

const BACKGROUND_ANIMATION = {
  initial: { opacity: 0, scale: 1.04, rotate: -3 },
  animate: {
    opacity: [0, 0.45, 0.2],
    scale: [1.04, 1, 1.03],
    rotate: [-3, 0.25, -0.8],
    transition: {
      duration: 7.2,
      ease: "easeInOut" as const,
      repeat: Infinity,
      repeatType: "mirror" as const,
    },
  },
};

const SECTION_ANIMATION = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const ICON_ANIMATION = {
  initial: { opacity: 0, scale: 0.6, rotate: -8 },
  whileInView: { opacity: 1, scale: 1, rotate: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay: 0.12 },
};

const IMAGE_FLOAT_ANIMATION = {
  animate: { y: [0, -20, 0] },
  transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const },
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface BackgroundLayerProps {
  sectionOpacity: any;
  backgroundControls: any;
}

const BackgroundLayer = ({ sectionOpacity, backgroundControls }: BackgroundLayerProps) => (
  <motion.div className="absolute inset-0" style={{ opacity: sectionOpacity }}>
    <div className="absolute inset-0 bg-[#1D1D1E]" />
    <div
      aria-hidden="true"
      className="absolute top-0 left-1/2 h-1 w-full -translate-x-1/2 transform gradient-accent"
    />
    <motion.div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background: "radial-gradient(ellipse at 50% 30%, rgba(251, 191, 36, 0.22) 0%, rgba(0, 0, 0, 0) 65%)",
        mixBlendMode: "screen",
      }}
      initial={false}
      animate={backgroundControls}
    />
    <NoiseOverlay alpha={62} color="#FBBF24" tintStrength={0.42} />
  </motion.div>
);

const PartnershipImage = () => (
  <div className="order-1 lg:order-none flex items-center justify-center lg:justify-start w-full h-full">
    <motion.img
      src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Assets-Parcerias/Ativo%2032@300x@4x.webp"
      alt="Parceria"
      className="w-full max-w-[200px] sm:max-w-[300px] md:max-w-md lg:max-w-[560px] h-auto object-contain"
      {...IMAGE_FLOAT_ANIMATION}
    />
  </div>
);

const ContentColumn = () => (
  <div className="order-2 flex flex-col justify-center items-start space-y-8 px-6 lg:pl-8 lg:pr-16 w-full">
    <HeaderSection />
    <DescriptionText />
    <OpportunityCards />
    <CallToActionInline />
  </div>
);

const HeaderSection = () => (
  <div className="flex w-full flex-col items-center text-center">
    <img
      src="/Assets/Ativo 43@4x.webp"
      alt="Oportunidades de Parceria"
      className="w-full max-w-[340px] sm:max-w-[280px] md:max-w-[360px] lg:max-w-[460px] h-auto object-contain"
    />
    <motion.div {...ICON_ANIMATION} className="mt-2 sm:mt-3">
      <Users className="w-12 h-12 md:w-14 md:h-14 text-primary" strokeWidth={1.6} />
    </motion.div>
  </div>
);

const DescriptionText = () => {
  const { t } = useLanguage();
  return (
    <p className="text-base md:text-lg text-muted-foreground leading-relaxed w-full">
      {t.parcerias.description}
    </p>
  );
};

const OpportunityCards = () => {
  const { t } = useLanguage();
  const opportunities = [
    {
      icon: Users,
      number: "01",
      title: t.parcerias.opp1Title,
      description: t.parcerias.opp1Desc,
      color: "primary"
    },
    {
      icon: Truck,
      number: "02",
      title: t.parcerias.opp2Title,
      description: t.parcerias.opp2Desc,
      color: "accent"
    },
    {
      icon: Megaphone,
      number: "03",
      title: t.parcerias.opp3Title,
      description: t.parcerias.opp3Desc,
      color: "primary"
    }
  ];
  
  return (
    <div className="flex flex-col gap-4 w-full">
      {opportunities.map((opportunity, index) => (
        <OpportunityCard key={index} opportunity={opportunity} index={index} />
      ))}
    </div>
  );
};

interface OpportunityCardProps {
  opportunity: {
    icon: any;
    number: string;
    title: string;
    description: string;
    color: string;
  };
  index: number;
}

const OpportunityCard = ({ opportunity, index }: OpportunityCardProps) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary transition-all duration-300 group">
      <CardContent className="p-4 sm:p-5 lg:p-6">
        <div className="flex items-center gap-4">
          <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl gradient-${opportunity.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <opportunity.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-foreground" strokeWidth={1.5} />
          </div>
          <div className="flex-shrink-0">
            <div className={`text-3xl sm:text-4xl lg:text-5xl font-black opacity-20 text-${opportunity.color}`}>
              {opportunity.number}
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{opportunity.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{opportunity.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const CallToActionInline = () => {
  const { t } = useLanguage();
  return (
    <motion.div
      className="w-full mt-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
    >
      <Card className="bg-card/80 backdrop-blur-sm border-border">
        <CardContent className="p-8">
          <p className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed">
            {t.parcerias.cta}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const Parcerias = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundControls = useAnimationControls();

  // Scroll-based parallax transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const sectionY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 0.98, 1]);

  // Background animation effect
  useEffect(() => {
    backgroundControls.set(BACKGROUND_ANIMATION.initial);
    void backgroundControls.start(BACKGROUND_ANIMATION.animate);

    return () => {
      backgroundControls.stop();
    };
  }, [backgroundControls]);

  return (
    <section ref={sectionRef} id="parcerias" className="py-24 relative overflow-hidden">
      {/* Background Layer */}
      <BackgroundLayer
        sectionOpacity={sectionOpacity}
        backgroundControls={backgroundControls}
      />

      {/* Content Layer */}
      <motion.div
        className="relative z-10"
        style={{ y: sectionY, scale: sectionScale, opacity: sectionOpacity }}
      >
        <div className="w-full max-w-7xl mx-auto px-4">
          <motion.div {...SECTION_ANIMATION}>
            <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 items-center min-h-[600px]">
              <PartnershipImage />
              <ContentColumn />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Parcerias;
