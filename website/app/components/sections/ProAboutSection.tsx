"use client";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface ProAboutSectionProps {
    summary?: boolean;
}

export function ProAboutSection({ summary = true }: ProAboutSectionProps) {
    return (
        <section className="section p-0 overflow-hidden">
            {/* Maroon Accent Break */}
            <motion.div
                initial={{ x: "-100%" }}
                whileInView={{ x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-primary py-16 md:py-24"
            >
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="font-mono text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
                    >
                        I BUILD SECURE, SCALABLE SOFTWARE
                        <br />
                        <span className="text-[var(--color-secondary)]">
                            THAT SOLVES REAL PROBLEMS.
                        </span>
                    </motion.h2>
                </div>
            </motion.div>

            {/* Supporting Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="container py-12 md:py-16"
            >
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-lg md:text-xl leading-relaxed mb-8">
                        With over a decade of experience in software development and
                        cybersecurity, I specialize in building robust applications that
                        prioritize security without compromising on user experience. From
                        enterprise solutions to startup MVPs, I bring a methodical approach
                        to solving complex technical challenges.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a
                            href="https://linkedin.com/in/daltonponder"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline flex items-center gap-2"
                        >
                            <Icon icon="tabler:brand-linkedin" width={20} height={20} />
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/daltonponder"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline flex items-center gap-2"
                        >
                            <Icon icon="tabler:brand-github" width={20} height={20} />
                            GitHub
                        </a>
                    </div>

                    {summary && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                            className="mt-8"
                        >
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                            >
                                Learn More About Me
                                <Icon icon="tabler:arrow-right" width={16} height={16} />
                            </Link>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </section>
    );
}
