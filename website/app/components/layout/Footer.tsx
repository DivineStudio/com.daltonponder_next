"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

const socialLinks = [
    {
        href: "https://linkedin.com/in/daltonponder",
        icon: "tabler:brand-linkedin",
        label: "LinkedIn",
    },
    {
        href: "https://github.com/daltonponder",
        icon: "tabler:brand-github",
        label: "GitHub",
    },
];

const footerLinks = [
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/credentials", label: "Credentials" },
    { href: "/contact", label: "Contact" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-[var(--card-border)] bg-[var(--card-bg)]">
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="font-mono text-2xl font-bold text-primary">
                                DP
                            </span>
                        </Link>
                        <p className="text-sm text-muted max-w-xs">
                            Full-stack developer and cybersecurity expert crafting secure,
                            scalable solutions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <p className="font-mono font-semibold">Quick Links</p>
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
                        <p className="font-mono font-semibold">Connect</p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-lg flex items-center justify-center border border-[var(--card-border)] hover:border-[var(--color-accent)] hover:text-accent transition-colors"
                                    aria-label={`${link.label} (opens in new tab)`}
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
                        © {currentYear} Dalton Ponder. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
