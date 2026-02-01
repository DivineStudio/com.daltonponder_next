"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

// Full skills data with categories, years, and proficiency
const allSkills = [
    // Languages
    { name: "C#", icon: "devicon:csharp", category: "Languages", years: 10, proficiency: 95 },
    { name: "JavaScript", icon: "devicon:javascript", category: "Languages", years: 8, proficiency: 90 },
    { name: "TypeScript", icon: "devicon:typescript", category: "Languages", years: 6, proficiency: 92 },
    { name: "Python", icon: "devicon:python", category: "Languages", years: 5, proficiency: 75 },
    { name: "SQL", icon: "tabler:database", category: "Languages", years: 10, proficiency: 88 },
    { name: "HTML/CSS", icon: "devicon:html5", category: "Languages", years: 10, proficiency: 95 },

    // Frontend
    { name: "React", icon: "devicon:react", category: "Frontend", years: 6, proficiency: 92 },
    { name: "Next.js", icon: "devicon:nextjs", category: "Frontend", years: 4, proficiency: 90 },
    { name: "Vue.js", icon: "devicon:vuejs", category: "Frontend", years: 3, proficiency: 70 },
    { name: "Tailwind CSS", icon: "devicon:tailwindcss", category: "Frontend", years: 4, proficiency: 88 },
    { name: "Framer Motion", icon: "tabler:brand-framer-motion", category: "Frontend", years: 2, proficiency: 80 },

    // Backend
    { name: ".NET", icon: "devicon:dotnetcore", category: "Backend", years: 10, proficiency: 95 },
    { name: "Node.js", icon: "devicon:nodejs", category: "Backend", years: 6, proficiency: 85 },
    { name: "Express", icon: "devicon:express", category: "Backend", years: 5, proficiency: 82 },
    { name: "GraphQL", icon: "devicon:graphql", category: "Backend", years: 3, proficiency: 75 },

    // Cloud
    { name: "AWS", icon: "devicon:amazonwebservices-wordmark", category: "Cloud", years: 5, proficiency: 80 },
    { name: "Azure", icon: "devicon:azure", category: "Cloud", years: 6, proficiency: 85 },
    { name: "GCP", icon: "devicon:googlecloud", category: "Cloud", years: 2, proficiency: 60 },

    // DevOps
    { name: "Docker", icon: "devicon:docker", category: "DevOps", years: 5, proficiency: 85 },
    { name: "Kubernetes", icon: "devicon:kubernetes", category: "DevOps", years: 3, proficiency: 70 },
    { name: "GitHub Actions", icon: "devicon:githubactions", category: "DevOps", years: 4, proficiency: 85 },
    { name: "Terraform", icon: "devicon:terraform", category: "DevOps", years: 2, proficiency: 65 },

    // Data
    { name: "PostgreSQL", icon: "devicon:postgresql", category: "Data", years: 7, proficiency: 88 },
    { name: "MongoDB", icon: "devicon:mongodb", category: "Data", years: 4, proficiency: 75 },
    { name: "Redis", icon: "devicon:redis", category: "Data", years: 4, proficiency: 78 },
    { name: "SQL Server", icon: "devicon:microsoftsqlserver", category: "Data", years: 10, proficiency: 90 },

    // Security
    { name: "OWASP", icon: "tabler:shield-check", category: "Security", years: 5, proficiency: 85 },
    { name: "Penetration Testing", icon: "tabler:bug", category: "Security", years: 4, proficiency: 75 },
    { name: "Security+", icon: "tabler:certificate", category: "Security", years: 3, proficiency: 80 },
];

const categories = ["All", "Languages", "Frontend", "Backend", "Cloud", "DevOps", "Data", "Security"];

interface SkillCardProps {
    skill: typeof allSkills[0];
    index: number;
}

function SkillCard({ skill, index }: SkillCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            className="bento-card group"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 rounded-lg bg-[var(--color-base-200)] flex items-center justify-center"
                    >
                        <Icon icon={skill.icon} width={32} height={32} />
                    </motion.div>
                    <div>
                        <h3 className="font-mono font-semibold text-lg">{skill.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-base-200)] text-muted">
                            {skill.category}
                        </span>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-2">
                <div className="h-2 w-full bg-[var(--color-base-200)] rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{ background: "var(--color-accent)" }}
                    />
                </div>
            </div>

            <div className="flex justify-between text-sm text-muted">
                <span>{skill.years}+ years</span>
                <span className="font-mono">{skill.proficiency}%</span>
            </div>
        </motion.div>
    );
}

export function SkillsPageContent() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredSkills = useMemo(() => {
        return allSkills.filter((skill) => {
            const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "All" || skill.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    return (
        <>
            {/* Hero Section - Theme Aware */}
            <section className="relative bg-[var(--color-hero-bg)] pt-32 pb-16 overflow-hidden">
                {/* Code decoration background */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 text-7xl md:text-9xl font-mono text-[var(--color-hero-text)]/20 opacity-40 select-none pointer-events-none">
                    <div>{"{ }"}</div>
                    <div>{"< />"}</div>
                    <div>{"[ ]"}</div>
                </div>

                <div className="container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-hero-text)] mb-4">
                            TECH STACK
                        </h1>
                        <p className="text-[var(--color-hero-muted)] text-lg md:text-xl max-w-xl mb-6">
                            Technologies I&apos;ve mastered over a decade of building software
                        </p>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="h-1 w-32 bg-[var(--color-hero-accent)] origin-left"
                        />
                    </motion.div>
                </div>

                {/* Gradient fade to content */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--background)] to-transparent" />
            </section>

            {/* Search, Filter & Skills Grid Section */}
            <section className="py-8">
                <div className="container">
                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-4"
                    >
                        <div className="relative max-w-2xl mx-auto">
                            <Icon
                                icon="tabler:search"
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                                width={24}
                                height={24}
                            />
                            <input
                                type="text"
                                placeholder="Search skills..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] text-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                                >
                                    <Icon icon="tabler:x" width={20} height={20} />
                                </button>
                            )}
                        </div>
                    </motion.div>

                    {/* Category Filter Pills */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-2 mb-6"
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                                    ? "bg-[#e94560] text-white"
                                    : "bg-[var(--color-base-200)] text-muted hover:bg-[var(--color-base-200)] hover:text-foreground"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>

                    {/* Skills Grid */}
                    <AnimatePresence mode="popLayout">
                        {filteredSkills.length > 0 ? (
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredSkills.map((skill, index) => (
                                    <SkillCard key={skill.name} skill={skill} index={index} />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                            >
                                <Icon icon="tabler:search-off" width={48} height={48} className="mx-auto mb-4 text-muted" />
                                <p className="text-lg text-muted">No skills found matching your search.</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setActiveCategory("All");
                                    }}
                                    className="mt-4 text-accent hover:underline"
                                >
                                    Clear filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Stats Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 text-center text-muted"
                    >
                        Showing {filteredSkills.length} of {allSkills.length} skills
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 text-center"
                    >
                        <Link
                            href="/credentials"
                            className="inline-flex items-center gap-2 btn-primary"
                        >
                            View My Credentials
                            <Icon icon="tabler:arrow-right" width={20} height={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
