"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface TestimonialsSectionProps {
    summary?: boolean;
}

const testimonials = [
    {
        id: 1,
        quote:
            "Dalton is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding.",
        author: "Sarah Johnson",
        title: "VP Engineering",
        company: "TechCorp",
        context: "6-month enterprise platform migration",
        featured: true,
    },
    {
        id: 2,
        quote:
            "Working with Dalton was a pleasure. He brought innovative solutions to complex challenges.",
        author: "Michael Chen",
        title: "CTO",
        company: "StartupXYZ",
        context: "Full-stack development for MVP launch",
        featured: false,
    },
    {
        id: 3,
        quote:
            "Dalton's expertise in both development and security made him invaluable to our team.",
        author: "Emily Rodriguez",
        title: "Project Manager",
        company: "SecureTech",
        context: "Security audit and remediation project",
        featured: false,
    },
    {
        id: 4,
        quote:
            "A true professional who goes above and beyond. Highly recommended!",
        author: "David Kim",
        title: "Director of Engineering",
        company: "CloudFirst",
        context: "Cloud architecture consulting",
        featured: false,
    },
];

function TypewriterText({ text }: { text: string }) {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setDisplayedText("");
        setCurrentIndex(0);
    }, [text]);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(text.slice(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            }, 30);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, text]);

    return (
        <>
            <span aria-hidden="true">
                {displayedText}
                {currentIndex < text.length && (
                    <span className="animate-pulse">|</span>
                )}
            </span>
            <span className="sr-only">{text}</span>
        </>
    );
}

export function TestimonialsSection({ summary = true }: TestimonialsSectionProps) {
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const featuredTestimonials = testimonials.filter((t) => t.featured || !summary);
    const displayTestimonials = summary ? testimonials.slice(0, 4) : testimonials;

    // Auto-rotate featured testimonial
    useEffect(() => {
        if (!summary) return;
        const interval = setInterval(() => {
            setFeaturedIndex((prev) => (prev + 1) % featuredTestimonials.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [summary, featuredTestimonials.length]);

    const currentFeatured = featuredTestimonials[featuredIndex] || testimonials[0];

    return (
        <section className="section" aria-labelledby="testimonials-heading">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 id="testimonials-heading" className="font-mono text-3xl md:text-4xl font-bold text-primary mb-4">
                        TESTIMONIALS
                    </h2>
                    <p className="text-muted text-lg max-w-2xl">
                        What colleagues and clients say about working with me.
                    </p>
                </motion.div>

                {/* Featured Quote */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bento-card bg-[var(--color-secondary)] mb-8 relative overflow-hidden"
                >
                    <motion.span
                        initial={{ rotate: -10, scale: 0 }}
                        whileInView={{ rotate: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="absolute top-4 left-4 text-6xl text-primary opacity-30 font-serif"
                    >
                        ❝
                    </motion.span>

                    <div className="relative z-10 py-8 px-4 md:px-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentFeatured.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <blockquote className="font-serif text-xl md:text-2xl leading-relaxed mb-6 italic">
                                    <TypewriterText text={currentFeatured.quote} />
                                </blockquote>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                                        <Icon icon="tabler:user" width={24} height={24} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{currentFeatured.author}</p>
                                        <p className="text-sm text-muted">
                                            {currentFeatured.title}, {currentFeatured.company}
                                        </p>
                                        {currentFeatured.context && (
                                            <p className="text-xs text-accent mt-1 font-mono">
                                                📋 {currentFeatured.context}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Supporting Quotes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {displayTestimonials
                        .filter((t) => t.id !== currentFeatured.id)
                        .slice(0, 3)
                        .map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bento-card"
                            >
                                {testimonial.context && (
                                    <p className="text-xs text-accent font-mono mb-2">
                                        📋 {testimonial.context}
                                    </p>
                                )}
                                <blockquote className="text-sm mb-4 italic">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </blockquote>
                                <p className="text-sm font-medium">— {testimonial.author}</p>
                                <p className="text-xs text-muted">
                                    {testimonial.title}, {testimonial.company}
                                </p>
                            </motion.div>
                        ))}
                </div>

                {summary && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-8 text-center"
                    >
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                        >
                            View All Testimonials
                            <Icon icon="tabler:arrow-right" width={16} height={16} />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
