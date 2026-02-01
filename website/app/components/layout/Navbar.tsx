"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { ThemeToggler } from "../ui/ThemeToggler";
import { LanguageToggler } from "../ui/LanguageToggler";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/credentials", label: "Credentials" },
    { href: "/contact", label: "Contact" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${isScrolled ? "navbar-solid" : "navbar-transparent"
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <nav className="container flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-mono text-xl font-bold text-primary">
                            DP
                        </span>
                        <span className="hidden sm:inline font-mono text-sm text-muted">
                            Dalton Ponder
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <ul className="flex items-center gap-6">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm font-medium hover:text-accent transition-colors link-underline"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-3">
                            <ThemeToggler />
                            <LanguageToggler />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--card-bg)] transition-colors"
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <Icon
                            icon={isMobileMenuOpen ? "tabler:x" : "tabler:menu-2"}
                            width={24}
                            height={24}
                        />
                    </button>
                </nav>
            </motion.header>


            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 bg-[var(--background)] md:hidden"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
                            <ul className="flex flex-col items-center gap-6">
                                {navLinks.map((link, index) => (
                                    <motion.li
                                        key={link.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="text-2xl font-mono font-medium hover:text-accent transition-colors link-underline"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="flex items-center gap-4 mt-8">
                                <ThemeToggler />
                                <LanguageToggler />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
