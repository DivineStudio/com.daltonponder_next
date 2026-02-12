import Link from "next/link";
import Image from "next/image";
import { BentoCard, BentoGrid } from "../ui/BentoGrid";
import { TerminalTyping } from "../ui/TerminalTyping";
import { TextScramble } from "../ui/TextScramble";
import { getTranslations } from "next-intl/server";
import { ClientMotionDiv } from "../ui/ClientMotionDiv";
import { Icon } from "@iconify/react";
import { SOCIAL_LINKS } from "@/lib/constants";

const HERO_ICONS = {
    code: "tabler:code",
    security: "tabler:shield-lock",
    cloud: "tabler:cloud",
    ai: "tabler:brain",
    sitefinity: "logos:progress",
    linkedin: "tabler:brand-linkedin",
    github: "tabler:brand-github",
};

export async function HeroSection() {
    const t = await getTranslations("Home.Hero");
    const tSocial = await getTranslations("Contact.Social");
    const tNav = await getTranslations("Navigation");

    interface Skill {
        icon: keyof typeof HERO_ICONS;
        title: string;
        color: string;
        bgColor: string;
        details?: string[];
        imageSrc?: string;
    }

    const skills: Skill[] = [
        {
            icon: "code",
            title: t("Skills.FullStack"),
            color: "var(--color-accent)",
            bgColor: "var(--color-skill-bg-accent)",
        },
        {
            icon: "security",
            title: t("Skills.Security"),
            color: "var(--color-primary)",
            bgColor: "var(--color-skill-bg-primary)",
        },
        {
            icon: "cloud",
            title: t("Skills.Cloud"),
            color: "var(--color-accent)",
            bgColor: "var(--color-skill-bg-accent)",
            details: t("Skills.CloudDetails").split(" • "),
        },
        {
            icon: "ai",
            title: t("Skills.AI"),
            color: "var(--color-primary)",
            bgColor: "var(--color-skill-bg-primary)",
        },
        {
            icon: "sitefinity",
            title: t("Skills.Sitefinity"),
            color: "#5ce500",
            bgColor: "var(--color-skill-bg-sitefinity)",
        },
    ];

    const quickLinks = [
        { href: SOCIAL_LINKS.linkedin, label: tSocial("LinkedIn"), icon: "linkedin" as keyof typeof HERO_ICONS },
        { href: SOCIAL_LINKS.github, label: tSocial("GitHub"), icon: "github" as keyof typeof HERO_ICONS },
    ];

    const terminalLines = [
        t("Terminal.Line1"),
        t("Terminal.Line2"),
        t("Terminal.Line3"),
    ];

    return (
        <section className="section min-h-screen flex items-center pt-24 md:pt-32" aria-labelledby="hero-heading">
            <div className="container">
                <BentoGrid columns={4} gap="md" className="auto-rows-auto">
                    {/* Main Intro Card - 2 cols, 2 rows */}
                    <BentoCard colSpan={2} rowSpan={2} delay={0} animate={false} className="flex flex-col justify-center">
                        <p className="text-muted text-lg mb-2">{t("Greeting")}</p>
                        <h1 id="hero-heading" className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
                            <TextScramble text={t("Name")} />
                        </h1>
                        <TerminalTyping lines={terminalLines} className="mb-6" />
                        <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                            {t("Description")}
                        </p>
                        <Link href="/contact" className="btn-primary inline-flex items-center gap-2 w-fit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                            {t("CTA")}
                        </Link>
                    </BentoCard>

                    {/* Skill Cards */}
                    {skills.slice(0, 2).map((skill, index) => (
                        <BentoCard key={skill.title} delay={0.1 + index * 0.1} className="flex flex-col items-center justify-center">
                            <ClientMotionDiv
                                className="flex flex-col gap-4 items-center text-center"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: skill.bgColor }}
                                >
                                    {skill.imageSrc ? (
                                        <Image
                                            src={skill.imageSrc}
                                            alt={skill.title}
                                            width={24}
                                            height={24}
                                            className="h-6 w-6 object-contain"
                                        />
                                    ) : (
                                        <Icon icon={HERO_ICONS[skill.icon]} width={24} height={24} style={{ color: skill.color }} />
                                    )}
                                </div>
                                <p className="font-mono font-semibold">{skill.title}</p>
                            </ClientMotionDiv>
                        </BentoCard>
                    ))}

                    {/* Cloud Architecture Card - Row 2 Right */}
                    <BentoCard colSpan={2} delay={0.3} className="flex flex-col items-center justify-center">
                        <ClientMotionDiv
                            className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left"
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                                style={{ backgroundColor: skills[2].bgColor }}
                            >
                                <Icon icon={HERO_ICONS[skills[2].icon]} width={24} height={24} style={{ color: skills[2].color }} />
                            </div>
                            <div>
                                <p className="font-mono font-semibold mb-2">{skills[2].title}</p>
                                <p className="text-sm text-muted">
                                    {skills[2].details?.join(" • ")}
                                </p>
                            </div>
                        </ClientMotionDiv>
                    </BentoCard>

                    {/* Quick Links Card - Row 3 Left */}
                    <BentoCard colSpan={2} delay={0.4} className="flex flex-col items-center justify-center order-last lg:order-none">
                        <p className="font-mono font-semibold mb-4 text-center">{t("QuickLinks")}</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {quickLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline text-sm flex items-center gap-2"
                                    aria-label={`${link.label} ${tNav("Aria.OpensNewTab")}`}
                                >
                                    <Icon icon={HERO_ICONS[link.icon]} width={16} height={16} />
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </BentoCard>

                    {/* Additional Skills - Row 3 Right */}
                    {skills.slice(3, 5).map((skill, index) => (
                        <BentoCard key={skill.title} delay={0.5 + index * 0.1} className="flex flex-col items-center justify-center">
                            <ClientMotionDiv
                                className="flex flex-col gap-4 items-center text-center"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: skill.bgColor }}
                                >
                                    {skill.imageSrc ? (
                                        <Image
                                            src={skill.imageSrc}
                                            alt={skill.title}
                                            width={24}
                                            height={24}
                                            className="h-6 w-6 object-contain"
                                        />
                                    ) : (
                                        <Icon icon={HERO_ICONS[skill.icon]} width={24} height={24} style={{ color: skill.color }} />
                                    )}
                                </div>
                                <p className="font-mono font-semibold">{skill.title}</p>
                            </ClientMotionDiv>
                        </BentoCard>
                    ))}


                </BentoGrid>
            </div>
        </section>
    );
}
