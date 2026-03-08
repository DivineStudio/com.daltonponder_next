"use client";

import { motion } from "motion/react";
import { PricingSection } from "../sections/PricingSection";

export function FreelancePageContent() {
    return (
        <>
            {/* Hero Section - matches Credentials/Contact pattern */}
            <section className="relative bg-[var(--color-hero-bg)] pt-32 pb-16 overflow-hidden">
                <div className="container relative z-10">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                        <motion.div
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-hero-text)] mb-4">
                                Freelance Services
                            </h1>
                            <p className="text-[var(--color-hero-muted)] text-lg md:text-xl max-w-xl mb-6">
                                Bespoke web development, delivered as a managed service. Zero upfront cost, world-class infrastructure.
                            </p>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="h-1 w-32 bg-[var(--color-hero-accent)] origin-left"
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--background)] to-transparent" />
            </section>

            {/* Pricing Cards + Add-Ons + Ownership */}
            <PricingSection />
        </>
    );
}
