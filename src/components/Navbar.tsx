import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Globe, ChevronDown } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/translations";

const languages = [
  { code: "pt" as Language, name: "Português", flag: "🇧🇷" },
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
  { code: "es" as Language, name: "Español", flag: "🇪🇸" },
];

function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentLanguage = languages.find(l => l.code === language) || languages[0];
  
  const navItems = [
    { label: t.nav.inicio, href: "#hero" },
    { label: t.nav.objetivos, href: "#objetivos" },
    { label: t.nav.veiculos, href: "#veiculos" },
    { label: t.nav.transmissoes, href: "#transmissoes" },
    { label: t.nav.dados, href: "#dados" },
    { label: t.nav.parcerias, href: "#parcerias" },
    { label: t.nav.contato, href: "#contato" },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnLightBackground, setIsOnLightBackground] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const checkBackgroundColor = () => {
      // Get navbar position
      const navElement = document.querySelector('nav');
      if (!navElement) return;

      const rect = navElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Get element behind navbar
      navElement.style.pointerEvents = 'none';
      const elementBehind = document.elementFromPoint(centerX, centerY);
      navElement.style.pointerEvents = 'auto';

      if (!elementBehind) return;

      // Get computed background color
      const computedStyle = window.getComputedStyle(elementBehind);
      const bgColor = computedStyle.backgroundColor;

      // Parse RGB values
      const rgbMatch = bgColor.match(/\d+/g);
      if (rgbMatch) {
        const [r, g, b] = rgbMatch.map(Number);
        // Calculate relative luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        setIsOnLightBackground(luminance > 0.5);
      }
    };

    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
      checkBackgroundColor();
    });

    // Check initially
    checkBackgroundColor();
    
    // Also check on resize
    window.addEventListener('resize', checkBackgroundColor);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', checkBackgroundColor);
    };
  }, [scrollY]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-6 md:pt-6"
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          animate={{
            backgroundColor: isOnLightBackground
              ? "rgba(255, 255, 255, 0.95)"
              : isScrolled
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.85)",
            backdropFilter: isScrolled || isOnLightBackground ? "blur(24px)" : "blur(8px)",
            borderColor: isOnLightBackground
              ? "rgba(0, 0, 0, 0.1)"
              : "rgba(255, 255, 255, 0.1)",
          }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden rounded-full shadow-2xl border"
        >
          {/* Gradient overlay */}
          <motion.div
            animate={{
              opacity: isScrolled && !isOnLightBackground ? 1 : 0.3,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-red-500/5"
          />
          
          <div className="relative flex items-center justify-between px-6 py-3 lg:px-8">
          {/* Brand Indicator */}
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-gradient-to-br from-blue-500 to-red-500 animate-pulse" />
            <motion.span
              animate={{
                color: isOnLightBackground ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.9)",
              }}
              transition={{ duration: 0.3 }}
              className="hidden text-sm font-semibold tracking-wider lg:block"
            >
              VAI COM LIVE
            </motion.span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-1 lg:flex">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                animate={{
                  color: isOnLightBackground ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.8)",
                }}
                transition={{ duration: 0.3 }}
                className="rounded-full px-4 py-2 text-sm font-medium transition-all hover:bg-opacity-10"
                style={{
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isOnLightBackground
                    ? 'rgba(0, 0, 0, 0.05)'
                    : 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Right Section - Language & CTA */}
          <div className="flex items-center space-x-2">
            {/* Language Selector - Desktop */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <motion.button
                  animate={{
                    color: isOnLightBackground ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.8)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="hidden gap-1 rounded-full px-3 py-2 text-sm transition-all hover:bg-opacity-10 lg:flex items-center"
                  style={{
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isOnLightBackground
                      ? 'rgba(0, 0, 0, 0.05)'
                      : 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-xs">{currentLanguage.code.toUpperCase()}</span>
                  <ChevronDown className="h-3 w-3" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-xl border-white/10 bg-black/95 backdrop-blur-xl"
                sideOffset={8}
              >
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`cursor-pointer rounded-lg ${
                      currentLanguage.code === lang.code
                        ? "bg-white/10 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Button - Desktop */}
            <Button
              onClick={() => handleNavClick("#contato")}
              className="hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-blue-500/25 lg:block"
            >
              {t.nav.faleConosco}
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <motion.button
                  animate={{
                    color: isOnLightBackground ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.9)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="rounded-full p-2 transition-all hover:bg-opacity-10 lg:hidden"
                  style={{
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isOnLightBackground
                      ? 'rgba(0, 0, 0, 0.05)'
                      : 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menu</span>
                </motion.button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] rounded-l-3xl border-l border-white/10 bg-black/95 backdrop-blur-xl p-0">
                <div className="flex h-full flex-col">
                  {/* Mobile Header */}
                  <div className="border-b border-white/10 p-6">
                    <div className="flex items-center space-x-3">
                      <div className="h-4 w-4 rounded-full bg-gradient-to-br from-blue-500 to-red-500 animate-pulse" />
                      <span className="text-lg font-bold tracking-wider text-white">
                        VAI COM LIVE
                      </span>
                    </div>
                  </div>

                  {/* Mobile Navigation Items */}
                  <div className="flex-1 space-y-2 p-6">
                    {navItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className="block rounded-xl px-4 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {item.label}
                      </a>
                    ))}
                    
                    {/* CTA Button - Mobile */}
                    <Button
                      onClick={() => handleNavClick("#contato")}
                      className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-3 text-base font-semibold text-white shadow-lg"
                    >
                      {t.nav.faleConosco}
                    </Button>
                  </div>

                  {/* Mobile Language Selector */}
                  <div className="border-t border-white/10 p-6">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
                      Idioma
                    </p>
                    <div className="space-y-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setMobileMenuOpen(false);
                          }}
                          className={`flex w-full items-center rounded-xl px-4 py-3 text-sm transition-colors ${
                            currentLanguage.code === lang.code
                              ? "bg-blue-600/20 text-blue-400 font-semibold"
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <span className="mr-3 text-base">{lang.flag}</span>
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
