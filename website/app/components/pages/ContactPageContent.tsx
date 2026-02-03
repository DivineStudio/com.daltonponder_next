"use client";
import { useTranslations } from "next-intl";

import { useState } from "react";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";

export function ContactPageContent() {
    const t = useTranslations("Contact");
    const tHome = useTranslations("Home.ContactSection");
    const tNav = useTranslations("Navigation");

    const availabilityOptions = t.raw("Availability.Options");

    // Social links (reusing logic or hardcoded if specific)
    const socialLinks = [
        { name: "GitHub", icon: "tabler:brand-github", url: "https://github.com" },
        { name: "LinkedIn", icon: "tabler:brand-linkedin", url: "https://linkedin.com" },
        { name: "Twitter", icon: "tabler:brand-x", url: "https://twitter.com" },
    ];
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        setSubmitted(true);
    };

    return (
        <>
            {/* Hero Section - Theme Aware */}
            <section className="relative bg-[var(--color-hero-bg)] pt-32 pb-16 overflow-hidden">
                <div className="container relative z-10">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
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
                                {availabilityOptions.map((option: { label: string; available: boolean }) => (
                                    <span
                                        key={option.label}
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${option.available
                                            ? "bg-green-500/20 text-green-700 dark:text-green-400"
                                            : "bg-[var(--color-primary)]/20 text-[var(--color-primary)]"
                                            }`}
                                    >
                                        {option.available && (
                                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                                        )}
                                        {option.label}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-[var(--color-hero-muted)] text-sm">
                                <Icon icon="tabler:clock" width={16} height={16} />
                                <span>{t("Availability.ResponseTime")}</span>
                            </div>
                        </motion.div>
                    </div>
                </div >

                {/* Gradient fade */}
                < div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--background)] to-transparent" />
            </section >

            {/* Contact Section */}
            < section className="section" >
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

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bento-card text-center py-12"
                                >
                                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                                        <Icon icon="tabler:check" width={32} height={32} className="text-green-500" />
                                    </div>
                                    <h3 className="font-mono text-xl font-semibold mb-2">{tHome("Form.SuccessHeader")}</h3>
                                    <p className="text-muted">{tHome("Form.SuccessMessage")}</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
                                            placeholder="John Doe" // Could also translate
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all resize-none"
                                            placeholder="Tell me about your project..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Icon icon="tabler:loader-2" width={20} height={20} className="animate-spin" />
                                                {tHome("Form.Sending")}
                                            </>
                                        ) : (
                                            <>
                                                {tHome("Form.Send")}
                                                <Icon icon="tabler:send" width={20} height={20} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
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
                                    href="mailto:hello@daltonponder.com"
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
                                <span>Dalton Ponder</span>
                                <span className="w-8 h-px bg-accent" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section >
        </>
    );
}
