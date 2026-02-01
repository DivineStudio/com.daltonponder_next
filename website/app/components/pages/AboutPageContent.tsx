"use client";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { PhilosophyQuote } from "../ui/PhilosophyQuote";

// Timeline eras data
const eras = [
    {
        title: "The Startup Years",
        emoji: "🚀",
        description: "Fast-paced product development, wearing many hats, building MVPs that shipped weekly.",
        side: "left",
    },
    {
        title: "Enterprise Scale",
        emoji: "🏢",
        description: "Architecture patterns, team leadership, scaling systems to millions of users.",
        side: "right",
    },
    {
        title: "The Craft Era",
        emoji: "🔧",
        description: "Deep expertise, elegant solutions, mentoring the next generation.",
        side: "left",
    },
    {
        title: "Now & Next",
        emoji: "✨",
        description: "AI-assisted development, open to new challenges and meaningful projects.",
        side: "right",
        current: true,
    },
];

// Testimonials data
const testimonials = [
    {
        quote: "Dalton is one of the most versatile developers I've worked with. His ability to understand business requirements and translate them into elegant technical solutions is remarkable.",
        author: "Sarah Johnson",
        role: "VP Engineering, TechCorp",
        avatar: "SJ",
    },
    {
        quote: "Working with Dalton was transformative for our team. He not only delivered exceptional code but also elevated our entire development process.",
        author: "Michael Chen",
        role: "CTO, StartupXYZ",
        avatar: "MC",
    },
    {
        quote: "Dalton brings a rare combination of technical depth and communication skills. He made complex security concepts accessible to our entire organization.",
        author: "Emily Rodriguez",
        role: "Director of Product, SecureTech",
        avatar: "ER",
    },
];

