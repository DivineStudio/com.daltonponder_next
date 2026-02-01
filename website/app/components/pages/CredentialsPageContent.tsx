"use client";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

// Work experience data
const workExperience = [
    {
        title: "Senior Full Stack Developer",
        company: "TechCorp Inc.",
        dates: "2020 - Present",
        current: true,
        bullets: [
            "Led architecture of microservices platform serving 1M+ users",
            "Mentored team of 5 junior developers",
            "Reduced deployment time by 60% through CI/CD optimization",
        ],
    },
    {
        title: "Software Engineer",
        company: "StartupXYZ",
        dates: "2017 - 2020",
        current: false,
        bullets: [
            "Built MVP from scratch, growing to 50K active users",
            "Implemented CI/CD pipeline reducing deploy time by 80%",
        ],
    },
    {
        title: "Junior Developer",
        company: "Agency Co.",
        dates: "2014 - 2017",
        current: false,
        bullets: [
            "Developed client-facing web applications",
            "Collaborated with design team on UX improvements",
        ],
    },
];

// Certifications
const certifications = [
    {
        name: "CompTIA Security+",
        issuer: "CompTIA",
        year: "2023",
        icon: "tabler:shield-check",
    },
    {
        name: "AWS Solutions Architect",
        issuer: "Amazon Web Services",
        year: "2022",
        icon: "tabler:cloud",
    },
    {
        name: "Azure Developer Associate",
        issuer: "Microsoft",
        year: "2021",
        icon: "tabler:brand-azure",
    },
    {
        name: "Certified Kubernetes Admin",
        issuer: "CNCF",
        year: "2022",
        icon: "tabler:box",
    },
    {
        name: "Scrum Master Certified",
        issuer: "Scrum Alliance",
        year: "2020",
        icon: "tabler:refresh",
    },
];

// Education
const education = {
    degree: "Master of Science in Computer Science",
    university: "State University",
    year: "2014",
    coursework: ["Distributed Systems", "Machine Learning", "Cybersecurity", "Cloud Computing"],
};

export function CredentialsPageContent() {
    return (
        <>
            {/* Hero Section - Theme Aware */}
            <section className="relative bg-[var(--color-hero-bg)] pt-32 pb-16 overflow-hidden">
                <div className="container relative z-10">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-hero-text)] mb-4">
                                PROOF OF EXCELLENCE
                            </h1>
                            <p className="text-[var(--color-hero-muted)] text-lg md:text-xl max-w-xl mb-6">
                                Education, certifications, and career milestones
                            </p>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="h-1 w-32 bg-[var(--color-hero-accent)] origin-left"
                            />
                        </motion.div>

                        {/* Stats Cards */}
                        <div className="flex gap-4">
                            {[
                                { value: "10+", label: "Years Exp" },
                                { value: "5", label: "Certs" },
                                { value: "MS", label: "Degree" },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl px-6 py-4 text-center"
                                >
                                    <div className="font-mono text-3xl font-bold text-[var(--color-hero-accent)]">
                                        {stat.value}
                                    </div>
                                    <div className="text-[var(--color-hero-muted)] text-sm">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--background)] to-transparent" />
            </section>

            {/* Work Experience Section */}
            <section className="section">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-mono text-2xl md:text-3xl font-bold mb-8"
                    >
                        Work Experience
                    </motion.h2>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Line */}
                        <div className="absolute left-3 top-0 bottom-0 w-1 bg-[var(--card-border)]" />

                        <div className="space-y-6">
                            {workExperience.map((job, index) => (
                                <motion.div
                                    key={job.title + job.company}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative pl-10"
                                >
                                    {/* Dot */}
                                    <div
                                        className={`absolute left-0 top-6 w-7 h-7 rounded-full ${job.current
                                            ? "bg-[#e94560] border-2 border-[#e94560]"
                                            : "bg-[var(--color-base-200)] border-2 border-[var(--card-border)]"
                                            } flex items-center justify-center`}
                                    >
                                        {job.current && (
                                            <div className="w-2 h-2 bg-white rounded-full" />
                                        )}
                                    </div>

                                    <div className={`bento-card ${job.current ? "" : "opacity-80"}`}>
                                        <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                                            <div>
                                                <h3 className={`font-mono text-xl font-semibold ${job.current ? "" : "text-muted"}`}>
                                                    {job.title}
                                                </h3>
                                                <p className="text-[#e94560] font-medium">
                                                    {job.company}
                                                </p>
                                            </div>
                                            <span className="text-muted text-sm">{job.dates}</span>
                                        </div>
                                        <ul className="space-y-1 text-muted text-sm">
                                            {job.bullets.map((bullet, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1.5">•</span>
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <section className="section bg-[var(--color-base-200)]">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-mono text-2xl md:text-3xl font-bold mb-8"
                    >
                        Education
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bento-card max-w-3xl"
                    >
                        <div className="flex items-start gap-6">
                            <div className="w-20 h-20 rounded-xl bg-[#1a1a2e] flex items-center justify-center shrink-0">
                                <Icon icon="tabler:school" width={40} height={40} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-mono text-xl font-semibold mb-1">
                                    {education.degree}
                                </h3>
                                <p className="text-[#e94560] font-medium mb-2">{education.university}</p>
                                <p className="text-muted text-sm mb-4">Graduated {education.year}</p>
                                <div className="flex flex-wrap gap-2">
                                    {education.coursework.map((course) => (
                                        <span
                                            key={course}
                                            className="px-3 py-1 rounded-full bg-[var(--color-base-200)] text-sm text-muted"
                                        >
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Certifications Section */}
            <section className="section">
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-mono text-2xl md:text-3xl font-bold mb-8"
                    >
                        Certifications
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={cert.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="bento-card group"
                            >
                                <div className="flex items-start gap-4">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="w-12 h-12 rounded-lg bg-[#e94560] flex items-center justify-center shrink-0"
                                    >
                                        <Icon icon={cert.icon} width={24} height={24} className="text-white" />
                                    </motion.div>
                                    <div>
                                        <h3 className="font-mono font-semibold mb-1">{cert.name}</h3>
                                        <p className="text-sm text-muted">{cert.issuer}</p>
                                        <p className="text-xs text-accent">{cert.year}</p>
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
                        className="space-x-4"
                    >
                        <Link
                            href="#"
                            className="inline-flex items-center gap-2 btn-outline"
                        >
                            <Icon icon="tabler:download" width={20} height={20} />
                            Download Resume
                        </Link>
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
