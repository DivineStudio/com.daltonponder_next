"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { BentoCard, BentoGrid } from "../ui/BentoGrid";

interface ContactSectionProps {
    summary?: boolean;
}

const contactSubjects = [
    "Freelance Project Inquiry",
    "Full-Time Employment Opportunity",
    "Part-Time or Contract Work",
    "Startup or Partnership Opportunity",
    "Technical Consultation Request",
    "Website or App Maintenance Request",
    "Speaking or Event Engagement",
    "Collaboration on Open Source or Side Project",
    "Media or Interview Request",
    "General Networking / Connect",
    "Other (please specify in your message)",
];

const socialLinks = [
    { href: "https://linkedin.com/in/daltonponder", icon: "tabler:brand-linkedin", label: "LinkedIn" },
    { href: "https://github.com/daltonponder", icon: "tabler:brand-github", label: "GitHub" },
];

export function ContactSection({ summary = true }: ContactSectionProps) {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("https://formspree.io/f/xnnvpeoj", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formState),
            });

            if (response.ok) {
                setIsSubmitted(true);
                setFormState({ name: "", email: "", subject: "", message: "" });
            }
        } catch (error) {
            console.error("Form submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    if (summary) {
        return (
            <section className="section bg-[var(--color-base-200)]" aria-labelledby="contact-heading-summary">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <h2 id="contact-heading-summary" className="font-mono text-3xl md:text-4xl font-bold text-primary mb-4">
                            LET&apos;S CONNECT
                        </h2>
                        <p className="text-muted text-lg mb-8">
                            Have a project in mind or just want to chat? I&apos;d love to hear from you.
                        </p>
                        <motion.a
                            href="/contact"
                            className="btn-primary inline-flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Icon icon="tabler:mail" width={20} height={20} />
                            Get in Touch
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="section" aria-labelledby="contact-heading">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h2 id="contact-heading" className="font-mono text-3xl md:text-4xl font-bold text-primary mb-4">
                        REACH OUT
                    </h2>
                    <p className="text-muted text-lg max-w-2xl">
                        I&apos;m always interested in new projects and opportunities.
                    </p>
                </motion.div>

                <BentoGrid columns={3} gap="md">
                    {/* Contact Info Card */}
                    <BentoCard variant="secondary" delay={0}>
                        <div className="h-full flex flex-col justify-between">
                            <div>
                                <Icon
                                    icon="tabler:mail"
                                    width={40}
                                    height={40}
                                    className="text-primary mb-4"
                                />
                                <h3 className="font-mono text-lg font-semibold mb-2">
                                    Get in Touch
                                </h3>
                                <p className="text-sm text-muted mb-6">
                                    I&apos;m always interested in new projects, collaborations, or
                                    just having a chat about technology.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-outline text-sm flex items-center gap-2"
                                    >
                                        <Icon icon={link.icon} width={16} height={16} />
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </BentoCard>

                    {/* Contact Form */}
                    <BentoCard colSpan={2} delay={0.1}>
                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center py-12"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                    className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4"
                                >
                                    <Icon icon="tabler:check" width={32} height={32} className="text-green-600" />
                                </motion.div>
                                <h3 className="font-mono text-xl font-semibold mb-2">
                                    Message Sent!
                                </h3>
                                <p className="text-muted">
                                    Thank you for reaching out. I&apos;ll get back to you soon.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formState.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                                        Subject
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formState.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
                                    >
                                        <option value="">Select a subject...</option>
                                        {contactSubjects.map((subject) => (
                                            <option key={subject} value={subject}>
                                                {subject}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all resize-none"
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Icon icon="tabler:loader-2" width={20} height={20} className="animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Icon icon="tabler:send" width={20} height={20} />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        )}
                    </BentoCard>
                </BentoGrid>
            </div>
        </section>
    );
}