export function AboutPageContent() {
    return (
        <>
            {/* Hero Section - Theme Aware */}
            <section className="relative bg-[var(--color-hero-bg)] pt-32 pb-20 overflow-hidden">
                <div className="container relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex-1"
                        >
                            <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-hero-text)] mb-4">
                                THE JOURNEY
                            </h1>
                            <p className="text-[var(--color-hero-muted)] text-lg md:text-xl max-w-xl mb-6">
                                From curious tinkerer to full-stack architect —<br />
                                a decade of building what matters
                            </p>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="h-1 w-32 bg-[var(--color-hero-accent)] origin-left"
                            />
                        </motion.div>

                        {/* Avatar Placeholder */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="w-44 h-44 rounded-full bg-[var(--card-bg)] border-4 border-[var(--color-hero-accent)] flex items-center justify-center"
                        >
                            <span className="text-[var(--color-hero-muted)] text-lg font-medium">AVATAR</span>
                        </motion.div>
                    </div>
                </div>

                {/* Gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--background)] to-transparent" />
            </section>

            {/* Bio Section */}
            <section className="section">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-mono text-2xl md:text-3xl font-bold mb-8"
                    >
                        Who I Am
                    </motion.h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Professional Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bento-card overflow-hidden"
                        >
                            <div className="bg-[#1a1a2e] -mx-6 -mt-6 px-6 py-4 mb-6">
                                <h3 className="font-mono text-lg font-semibold text-white">
                                    💼 PROFESSIONAL
                                </h3>
                            </div>
                            <div className="text-[var(--foreground)] space-y-4">
                                <p>
                                    Senior Full Stack Developer with 10+ years building scalable web applications.
                                </p>
                                <ul className="space-y-2 text-muted">
                                    <li className="flex items-center gap-2">
                                        <Icon icon="tabler:check" className="text-accent" width={18} />
                                        Specialized in React, Next.js, .NET
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Icon icon="tabler:check" className="text-accent" width={18} />
                                        System architecture & cloud solutions
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Icon icon="tabler:check" className="text-accent" width={18} />
                                        Team leadership & mentorship
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Icon icon="tabler:check" className="text-accent" width={18} />
                                        Performance optimization expert
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Personal Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bento-card overflow-hidden"
                        >
                            <div className="bg-[#e94560] -mx-6 -mt-6 px-6 py-4 mb-6">
                                <h3 className="font-mono text-lg font-semibold text-white">
                                    🎯 PERSONAL
                                </h3>
                            </div>
                            <div className="text-[var(--foreground)] space-y-4">
                                <p>
                                    Beyond the code, I&apos;m driven by curiosity and a love for creative problem-solving.
                                </p>
                                <ul className="space-y-2 text-muted">
                                    <li className="flex items-center gap-2">
                                        <Icon icon="tabler:users" className="text-accent" width={18} />
                                        Family time is my greatest joy
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Icon icon="tabler:music" className="text-accent" width={18} />
                                        Music offers daily solace
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Icon icon="tabler:brain" className="text-accent" width={18} />
                                        Stoic philosophy guides my approach
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Icon icon="tabler:language" className="text-accent" width={18} />
                                        Learning Spanish fluently
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    {/* Philosophy Quote */}
                    <PhilosophyQuote className="mt-6 max-w-2xl mx-auto" />
                </div>
            </section>

            {/* Timeline Section */}
            <section className="section bg-[var(--color-base-200)]">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-mono text-2xl md:text-3xl font-bold mb-12"
                    >
                        My Eras
                    </motion.h2>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Center Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[var(--card-border)] -translate-x-1/2 hidden md:block" />

                        <div className="space-y-8 md:space-y-0">
                            {eras.map((era, index) => (
                                <motion.div
                                    key={era.title}
                                    initial={{ opacity: 0, x: era.side === "left" ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative md:w-[45%] ${era.side === "left" ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                                        } md:mb-8`}
                                >
                                    {/* Dot */}
                                    <div
                                        className={`hidden md:block absolute top-6 w-6 h-6 rounded-full bg-[#e94560] border-4 ${era.current ? "border-white" : "border-[#e94560]"
                                            } ${era.side === "left" ? "-right-3 translate-x-1/2" : "-left-3 -translate-x-1/2"}`}
                                    />

                                    <div className={`bento-card ${era.current ? "border-[#e94560] border-2 bg-[#fef0f3] dark:bg-[#3a2a3e]" : ""}`}>
                                        <h3 className={`font-mono text-xl font-semibold mb-2 ${era.current ? "text-[#e94560]" : ""}`}>
                                            {era.emoji} {era.title}
                                        </h3>
                                        <p className="text-muted">{era.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-mono text-2xl md:text-3xl font-bold mb-12"
                    >
                        What People Say
                    </motion.h2>

                    {/* Featured Testimonial */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bento-card max-w-4xl mx-auto mb-8"
                    >
                        <div className="text-6xl md:text-8xl font-serif text-[#e94560] opacity-30 leading-none mb-4">
                            &ldquo;
                        </div>
                        <blockquote className="text-xl md:text-2xl font-serif mb-6 -mt-8">
                            {testimonials[0].quote}
                        </blockquote>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#1a1a2e] flex items-center justify-center text-white font-mono text-sm">
                                {testimonials[0].avatar}
                            </div>
                            <div>
                                <p className="font-semibold">{testimonials[0].author}</p>
                                <p className="text-sm text-muted">{testimonials[0].role}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Other Testimonials */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {testimonials.slice(1).map((testimonial, index) => (
                            <motion.div
                                key={testimonial.author}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bento-card"
                            >
                                <p className="text-muted italic mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[var(--color-base-200)] flex items-center justify-center font-mono text-sm">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{testimonial.author}</p>
                                        <p className="text-xs text-muted">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-[var(--color-base-200)]">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-mono text-2xl md:text-3xl font-bold mb-4">
                            Let&apos;s Work Together
                        </h2>
                        <p className="text-muted mb-8 max-w-xl mx-auto">
                            Have a project in mind? I&apos;d love to hear about it.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 btn-primary"
                        >
                            Get In Touch
                            <Icon icon="tabler:arrow-right" width={20} height={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
