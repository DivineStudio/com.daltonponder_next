"use client";
import { useTranslations } from "next-intl";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

// Full skills data with categories, years, and proficiency


const categories = ["All", "Languages", "Frontend", "Backend", "Cloud", "DevOps", "Data", "Security"];

interface Skill {
    name: string;
    icon: string;
    category: string;
    years: number;
    proficiency: number;
}

interface SkillCardProps {
    skill: Skill;
    index: number;
}

function SkillCard({ skill, index }: SkillCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            className="perspective-1000 h-[180px]"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <motion.div
                className="relative w-full h-full"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 25 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front of card */}
                <div
                    className="absolute inset-0 bento-card backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <motion.div
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

                    {/* Flip hint */}
                    <div className="absolute bottom-2 right-2 text-xs text-muted opacity-50 flex items-center gap-1">
                        <Icon icon="tabler:rotate-3d" width={12} height={12} />
                        hover to flip
                    </div>
                </div>

                {/* Back of card */}
                <div
                    className="absolute inset-0 bento-card backface-hidden bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] text-white flex flex-col justify-center items-center"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <Icon icon={skill.icon} width={48} height={48} className="mb-3 opacity-90" />
                    <h3 className="font-mono font-bold text-2xl mb-1">{skill.name}</h3>
                    <p className="text-4xl font-bold font-mono mb-1">{skill.years}+</p>
                    <p className="text-sm opacity-80">years of experience</p>
                    <div className="mt-3 px-3 py-1 rounded-full bg-white/20 text-xs font-mono">
                        {skill.proficiency}% proficiency
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function SkillsPageContent() {
    const t = useTranslations("Home.SkillsSection");
    const tNav = useTranslations("Navigation");
    const allSkills = t.raw("List") as Skill[];
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
                            {t("Header")}
                        </h1>
                        <p className="text-[var(--color-hero-muted)] text-lg md:text-xl max-w-xl mb-6">
                            {t("Header")}
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
                                    ? "bg-[var(--color-primary)] text-white"
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
                            {tNav("Credentials")}
                            <Icon icon="tabler:arrow-right" width={20} height={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
