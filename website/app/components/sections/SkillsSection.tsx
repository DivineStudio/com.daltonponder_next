"use client";
import { useTranslations } from "next-intl";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { BentoCard, BentoGrid } from "../ui/BentoGrid";
import { Marquee, MarqueeItem } from "../ui/Marquee";

function SkillBadge({ skill }: { skill: { name: string; icon: string } }) {
    return (
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] transition-transform hover:scale-105 whitespace-nowrap">
            <Icon icon={skill.icon} width={24} height={24} />
            <span className="font-mono text-sm">{skill.name}</span>
        </div>
    );
}

interface SkillsSectionProps {
    summary?: boolean;
}

interface Skill {
    name: string;
    icon?: string;
    imageSrc?: string;
}

const primarySkills: Skill[] = [
    { name: "C#", icon: "devicon:csharp" },
    { name: ".NET Full-Stack", icon: "devicon:dotnetcore" },
    { name: "Sitefinity", icon: "logos:progress" },
    { name: "Vue", icon: "devicon:vuejs" },
    { name: "Nuxt.js", icon: "devicon:nuxtjs" },
    { name: "React", icon: "devicon:react" },
    { name: "Next.js", icon: "devicon:nextjs" },
];

const secondarySkillsRow1 = [
    { name: "Wix", icon: "devicon:wix" },
    { name: "Agentic AI", icon: "ri:code-ai-fill" },
    { name: "Azure DevOps", icon: "devicon:azuredevops" },
    { name: "Alpine.js", icon: "devicon:alpinejs" },
    { name: "Node.js", icon: "devicon:nodejs" },
    { name: "PostgreSQL", icon: "devicon:postgresql" },
    { name: "MSSQL", icon: "devicon:azuresqldatabase" },
];

const secondarySkillsRow2 = [
    { name: "Agile", icon: "iconoir:agile" },
    { name: "Git", icon: "devicon:git" },
    { name: "SSMS", imageSrc: "/skillLogos/ssms_21.webp" },
    { name: "REST API" },
    { name: "TypeScript", icon: "devicon:typescript" },
    { name: "BMAD" },
    { name: "Tailwind", icon: "devicon:tailwindcss" },
];

export function SkillsSection({ summary = true }: SkillsSectionProps) {
    const t = useTranslations("Home.SkillsSection");
    return (
        <section className="section bg-[var(--color-base-200)]" aria-labelledby="skills-heading">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 id="skills-heading" className="font-mono text-3xl md:text-4xl font-bold text-primary mb-4">
                        {t("Header")}
                    </h2>
                    <p className="text-muted text-lg max-w-2xl">
                        {t("SubHeader")}
                    </p>
                </motion.div>

                {/* Primary Skills - Bento Grid */}
                <BentoGrid columns={4} gap="md" className="mb-8 auto-rows-fr">
                    {/* Label Card */}
                    <BentoCard variant="secondary" delay={0}>
                        <h3 className="font-mono text-lg font-semibold text-primary mb-2">
                            {t("Search.Primary")}
                        </h3>
                        <p className="text-sm text-muted">
                            {t("Search.PrimaryDescription")}
                        </p>
                    </BentoCard>

                    {/* Skill Badges */}
                    {primarySkills.map((skill, index) => (
                        <BentoCard key={skill.name} delay={0.1 + index * 0.05}>
                            <motion.div
                                className="flex items-center gap-3"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {skill.imageSrc ? (
                                    <Image
                                        src={skill.imageSrc}
                                        alt={skill.name}
                                        width={32}
                                        height={32}
                                        className="object-contain"
                                    />
                                ) : (
                                    <Icon icon={skill.icon!} width={32} height={32} />
                                )}
                                <span className="font-mono font-semibold">{skill.name}</span>
                            </motion.div>
                        </BentoCard>
                    ))}
                </BentoGrid>

                {/* Secondary Skills - Carousel */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <p className="text-muted">{t("Search.More")}</p>

                    <Marquee speed="normal" pauseOnHover={true}>
                        {secondarySkillsRow1.map((skill) => (
                            <MarqueeItem key={skill.name}>
                                <div className="flex items-center gap-2">
                                    <Icon icon={skill.icon} width={24} height={24} />
                                    <span className="font-mono text-sm">{skill.name}</span>
                                </div>
                            </MarqueeItem>
                        ))}
                    </Marquee>

                    <Marquee direction="right" speed="slow" pauseOnHover={true}>
                        {secondarySkillsRow2.map((skill) => (
                            <MarqueeItem key={skill.name}>
                                <div className="flex items-center gap-2">
                                    {skill.imageSrc ? (
                                        <Image
                                            src={skill.imageSrc}
                                            alt={skill.name}
                                            width={24}
                                            height={24}
                                            className="object-contain"
                                        />
                                    ) : skill.icon ? (
                                        <Icon icon={skill.icon} width={24} height={24} />
                                    ) : null}
                                    <span className="font-mono text-sm">{skill.name}</span>
                                </div>
                            </MarqueeItem>
                        ))}
                    </Marquee>
                </motion.div>

                {summary && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-8 text-center"
                    >
                        <Link
                            href="/skills"
                            className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                        >
                            {t("Search.ViewAll")}
                            <Icon icon="tabler:arrow-right" width={16} height={16} />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
