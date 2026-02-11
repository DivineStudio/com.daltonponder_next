import { Icon } from "@iconify/react";
import Link from "next/link";
import { BentoCard, BentoGrid } from "../ui/BentoGrid";
import { getTranslations } from "next-intl/server";
import { CountUp } from "../ui/CountUp";
import { ClientMotionDiv } from "../ui/ClientMotionDiv";

interface CredentialsSectionProps {
    summary?: boolean;
}

export async function CredentialsSection({ summary = true }: CredentialsSectionProps) {
    const t = await getTranslations("Home.EdCertSection");

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
                <ClientMotionDiv
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
                </ClientMotionDiv>

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
                    <ClientMotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12"
                    >
                        <h3 className="font-mono text-xl font-semibold mb-6">Certifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {certifications.map((cert: { name: string; issuer: string; year: string }, index: number) => (
                                <ClientMotionDiv
                                    key={cert.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bento-card"
                                >
                                    <div className="flex items-start gap-3">
                                        <Icon icon="tabler:certificate" width={24} height={24} className="text-accent shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-semibold">{cert.name}</h4>
                                            <p className="text-sm text-muted">{cert.issuer} • {cert.year}</p>
                                        </div>
                                    </div>
                                </ClientMotionDiv>
                            ))}
                        </div>
                    </ClientMotionDiv>
                )}

                {summary && (
                    <ClientMotionDiv
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
                    </ClientMotionDiv>
                )}
            </div>
        </section>
    );
}
