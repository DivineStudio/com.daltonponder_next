"use client";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { ContactForm } from "../ui/ContactForm";
import { EMAIL, SOCIAL_LINKS } from "@/lib/constants";

export function ContactPageContent() {
    const t = useTranslations("Contact");
    const tHome = useTranslations("Home.ContactSection");

    // Availability status defined in code (logic), labels from translations
    const availabilityStatus = [
        { key: "Freelance", available: true },
        { key: "Full-Time", available: false },
        { key: "Consulting", available: true },
    ];

    // Social links using i18n
    const socialLinks = [
        { name: t("Social.GitHub"), icon: "tabler:brand-github", url: SOCIAL_LINKS.github },
        { name: t("Social.LinkedIn"), icon: "tabler:brand-linkedin", url: SOCIAL_LINKS.linkedin },
    ];

    return (
        <>
            {/* Hero Section - Theme Aware */}
            <section className="relative bg-[var(--color-hero-bg)] pt-32 pb-16 overflow-hidden">
                <div className="container relative z-10">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                        <motion.div
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-hero-text)] mb-4">
                                {t("Hero.Header")}
                            </h1>
                            <p className="text-[var(--color-hero-muted)] text-lg md:text-xl max-w-xl mb-6">
                                {t("Hero.SubHeader")}
                            </p>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="h-1 w-32 bg-[var(--color-hero-accent)] origin-left"
                            />
                        </motion.div>

                        {/* Availability Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl px-6 py-4"
                        >
                            <p className="text-[var(--color-hero-muted)] text-sm mb-3">{t("Availability.Header")}</p>
                            <div className="flex flex-wrap gap-2">
                                {availabilityStatus.map((option) => (
                                    <span
                                        key={option.key}
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${option.available
                                            ? "bg-green-500/20 text-green-700 dark:text-green-400"
                                            : "bg-[var(--color-primary)]/20 text-[var(--color-primary)]"
                                            }`}
                                    >
                                        {option.available && (
                                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                                        )}
                                        {t(`Availability.Options.${option.key}`)}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-[var(--color-hero-muted)] text-sm">
                                <Icon icon="tabler:clock" width={16} height={16} />
                                <span>{t("Availability.ResponseTime")}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--background)] to-transparent" />
            </section>
            {/* Contact Section */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-mono text-2xl md:text-3xl font-bold mb-8">
                                {tHome("Main.Header")}
                            </h2>

                            <ContactForm useCaptcha={true} />
                        </motion.div>

                        {/* Direct Contact & Social */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            {/* Direct Email Card */}
                            <div className="bento-card">
                                <h3 className="font-mono text-lg font-semibold mb-4">
                                    {t("Direct.EmailHeader")}
                                </h3>
                                <a
                                    href={`mailto:${EMAIL}`}
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-[var(--color-primary)] flex items-center justify-center group-hover:scale-105 transition-transform">
                                        <Icon icon="tabler:mail" width={28} height={28} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="font-mono font-semibold group-hover:text-accent transition-colors">
                                            {t("Email")}
                                        </p>
                                        <p className="text-sm text-muted">{t("Direct.EmailDetail")}</p>
                                    </div>
                                </a>
                            </div>

                            {/* Social Links */}
                            <div className="bento-card">
                                <h3 className="font-mono text-lg font-semibold mb-4">
                                    {t("Direct.SocialHeader")}
                                </h3>
                                <div className="flex gap-4">
                                    {socialLinks.map((link) => (
                                        <motion.a
                                            key={link.name}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-14 h-14 rounded-xl bg-[var(--color-base-200)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                                            title={link.name}
                                        >
                                            <Icon icon={link.icon} width={28} height={28} />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* Location */}
                            <div className="bento-card">
                                <h3 className="font-mono text-lg font-semibold mb-4">
                                    {t("Direct.LocationHeader")}
                                </h3>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-[var(--color-base-200)] flex items-center justify-center">
                                        <Icon icon="tabler:map-pin" width={28} height={28} className="text-accent" />
                                    </div>
                                    <div>
                                        <p className="font-mono font-semibold">{t("Location.Country")}</p>
                                        <p className="text-sm text-muted">{t("Direct.LocationDetail")}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Signature Sign-Off */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center"
                    >
                        <div className="max-w-xl mx-auto">
                            <p className="font-serif text-2xl md:text-3xl italic text-muted mb-4">
                                &ldquo;{t("Signature")}&rdquo;
                            </p>
                            <div className="flex items-center justify-center gap-2 text-accent font-mono">
                                <span className="w-8 h-px bg-accent" />
                                <span>{t("SignatureName")}</span>
                                <span className="w-8 h-px bg-accent" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
