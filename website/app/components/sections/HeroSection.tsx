"use client";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { BentoCard, BentoGrid } from "../ui/BentoGrid";

const skills = [
    {
        icon: "tabler:code",
        title: "Full-Stack Development",
        color: "var(--color-accent)",
        bgColor: "#E8F4F8",
    },
    {
        icon: "tabler:shield-lock",
        title: "Cybersecurity Expert",
        color: "var(--color-primary)",
        bgColor: "#F5E8E8",
    },
    {
        icon: "tabler:cloud",
        title: "Cloud Architecture & DevOps",
        color: "var(--color-accent)",
        bgColor: "#E8F4F8",
        details: ["AWS", "Azure", "Docker", "Kubernetes"],
    },
];

const quickLinks = [
    { href: "https://linkedin.com/in/daltonponder", label: "LinkedIn", icon: "tabler:brand-linkedin" },
    { href: "https://github.com/daltonponder", label: "GitHub", icon: "tabler:brand-github" },
];

export function HeroSection() {
    return (
        <section className="section min-h-screen flex items-center pt-24 md:pt-32" aria-labelledby="hero-heading">
            <div className="container">
                <BentoGrid columns={4} gap="md" className="auto-rows-auto">
                    {/* Main Intro Card - 2 cols, 2 rows */}
                    <BentoCard colSpan={2} rowSpan={2} delay={0} className="flex flex-col justify-center">
                        <p className="text-muted text-lg mb-2">Hi, I&apos;m</p>
                        <h1 id="hero-heading" className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
                            DALTON PONDER
                        </h1>
                        <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                            Full-stack developer and cybersecurity expert crafting secure,
                            scalable solutions.
                        </p>
                        <Link href="/contact" className="btn-primary inline-flex items-center gap-2 w-fit">
                            <Icon icon="tabler:mail" width={20} height={20} />
                            Get in Touch
                        </Link>
                    </BentoCard>

                    {/* Skill Cards */}
                    {skills.slice(0, 2).map((skill, index) => (
                        <BentoCard key={skill.title} delay={0.1 + index * 0.1}>
                            <motion.div
                                className="flex flex-col gap-4"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: skill.bgColor }}
                                >
                                    <Icon icon={skill.icon} width={24} height={24} style={{ color: skill.color }} />
                                </div>
                                <p className="font-mono font-semibold">{skill.title}</p>
                            </motion.div>
                        </BentoCard>
                    ))}

                    {/* Cloud Architecture Card - Wider */}
                    <BentoCard colSpan={2} delay={0.3}>
                        <motion.div
                            className="flex flex-col md:flex-row items-start md:items-center gap-4"
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                                style={{ backgroundColor: skills[2].bgColor }}
                            >
                                <Icon icon={skills[2].icon} width={24} height={24} style={{ color: skills[2].color }} />
                            </div>
                            <div>
                                <p className="font-mono font-semibold mb-2">{skills[2].title}</p>
                                <p className="text-sm text-muted">
                                    {skills[2].details?.join(" • ")}
                                </p>
                            </div>
                        </motion.div>
                    </BentoCard>

                    {/* Photo Placeholder */}
                    <BentoCard delay={0.4} className="flex items-center justify-center min-h-[200px]">
                        <div className="w-full h-full min-h-[160px] bg-[var(--color-base-200)] rounded-lg flex items-center justify-center border-2 border-dashed border-[var(--card-border)]">
                            <span className="text-muted text-sm">[Photo/Avatar]</span>
                        </div>
                    </BentoCard>

                    {/* Quick Links Card */}
                    <BentoCard delay={0.5}>
                        <p className="font-mono font-semibold mb-4">Quick Links</p>
                        <div className="flex flex-wrap gap-2">
                            {quickLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline text-sm flex items-center gap-2"
                                    aria-label={`${link.label} (opens in new tab)`}
                                >
                                    <Icon icon={link.icon} width={16} height={16} />
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </BentoCard>

                    {/* Location Card */}
                    <BentoCard colSpan={2} delay={0.6} variant="secondary">
                        <div className="flex items-start gap-4">
                            <span className="text-3xl">📍</span>
                            <div>
                                <p className="text-lg font-medium mb-1">Based in Texas, USA</p>
                                <p className="text-muted">Available for remote work worldwide</p>
                                <p className="text-sm text-muted mt-3">
                                    🇺🇸 English • 🇪🇸 Español
                                </p>
                            </div>
                        </div>
                    </BentoCard>
                </BentoGrid>
            </div>
        </section>
    );
}
