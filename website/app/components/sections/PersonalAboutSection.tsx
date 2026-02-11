import { Icon } from "@iconify/react";
import { BentoCard, BentoGrid } from "../ui/BentoGrid";
import { getTranslations } from "next-intl/server";
import { ClientMotionDiv } from "../ui/ClientMotionDiv";

interface PersonalAboutSectionProps {
    summary?: boolean;
}

export async function PersonalAboutSection({ summary = true }: PersonalAboutSectionProps) {
    const t = await getTranslations("Home.PersonalAboutSection");

    const interests = [
        {
            category: t("Interests.Drives.Category"),
            items: [
                { icon: "tabler:users", label: t("Interests.Drives.Family"), description: t("Interests.Drives.FamilyDesc") },
                { icon: "tabler:music", label: t("Interests.Drives.Music"), description: t("Interests.Drives.MusicDesc") },
                { icon: "tabler:book", label: t("Interests.Drives.Reading"), description: t("Interests.Drives.ReadingDesc") },
            ],
        },
        {
            category: t("Interests.Lead.Category"),
            items: [
                {
                    icon: "tabler:brain",
                    label: t("Interests.Lead.Stoic"),
                    description: t("Interests.Lead.StoicDesc"),
                },
                {
                    icon: "tabler:trophy",
                    label: t("Interests.Lead.Leadership"),
                    description: t("Interests.Lead.LeadershipDesc"),
                },
            ],
        },
        {
            category: t("Interests.Beyond.Category"),
            items: [
                { icon: "tabler:language", label: t("Interests.Beyond.Spanish"), description: t("Interests.Beyond.SpanishDesc") },
                { icon: "tabler:keyboard", label: t("Interests.Beyond.Gaming"), description: t("Interests.Beyond.GamingDesc") },
                { icon: "ph:boxing-glove", label: t("Interests.Beyond.Boxing"), description: t("Interests.Beyond.BoxingDesc") },
            ],
        },
    ];

    const displayInterests = interests;

    return (
        <section className="section">
            <div className="container">
                <ClientMotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 className="font-mono text-3xl md:text-4xl font-bold text-primary mb-4">
                        {t("Header")}
                    </h2>
                    <p className="text-muted text-lg max-w-2xl">
                        {t("SubHeader")}
                    </p>
                </ClientMotionDiv>

                <BentoGrid columns={3} gap="md">
                    {displayInterests.map((interestGroup, groupIndex) => (
                        <BentoCard
                            key={interestGroup.category}
                            colSpan={1}
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
                                            <p className="text-xs text-muted font-bold">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </BentoCard>
                    ))}

                    {/* Quote Card */}
                    <BentoCard delay={0.3} colSpan={3}>
                        <div className="h-full flex flex-col justify-center">
                            <Icon
                                icon="tabler:quote"
                                width={32}
                                height={32}
                                className="text-primary mb-4"
                            />
                            <blockquote className="font-serif text-lg italic mb-4">
                                &ldquo;{t("Quote.Text")}&rdquo;
                            </blockquote>
                            <p className="text-sm text-muted">{t("Quote.Author")}</p>
                        </div>
                    </BentoCard>
                </BentoGrid>
            </div>
        </section>
    );
}
