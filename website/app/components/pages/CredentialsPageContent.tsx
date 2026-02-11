"use client";
import { useTranslations } from "next-intl";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

export function CredentialsPageContent() {
    const t = useTranslations("Credentials");
    const tNav = useTranslations("Navigation");

    const workExperience = t.raw("WorkExperience.List");
    const certifications = t.raw("Certifications.List");
    const education = t.raw("Education.List");
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

                        {/* Stats Cards */}
                        <div className="flex gap-4">
                            {[
                                { value: "8+", id: "Years Exp" },
                                { value: "3", id: "Certs" },
                                { value: "MS", id: "Degree" },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl px-6 py-4 text-center"
                                >
                                    <div className="font-mono text-3xl font-bold text-[var(--color-hero-accent)]">
                                        {stat.value}
                                    </div>
                                    <div className="text-[var(--color-hero-muted)] text-sm">{t(`Stats.${stat.id}`)}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--background)] to-transparent" />
            </section>

            {/* Work Experience Section */}
            <section className="section">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-mono text-2xl md:text-3xl font-bold mb-8"
                    >
                        {t("WorkExperience.Header")}
                    </motion.h2>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Line */}
                        <div className="absolute left-3 top-0 bottom-0 w-1 bg-[var(--card-border)]" />

                        <div className="space-y-6">
                            {workExperience.map((job: { title: string; company: string; dates: string; current: boolean; bullets: string[] }, index: number) => (
                                <motion.div
                                    key={job.title + job.company}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative pl-10"
                                >
                                    {/* Dot */}
                                    <div
                                        className={`absolute left-0 top-6 w-7 h-7 rounded-full ${job.current
                                            ? "bg-[var(--color-primary)] border-2 border-[var(--color-primary)]"
                                            : "bg-[var(--color-base-200)] border-2 border-[var(--card-border)]"
                                            } flex items-center justify-center`}
                                    >
                                        {job.current && (
                                            <div className="w-2 h-2 bg-white rounded-full" />
                                        )}
                                    </div>

                                    <div className={`bento-card ${job.current ? "" : "opacity-80"}`}>
                                        <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                                            <div>
                                                <h3 className={`font-mono text-xl font-semibold ${job.current ? "" : "text-muted"}`}>
                                                    {job.title}
                                                </h3>
                                                <p className="text-[var(--color-accent)] font-medium">
                                                    {job.company}
                                                </p>
                                            </div>
                                            <span className="text-muted text-sm">{job.dates}</span>
                                        </div>
                                        <ul className="space-y-1 text-muted text-sm">
                                            {job.bullets.map((bullet: string, i: number) => (
                                                <li key={i} className="flex items-baseline gap-2">
                                                    <span className="shrink-0">•</span>
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <section className="section bg-[var(--color-base-200)]">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-mono text-2xl md:text-3xl font-bold mb-8"
                    >
                        {t("Education.Header")}
                    </motion.h2>

                    <div className="space-y-6 max-w-3xl">
                        {education.map((edu: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bento-card"
                            >
                                <div className="flex items-start gap-6">
                                    <div className={`w-20 h-20 rounded-xl flex items-center justify-center shrink-0 overflow-hidden ${edu.bgTheme === "Light" ? "bg-[#f5f5f5]" : "bg-[#1a1a2e]"}`}>
                                        {edu.imageSrc ? (
                                            <Image
                                                src={edu.imageSrc}
                                                alt={edu.imageAlt || edu.University}
                                                width={80}
                                                height={80}
                                                className="object-contain p-2"
                                            />
                                        ) : (
                                            <Icon icon={edu.icon || "tabler:school"} width={40} height={40} className={edu.bgTheme === "Light" ? "text-gray-800" : "text-white"} />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-mono text-xl font-semibold mb-1">
                                            {edu.Degree}
                                        </h3>
                                        {edu.Specialization && (
                                            <p className="text-sm text-muted mb-1">Specialization: <strong>{edu.Specialization}</strong></p>
                                        )}
                                        <p className="text-[var(--color-accent)] font-medium mb-2">{edu.University}</p>
                                        <p className="text-muted text-sm mb-4">{edu.YearLabel || "Graduated"} {edu.Year}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {edu.Coursework && edu.Coursework.map((course: string) => (
                                                <span
                                                    key={course}
                                                    className="px-4 py-1.5 rounded-full bg-[var(--color-base-200)] text-sm text-muted"
                                                >
                                                    {course}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications Section */}
            <section className="section">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-mono text-2xl md:text-3xl font-bold mb-8"
                    >
                        {t("Certifications.Header") || "Certifications"}
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certifications.map((cert: { name: string; issuer: string; year: string; icon?: string; imageSrc?: string; imageAlt?: string; bgTheme?: string }, index: number) => (
                            <motion.div
                                key={cert.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="bento-card group"
                            >
                                <div className="flex items-baseline gap-4">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 overflow-hidden ${cert.bgTheme === "Light" ? "bg-[#f5f5f5]" : "bg-[#1a1a2e]"}`}
                                    >
                                        {cert.imageSrc ? (
                                            <Image
                                                src={cert.imageSrc}
                                                alt={cert.imageAlt || cert.name}
                                                width={48}
                                                height={48}
                                                className="object-contain p-2"
                                            />
                                        ) : cert.icon ? (
                                            <Icon icon={cert.icon} width={24} height={24} className={cert.bgTheme === "Light" ? "text-gray-800" : "text-white"} />
                                        ) : (
                                            <Icon icon="tabler:certificate" width={24} height={24} className={cert.bgTheme === "Light" ? "text-gray-800" : "text-white"} />
                                        )}
                                    </motion.div>
                                    <div>
                                        <h3 className="font-mono font-semibold mb-1">{cert.name}</h3>
                                        <p className="text-sm text-muted">{cert.issuer}</p>
                                        <p className="text-xs text-accent font-bold">{cert.year}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-[var(--color-base-200)]">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-x-4"
                    >
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 btn-primary"
                        >
                            {t("CTA.Contact")}
                            <Icon icon="tabler:arrow-right" width={20} height={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
