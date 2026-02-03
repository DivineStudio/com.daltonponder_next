"use client";
import { useTranslations } from "next-intl";

import { Icon } from "@iconify/react";
import Link from "next/link";



export function Footer() {
    const t = useTranslations("Footer");
    const tNav = useTranslations("Navigation");
    const tImg = useTranslations("Image");
    const tSocial = useTranslations("Contact.Social");
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            href: "https://www.linkedin.com/in/dalton-ponder-99a96a131",
            icon: "tabler:brand-linkedin",
            label: tSocial("LinkedIn"),
        },
        {
            href: "https://github.com/DivineStudio",
            icon: "tabler:brand-github",
            label: tSocial("GitHub"),
        },
    ];
    const footerLinks = [
        { href: "/", label: tNav("Home") },
        { href: "/about", label: tNav("About") },
        { href: "/skills", label: tNav("Skills") },
        { href: "/credentials", label: tNav("Credentials") },
        { href: "/contact", label: tNav("Contact") },
    ];

    return (
        <footer className="border-t border-[var(--card-border)] bg-[var(--card-bg)]">
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <img
                                src="/logos/DP Logo.svg"
                                alt={tImg("DaltonPonderLogoAlt")}
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-sm text-muted max-w-xs">
                            {t("Tagline")}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted hover:text-accent transition-colors link-underline"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="space-y-4">
                        <p className="font-mono font-semibold">{t("Connect")}</p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-lg flex items-center justify-center border border-[var(--card-border)] hover:border-[var(--color-accent)] hover:text-accent transition-colors"
                                    aria-label={`${link.label} ${tNav("Aria.OpensNewTab")}`}
                                >
                                    <Icon icon={link.icon} width={20} height={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-[var(--card-border)]">
                    <p className="text-sm text-center text-muted">
                        {t("Copyright", { year: currentYear.toString() })}
                    </p>
                </div>
            </div>
        </footer>
    );
}
