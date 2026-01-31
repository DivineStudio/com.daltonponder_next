"use client";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { BentoCard, BentoGrid } from "../ui/BentoGrid";

interface PersonalAboutSectionProps {
    summary?: boolean;
}

const interests = [
    {
        category: "What Drives Me",
        items: [
            { icon: "tabler:users", label: "Family", description: "Time with family is my greatest joy" },
            { icon: "tabler:music", label: "Music", description: "Music offers daily solace" },
            { icon: "tabler:book", label: "Reading", description: "Continuous learning through books" },
        ],
    },
    {
        category: "How I Lead",
        items: [
            {
                icon: "tabler:brain",
                label: "Stoic Principles",
                description: "I draw on Stoic philosophy for leadership and decision-making",
            },
        ],
    },
    {
        category: "Beyond Work",
        items: [
            { icon: "tabler:language", label: "Spanish", description: "Bilingual in English and Spanish" },
            { icon: "tabler:device-gamepad-2", label: "Gaming", description: "Strategy and RPG enthusiast" },
            { icon: "tabler:boxing-glove", label: "Boxing", description: "Staying fit through boxing" },
        ],
    },
];

export function PersonalAboutSection({ summary = true }: PersonalAboutSectionProps) {
    const displayInterests = summary ? interests.slice(0, 2) : interests;

    return (
        <section className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 className="font-mono text-3xl md:text-4xl font-bold text-primary mb-4">
                        BEYOND THE CODE
                    </h2>
                    <p className="text-muted text-lg max-w-2xl">
                        A glimpse into who I am outside of work.
                    </p>
                </motion.div>

                <BentoGrid columns={3} gap="md">
                    {displayInterests.map((interestGroup, groupIndex) => (
                        <BentoCard
                            key={interestGroup.category}
                            colSpan={groupIndex === 1 ? 1 : 1}
                            delay={groupIndex * 0.1}
                            variant={groupIndex === 0 ? "secondary" : "default"}
                        >
                            <h3 className="font-mono text-lg font-semibold text-primary mb-4">
                                {interestGroup.category}
                            </h3>
                            <div className="space-y-4">
                                {interestGroup.items.map((item) => (
                                    <div key={item.label} className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-[var(--color-base-200)] flex items-center justify-center shrink-0">
                                            <Icon
                                                icon={item.icon}
                                                width={20}
                                                height={20}
                                                className="text-accent"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{item.label}</p>
                                            <p className="text-xs text-muted">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </BentoCard>
                    ))}

                    {/* Quote Card */}
                    <BentoCard delay={0.3}>
                        <div className="h-full flex flex-col justify-center">
                            <Icon
                                icon="tabler:quote"
                                width={32}
                                height={32}
                                className="text-primary mb-4"
                            />
                            <blockquote className="font-serif text-lg italic mb-4">
                                &ldquo;The impediment to action advances action. What stands in
                                the way becomes the way.&rdquo;
                            </blockquote>
                            <p className="text-sm text-muted">— Marcus Aurelius</p>
                        </div>
                    </BentoCard>
                </BentoGrid>
            </div>
        </section>
    );
}
