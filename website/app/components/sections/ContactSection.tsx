"use client";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { BentoCard, BentoGrid } from "../ui/BentoGrid";
import { useTranslations } from "next-intl";
import { ContactForm, contactSubjectKeys } from "../ui/ContactForm";

interface ContactSectionProps {
    summary?: boolean;
}

// Re-export for backwards compatibility
export { contactSubjectKeys };

const socialLinks = [
    { href: "https://www.linkedin.com/in/dalton-ponder-99a96a131", icon: "tabler:brand-linkedin", label: "LinkedIn" },
    { href: "https://github.com/DivineStudio", icon: "tabler:brand-github", label: "GitHub" },
];

export function ContactSection({ summary = true }: ContactSectionProps) {
    const t = useTranslations("Home.ContactSection");

    if (summary) {
        return (
            <section className="section bg-[var(--color-base-200)]" aria-labelledby="contact-heading-summary">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <h2 id="contact-heading-summary" className="font-mono text-3xl md:text-4xl font-bold text-primary mb-4">
                            {t("Summary.Header")}
                        </h2>
                        <p className="text-muted text-lg mb-8">
                            {t("Summary.SubHeader")}
                        </p>
                        <motion.a
                            href="/contact"
                            className="btn-primary inline-flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Icon icon="tabler:mail" width={20} height={20} />
                            {t("Summary.CTA")}
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="section" aria-labelledby="contact-heading">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 id="contact-heading" className="font-mono text-3xl md:text-4xl font-bold text-primary mb-4">
                        {t("Main.Header")}
                    </h2>
                    <p className="text-muted text-lg max-w-2xl">
                        {t("Main.SubHeader")}
                    </p>
                </motion.div>

                <BentoGrid columns={3} gap="md">
                    {/* Contact Info Card */}
                    <BentoCard variant="secondary" delay={0}>
                        <div className="h-full flex flex-col justify-between">
                            <div>
                                <Icon
                                    icon="tabler:mail"
                                    width={40}
                                    height={40}
                                    className="text-primary mb-4"
                                />
                                <h3 className="font-mono text-lg font-semibold mb-2">
                                    {t("Card.Header")}
                                </h3>
                                <p className="text-sm text-muted mb-6">
                                    {t("Card.Description")}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-outline text-sm flex items-center gap-2"
                                    >
                                        <Icon icon={link.icon} width={16} height={16} />
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </BentoCard>

                    {/* Contact Form */}
                    <BentoCard colSpan={2} delay={0.1}>
                        <ContactForm useCaptcha={false} />
                    </BentoCard>
                </BentoGrid>
            </div>
        </section>
    );
}
