import { motion } from "framer-motion";
import { Youtube, Mail } from "lucide-react";
import { FaTwitch, FaWhatsapp, FaInstagram, FaKickstarter } from "react-icons/fa";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();
    const jebadevWhatsappMessage = encodeURIComponent(
        "Olá! Gostei do site, quero conhecer mais sobre os serviços e saber valores para um possível orçamento."
    );

    const socialLinks = [
        {
            icon: FaTwitch,
            label: "Twitch",
            url: "https://www.twitch.tv/vaicomlive",
            color: "hover:text-purple-400"
        },
        {
            icon: FaInstagram,
            label: "Instagram",
            url: "https://www.instagram.com/vaicomlive/",
            color: "hover:text-pink-400"
        },
        {
            icon: Youtube,
            label: "YouTube",
            url: "https://www.youtube.com/channel/UCHypzzU5k8kCG6NKp92me1w",
            color: "hover:text-red-400"
        },
        {
            icon: FaKickstarter,
            label: "Kick",
            url: "https://kick.com/vaicomlive",
            color: "hover:text-green-400"
        },
        {
            icon: FaWhatsapp,
            label: "WhatsApp",
            url: "https://wa.me/5531983648466",
            color: "hover:text-green-400"
        },
        {
            icon: Mail,
            label: "Email",
            url: "mailto:contato@vaicomlive.com.br",
            color: "hover:text-primary"
        }
    ];



    return (
        <footer className="relative bg-[#0A0A0A] border-t border-white/10">
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col items-center text-center space-y-8">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src="https://gdyjhpzpnpattlyvmkzj.supabase.co/storage/v1/object/public/Assets/Logo/logo.svg"
                            alt="Vai Com Live"
                            className="h-20 w-auto mx-auto"
                        />
                    </motion.div>

                    {/* Contact Info */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-3"
                    >
                        <a
                            href="tel:+5531992158436"
                            className="block text-2xl md:text-3xl font-bold text-white hover:text-primary transition-colors"
                        >
                            (31) 9 9215-8436
                        </a>
                        <a
                            href="mailto:contato@vaicomlive.com.br"
                            className="block text-lg md:text-xl text-gray-400 hover:text-primary transition-colors"
                        >
                            contato@vaicomlive.com.br
                        </a>
                    </motion.div> */}

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center gap-6"
                    >
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.15, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                                className={`text-gray-400 transition-colors ${social.color}`}
                                aria-label={social.label}
                            >
                                <social.icon className="w-8 h-8" />
                            </motion.a>
                        ))}
                        {/* <span className="text-xl text-gray-400">@VaiComLive</span> */}
                    </motion.div>

                    {/* Bottom Bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="pt-8 border-t border-white/10 w-full"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                            <p>
                                © {currentYear} Vai Com Live. {t.footer.rights}
                            </p>
                            <p>
                                Feito por{" "}
                                <a
                                    href={`https://wa.me/5521968793611?text=${jebadevWhatsappMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary/80 transition-colors font-semibold"
                                    aria-label="Abrir conversa no WhatsApp com JebaDev"
                                >
                                    JebaDev
                                </a>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
