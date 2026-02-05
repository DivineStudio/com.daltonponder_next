"use client";
import { useTranslations } from "next-intl";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { BentoCard, BentoGrid } from "../ui/BentoGrid";

interface CredentialsSectionProps {
    summary?: boolean;
}

interface CountUpProps {
    end: number;
    suffix?: string;
    duration?: number;
}

function CountUp({ end, suffix = "", duration = 2 }: CountUpProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, end, duration]);

    return (
        <span ref={ref}>
            <span aria-hidden="true">{count}{suffix}</span>
            <span className="sr-only">{end}{suffix}</span>
        </span>
    );
}

export function CredentialsSection({ summary = true }: CredentialsSectionProps) {
    const t = useTranslations("Home.EdCertSection");

    const stats = [
        {
            label: t("EducationHeader"),
            value: 3,
            icon: "tabler:school",
            description: "Bachelor's & Master's degrees",
        },
        {
            label: t("CertificationsHeader"),
            value: 3,
            icon: "tabler:certificate",
            description: "Industry-recognized certs",
        },
        {
            label: "Years Experience",
            value: 8,
            suffix: "+",
            icon: "tabler:calendar",
            description: "Building software solutions",
        },
    ];

    const certifications = [
        { name: "Certified Ethical Hacker", issuer: "EC-Council", year: "2023" },
        { name: "Certified Sitefinity Developer ", issuer: "Progress", year: "2024" },
        { name: "Certified Sitefinity .NET Core Developer", issuer: "Progress", year: "2023" },
    ];
    return (
        <section className="section" aria-labelledby="credentials-heading">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 id="credentials-heading" className="font-mono text-3xl md:text-4xl font-bold text-primary mb-4">
                        {t("Header")}
                    </h2>
                    <p className="text-muted text-lg max-w-2xl">
                        {t("SubHeader")}
                    </p>
                </motion.div>

                <BentoGrid columns={3} gap="md">
                    {stats.map((stat, index) => (
                        <BentoCard key={stat.label} delay={index * 0.1}>
                            <div className="text-center">
                                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-secondary)] flex items-center justify-center">
                                    <Icon icon={stat.icon} width={24} height={24} className="text-primary" />
                                </div>
                                <p className="font-mono text-4xl md:text-5xl font-bold text-primary mb-2">
                                    <CountUp end={stat.value} suffix={stat.suffix} />
                                </p>
                                <p className="font-mono font-semibold mb-1">{stat.label}</p>
                                <p className="text-sm text-muted">{stat.description}</p>
                            </div>
                        </BentoCard>
                    ))}
                </BentoGrid>

                {!summary && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12"
                    >
                        <h3 className="font-mono text-xl font-semibold mb-6">Certifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {certifications.map((cert: { name: string; issuer: string; year: string }, index: number) => (
                                <motion.div
                                    key={cert.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bento-card"
                                >
                                    <div className="flex items-start gap-3">
                                        <Icon icon="tabler:certificate" width={24} height={24} className="text-accent shrink-0" />
                                        <div>
                                            <h4 className="font-semibold">{cert.name}</h4>
                                            <p className="text-sm text-muted">{cert.issuer} • {cert.year}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {summary && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-8 text-center"
                    >
                        <Link
                            href="/credentials"
                            className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                        >
                            View All Credentials
                            <Icon icon="tabler:arrow-right" width={16} height={16} />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
