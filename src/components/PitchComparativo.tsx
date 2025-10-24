import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, X, Sparkles, Zap, Radio, Globe, Users, TrendingUp, ArrowRight } from "lucide-react";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { useLanguage } from "@/i18n/LanguageContext";

const StatusIcon = ({ status, partialText }: { status: boolean | string; partialText: string }) => {
  if (status === true) {
    return (
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500/20 sm:h-8 sm:w-8">
        <Check className="h-4 w-4 text-green-400 sm:h-5 sm:w-5" />
      </div>
    );
  }
  if (status === "partial") {
    return (
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-500/20 sm:h-8 sm:w-8">
        <span className="text-[10px] font-semibold tracking-tight text-yellow-400 sm:text-xs">
          {partialText}
        </span>
      </div>
    );
  }
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/20 sm:h-8 sm:w-8">
      <X className="h-4 w-4 text-red-400 sm:h-5 sm:w-5" />
    </div>
  );
};

const PitchComparativo = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const sectionY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  
  const comparisonData = [
    {
      element: t.pitch.comp1,
      vaiComLive: true,
      vloggers: false,
      irlStreamers: "partial",
    },
    {
      element: t.pitch.comp2,
      vaiComLive: true,
      vloggers: false,
      irlStreamers: false,
    },
    {
      element: t.pitch.comp3,
      vaiComLive: true,
      vloggers: false,
      irlStreamers: false,
    },
    {
      element: t.pitch.comp4,
      vaiComLive: true,
      vloggers: false,
      irlStreamers: false,
    },
    {
      element: t.pitch.comp5,
      vaiComLive: true,
      vloggers: false,
      irlStreamers: false,
    },
    {
      element: t.pitch.comp6,
      vaiComLive: true,
      vloggers: true,
      irlStreamers: false,
    },
    {
      element: t.pitch.comp7,
      vaiComLive: true,
      vloggers: false,
      irlStreamers: "partial",
    },
    {
      element: t.pitch.comp8,
      vaiComLive: true,
      vloggers: false,
      irlStreamers: false,
    },
  ];

  const diferenciais = [
    {
      icon: Radio,
      title: t.pitch.diff1Title,
      description: t.pitch.diff1Desc,
    },
    {
      icon: Globe,
      title: t.pitch.diff2Title,
      description: t.pitch.diff2Desc,
    },
    {
      icon: Users,
      title: t.pitch.diff3Title,
      description: t.pitch.diff3Desc,
    },
    {
      icon: Sparkles,
      title: t.pitch.diff4Title,
      description: t.pitch.diff4Desc,
    },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Background Layer */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ opacity: sectionOpacity }}
      >
        <div className="absolute inset-0 bg-[#1A1A1B]" />
        
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <NoiseOverlay alpha={45} color="#E11D48" tintStrength={0.25} />
        </div>
      </motion.div>

      <motion.div
        className="container relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8"
        style={{ y: sectionY, opacity: sectionOpacity }}
      >
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12 flex flex-col items-center px-2 text-center sm:mb-14 lg:mb-16 sm:px-0">
            <div className="mb-3 flex items-center justify-center gap-3 sm:mb-4">
              <TrendingUp className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
              <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl font-['Inter',sans-serif]">
                {t.pitch.title}
              </h2>
            </div>
            <p className="mx-auto max-w-2xl text-pretty text-sm text-muted-foreground sm:max-w-3xl sm:text-base md:text-lg">
              {t.pitch.subtitle}
            </p>
          </div>

          {/* Tabela Comparativa */}
          <div className="mb-14 sm:mb-16">
            <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse">
                    <thead>
                      <tr className="border-b border-primary/20 bg-primary/10">
                        <th className="p-3 sm:p-4 text-left text-xs font-semibold text-white sm:text-sm md:text-base">
                          {t.pitch.element}
                        </th>
                        <th className="p-3 sm:p-4 text-center text-xs font-semibold text-primary sm:text-sm md:text-base">
                          {t.pitch.vaiComLive}
                        </th>
                        <th className="p-3 sm:p-4 text-center text-xs font-semibold text-muted-foreground sm:text-sm md:text-base">
                          {t.pitch.vloggers}
                        </th>
                        <th className="p-3 sm:p-4 text-center text-xs font-semibold text-muted-foreground sm:text-sm md:text-base">
                          {t.pitch.irlStreamers}
                        </th>
                      </tr>
                    </thead>
                      <tbody>
                        {comparisonData.map((row, index) => (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="border-b border-primary/10 transition-colors hover:bg-primary/5 last:border-b-0"
                          >
                            <td className="p-3 text-sm text-white sm:p-4 sm:text-base md:text-lg">
                              {row.element}
                            </td>
                            <td className="p-3 sm:p-4">
                              <div className="flex justify-center">
                                <StatusIcon status={row.vaiComLive} partialText={t.pitch.partial} />
                              </div>
                            </td>
                            <td className="p-3 sm:p-4">
                              <div className="flex justify-center">
                                <StatusIcon status={row.vloggers} partialText={t.pitch.partial} />
                              </div>
                            </td>
                            <td className="p-3 sm:p-4">
                              <div className="flex justify-center">
                                <StatusIcon status={row.irlStreamers} partialText={t.pitch.partial} />
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
              </div>
              <div className="flex items-center justify-center gap-2 bg-primary/10 px-3 py-2 text-xs font-medium text-primary sm:hidden">
                <ArrowRight className="h-4 w-4 animate-bounce" aria-hidden="true" />
                <span>{t.pitch.scrollHint}</span>
              </div>
            </div>
          </div>

          {/* Por que é único */}
          <div className="mb-16">
            <h3 className="mb-6 text-center text-2xl font-bold text-white sm:mb-8 md:text-3xl font-['Inter',sans-serif]">
              {t.pitch.whyUnique}
            </h3>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
              {diferenciais.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-5 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20 sm:p-6"
                >
                  <item.icon className="mb-3 h-9 w-9 text-primary transition-transform group-hover:scale-110 sm:mb-4 sm:h-10 sm:w-10" />
                  <h4 className="mb-2 text-base font-semibold text-white sm:text-lg">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground sm:text-base">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cards Informativos */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Estrutura Técnica */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-6 sm:p-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <Zap className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold text-white font-['Inter',sans-serif]">
                  {t.pitch.techTitle}
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground sm:text-base">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                  <span className="text-pretty">{t.pitch.tech1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                  <span className="text-pretty">{t.pitch.tech2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                  <span className="text-pretty">{t.pitch.tech3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                  <span className="text-pretty">{t.pitch.tech4}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                  <span className="text-pretty">{t.pitch.tech5}</span>
                </li>
              </ul>
            </motion.div>

            {/* Oportunidades */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-6 sm:p-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <Sparkles className="h-8 w-8 text-accent" />
                <h3 className="text-2xl font-bold text-white font-['Inter',sans-serif]">
                  {t.pitch.oppTitle}
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground sm:text-base">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />
                  <span className="text-pretty">{t.pitch.opp1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />
                  <span className="text-pretty">{t.pitch.opp2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />
                  <span className="text-pretty">{t.pitch.opp3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />
                  <span className="text-pretty">{t.pitch.opp4}</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Público-alvo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/15 via-accent/10 to-primary/15 p-6 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_80px_rgba(225,29,72,0.15)] sm:mt-12 sm:p-8"
          >
            <h3 className="mb-4 text-2xl font-bold text-white font-['Inter',sans-serif]">
              {t.pitch.audienceTitle}
            </h3>
            <p className="text-pretty text-base text-white font-['Inter',sans-serif] sm:text-lg">
              {t.pitch.audienceDesc} <span className="font-bold text-primary">{t.pitch.audienceAge}</span> {t.pitch.audienceInterests}{" "}
              <span className="font-bold text-accent">{t.pitch.audienceTopics}</span> {t.pitch.audiencePlatforms}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default PitchComparativo;
