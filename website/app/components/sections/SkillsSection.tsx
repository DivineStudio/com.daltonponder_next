"use client";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { BentoCard, BentoGrid } from "../ui/BentoGrid";
import { Marquee, MarqueeItem } from "../ui/Marquee";

interface SkillsSectionProps {
    summary?: boolean;
}

const primarySkills = [
    { name: "C#", icon: "devicon:csharp", color: "#9B4F96" },
    { name: "JavaScript", icon: "devicon:javascript", color: "#F0DB4F" },
    { name: "TypeScript", icon: "devicon:typescript", color: "#3178C6" },
    { name: "React", icon: "devicon:react", color: "#61DAFB" },
    { name: "Next.js", icon: "devicon:nextjs", color: "#000000" },
    { name: ".NET", icon: "devicon:dotnetcore", color: "#512BD4" },
];

const secondarySkillsRow1 = [
    { name: "Docker", icon: "devicon:docker" },
    { name: "AWS", icon: "devicon:amazonwebservices-wordmark" },
    { name: "Azure", icon: "devicon:azure" },
    { name: "Python", icon: "devicon:python" },
    { name: "Node.js", icon: "devicon:nodejs" },
    { name: "PostgreSQL", icon: "devicon:postgresql" },
    { name: "MongoDB", icon: "devicon:mongodb" },
];

const secondarySkillsRow2 = [
    { name: "Kubernetes", icon: "devicon:kubernetes" },
    { name: "Git", icon: "devicon:git" },
    { name: "GitHub Actions", icon: "devicon:githubactions" },
    { name: "Terraform", icon: "devicon:terraform" },
    { name: "GraphQL", icon: "devicon:graphql" },
    { name: "Redis", icon: "devicon:redis" },
    { name: "Tailwind", icon: "devicon:tailwindcss" },
];

export function SkillsSection({ summary = true }: SkillsSectionProps) {
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
                        SKILLS
                    </h2>
                    <p className="text-muted text-lg max-w-2xl">
                        Technologies and tools I work with daily.
                    </p>
                </motion.div>

                {/* Primary Skills - Bento Grid */}
                <BentoGrid columns={4} gap="md" className="mb-8">
                    {/* Label Card */}
                    <BentoCard variant="secondary" delay={0}>
                        <h3 className="font-mono text-lg font-semibold text-primary mb-2">
                            PRIMARY
                        </h3>
                        <p className="text-sm text-muted">
                            Languages and frameworks I work with daily
                        </p>
                    </BentoCard>

                    {/* Skill Badges */}
                    {primarySkills.slice(0, summary ? 3 : 6).map((skill, index) => (
                        <BentoCard key={skill.name} delay={0.1 + index * 0.05}>
                            <motion.div
                                className="flex items-center gap-3"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Icon icon={skill.icon} width={32} height={32} />
                                <span className="font-mono font-semibold">{skill.name}</span>
                            </motion.div>
                        </BentoCard>
                    ))}
                </BentoGrid>

                {/* Secondary Skills - Marquee */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                >
                    <p className="text-muted">And many more...</p>

                    <Marquee direction="left" speed="normal">
                        {secondarySkillsRow1.map((skill) => (
                            <MarqueeItem key={skill.name}>
                                <Icon icon={skill.icon} width={24} height={24} />
                                <span className="font-mono text-sm">{skill.name}</span>
                            </MarqueeItem>
                        ))}
                    </Marquee>

                    <Marquee direction="right" speed="normal">
                        {secondarySkillsRow2.map((skill) => (
                            <MarqueeItem key={skill.name}>
                                <Icon icon={skill.icon} width={24} height={24} />
                                <span className="font-mono text-sm">{skill.name}</span>
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
                            View All Skills
                            <Icon icon="tabler:arrow-right" width={16} height={16} />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
