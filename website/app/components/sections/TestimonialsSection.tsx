"use client";
import { useTranslations } from "next-intl";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Carousel, TESTIMONIAL_CAROUSEL_OPTIONS } from "../ui/Carousel";

interface TestimonialsSectionProps {
    summary?: boolean;
}

export function TestimonialsSection({ summary = true }: TestimonialsSectionProps) {
    const t = useTranslations("Home.TestimonialsSection");

    const testimonials = t.raw("Items") as Array<{
        Quote: string;
        Author: string;
        Role: string;
        Company: string;
        Context?: string;
        avatar?: string;
    }>;

    // Map to internal format if needed, though we can use them directly
    const formattedTestimonials = testimonials.map((t, idx) => ({
        id: idx,
        quote: t.Quote,
        author: t.Author,
        title: t.Role,
        company: t.Company,
        context: t.Context,
        avatar: t.avatar,
    }));

    const displayTestimonials = summary ? formattedTestimonials.slice(0, 4) : formattedTestimonials;

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
                        {t("Header")}
                    </h2>
                    <p className="text-muted text-lg max-w-2xl">
                        {t("SubHeader")}
                    </p>
                </motion.div>

                {/* Featured Quote Carousel */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bento-card bg-[var(--color-secondary)] mb-8 relative overflow-hidden p-0"
                >
                    <motion.span
                        initial={{ rotate: -10, scale: 0 }}
                        whileInView={{ rotate: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="absolute top-8 left-8 text-[var(--color-primary)] opacity-30 z-0"
                    >
                        <Icon icon="tabler:quote" width={80} height={80} />
                    </motion.span>

                    <div className="relative z-10">
                        <Carousel
                            autoplay={true}
                            autoplayDelay={8000}
                            options={TESTIMONIAL_CAROUSEL_OPTIONS}
                            showDots={true}
                            className="w-full"
                            slideClassName="w-full"
                        >
                            {displayTestimonials.map((testimonial) => (
                                <div key={testimonial.id} className="py-8 px-4 md:px-8 w-full">
                                    <blockquote className="font-serif text-xl md:text-2xl leading-relaxed mb-6 italic whitespace-pre-line">
                                        {testimonial.quote}
                                    </blockquote>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center shrink-0 text-white font-mono text-sm">
                                            {testimonial.avatar || testimonial.author.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{testimonial.author}</p>
                                            <p className="text-sm text-muted">
                                                {testimonial.title}, {testimonial.company}
                                            </p>
                                            {testimonial.context && (
                                                <div className="flex items-center gap-1 text-xs font-bold text-accent mt-1 font-mono">
                                                    <Icon icon="tabler:clipboard-text" width={14} height={14} />
                                                    {testimonial.context}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </motion.div>

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
