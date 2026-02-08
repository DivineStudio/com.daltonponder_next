"use client";
import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { PhilosophyQuote } from "../ui/PhilosophyQuote";
import { Carousel } from "../ui/Carousel";

// Expandable testimonial card for the carousel
function TestimonialCard({ testimonial }: { testimonial: { quote: string; author: string; role: string; company: string; avatar: string } }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const el = textRef.current;
        if (el) {
            // Check if text is actually truncated (scrollHeight > clientHeight)
            setIsTruncated(el.scrollHeight > el.clientHeight);
        }
    }, [testimonial.quote]);

    return (
        <div className="bento-card h-full flex flex-col">
            <p
                ref={textRef}
                className={`text-muted italic mb-2 whitespace-pre-line ${!isExpanded ? 'line-clamp-4' : ''}`}
            >
                &ldquo;{testimonial.quote}&rdquo;
            </p>
            {isTruncated && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-accent text-sm font-medium hover:underline mb-4 self-start"
                >
                    {isExpanded ? 'Read less' : 'Read more'}
                </button>
            )}
            <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-[var(--color-base-200)] flex items-center justify-center font-mono text-sm shrink-0">
                    {testimonial.avatar}
                </div>
                <div>
                    <p className="font-medium text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted">{testimonial.role}, {testimonial.company}</p>
                </div>
            </div>
        </div>
    );
}

export function AboutPageContent() {
    const t = useTranslations("Home.ProAboutSection");
    const tp = useTranslations("Home.PersonalAboutSection");
    const tAb = useTranslations("About");
    const tNav = useTranslations("Navigation");

    // Timeline eras data from JSON
    const eras = tAb.raw("Eras.Items");

    // Testimonials data from JSON (Shared with Home)
    const tHomeTestimonials = useTranslations("Home.TestimonialsSection");
    const rawTestimonials = tHomeTestimonials.raw("Items");
    const testimonials = Array.isArray(rawTestimonials)
        ? rawTestimonials.map((t: any) => ({
            quote: t.Quote,
            author: t.Author,
            role: t.Role,
            company: t.Company,
            avatar: t.avatar,
            headliner: t.Headliner === true
        }))
        : [];

    // Find the headliner testimonial (first with Headliner=true, or fallback to first item)
    const headlinerTestimonial = testimonials.find(t => t.headliner) || testimonials[0];
    const otherTestimonials = testimonials.filter(t => t !== headlinerTestimonial);
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
                                {tAb("Hero.Header")}
                            </h1>
                            <p className="text-[var(--color-hero-muted)] text-lg md:text-xl max-w-xl mb-6">
                                {tAb("Hero.SubLine1")}<br />
                                {tAb("Hero.SubLine2")}
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
                            className="w-44 h-44 rounded-full bg-[var(--card-bg)] border-4 border-[var(--color-hero-accent)] flex items-center justify-center overflow-hidden"
                        >
                            <Image
                                src="/DaltonPonderPortrait.webp"
                                alt="Dalton Ponder"
                                width={176}
                                height={176}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--background)] to-transparent" />
            </section>

            {/* Bio Section */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Professional Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bento-card overflow-hidden"
                        >
                            <div className="bg-[#1a1a2e] -mx-6 -mt-6 px-6 py-4 mb-6">
                                <h3 className="font-mono text-lg font-semibold text-white flex items-center gap-2">
                                    <Icon icon="tabler:briefcase" width={20} height={20} />
                                    {tAb("Bio.Professional.Title")}
                                </h3>
                            </div>
                            <div className="text-[var(--foreground)] space-y-4">
                                <p>
                                    {tAb("Bio.Professional.Intro")}
                                </p>
                                <ul className="space-y-2 text-muted">
                                    {(tAb.raw("Bio.Professional.Points") as string[]).map((point, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <Icon icon="tabler:check" className="text-accent" width={18} />
                                            {point}
                                        </li>
                                    ))}
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
                            <div className="bg-[var(--color-primary)] -mx-6 -mt-6 px-6 py-4 mb-6">
                                <h3 className="font-mono text-lg font-semibold text-white flex items-center gap-2">
                                    <Icon icon="tabler:target" width={20} height={20} />
                                    {tAb("Bio.Personal.Title")}
                                </h3>
                            </div>
                            <div className="text-[var(--foreground)] space-y-4">
                                <p>
                                    {tAb("Bio.Personal.Intro")}
                                </p>
                                <ul className="space-y-2 text-muted">
                                    {(tAb.raw("Bio.Personal.Points") as string[]).map((point, idx) => {
                                        const icons = tAb.raw("Bio.Personal.Icons") as string[];
                                        return (
                                            <li key={idx} className="flex items-center gap-2">
                                                <Icon icon={icons[idx]} className="text-accent" width={18} />
                                                {point}
                                            </li>
                                        );
                                    })}
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
                        {tAb("Eras.Header")}
                    </motion.h2>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Center Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[var(--card-border)] -translate-x-1/2 hidden md:block" />

                        <div className="space-y-8 md:space-y-0">
                            {eras.map((era: { title: string; icon: string; description: string; side: string; current?: boolean }, index: number) => (
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
                                        className={`hidden md:block absolute top-6 w-6 h-6 rounded-full bg-[var(--color-primary)] border-4 ${era.current ? "border-white" : "border-[var(--color-primary)]"
                                            } ${era.side === "left" ? "-right-3 translate-x-1/2" : "-left-3 -translate-x-1/2"}`}
                                    />

                                    <div className={`bento-card ${era.current ? "border-[var(--color-primary)] border-2" : ""}`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Icon icon={era.icon} width={24} height={24} className={era.current ? "text-[var(--color-primary)]" : "text-muted"} />
                                            <h3 className={`font-mono text-xl font-semibold ${era.current ? "text-[var(--color-primary)]" : ""}`}>
                                                {era.title}
                                            </h3>
                                        </div>
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
                        {tAb("Testimonials.Header")}
                    </motion.h2>

                    {/* Featured Testimonial */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bento-card max-w-3xl mx-auto mb-8"
                    >
                        <div className="text-6xl md:text-8xl font-serif text-[var(--color-primary)] opacity-30 leading-none mb-4">
                            &ldquo;
                        </div>
                        <blockquote className="text-lg md:text-xl font-serif mb-6 -mt-8 whitespace-pre-line leading-relaxed text-[var(--foreground)]/90">
                            {headlinerTestimonial?.quote}
                        </blockquote>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#1a1a2e] flex items-center justify-center text-white font-mono text-sm">
                                {headlinerTestimonial?.avatar}
                            </div>
                            <div>
                                <p className="font-semibold">{headlinerTestimonial?.author}</p>
                                <p className="text-sm text-muted">{headlinerTestimonial?.role}, {headlinerTestimonial?.company}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Other Testimonials */}
                    <Carousel
                        autoplayDelay={5000}
                        options={{ loop: true, align: "start", dragFree: false }}
                        className="-mx-4 md:mx-0 px-4 md:px-0"
                        slideClassName="w-full md:w-1/2 lg:w-1/2 pr-4"
                        showDots={true}
                    >
                        {otherTestimonials.map((testimonial: { quote: string; author: string; role: string; company: string; avatar: string }) => (
                            <TestimonialCard key={testimonial.author} testimonial={testimonial} />
                        ))}
                    </Carousel>
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
                            {tAb("CTA.Header")}
                        </h2>
                        <p className="text-muted mb-8 max-w-xl mx-auto">
                            {tAb("CTA.SubText")}
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 btn-primary"
                        >
                            {tAb("CTA.Button")}
                            <Icon icon="tabler:arrow-right" width={20} height={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
