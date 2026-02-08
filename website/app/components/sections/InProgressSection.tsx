"use client";

import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

// Animated counter component for cinematic number reveals
function AnimatedCounter({ value, duration = 2, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const animation = animate(count, value, { duration });
        const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
        return () => {
            animation.stop();
            unsubscribe();
        };
    }, [count, value, duration, rounded]);

    return (
        <span className="tabular-nums">
            {displayValue}{suffix}
        </span>
    );
}

// Floating particle component for ambient background
function FloatingParticle({ delay, size, x, duration }: { delay: number; size: number; x: number; duration: number }) {
    return (
        <motion.div
            className="absolute rounded-full bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-primary)]/10"
            style={{
                width: size,
                height: size,
                left: `${x}%`,
                bottom: -size,
            }}
            animate={{
                y: [0, -1200],
                opacity: [0, 0.6, 0.6, 0],
                scale: [1, 1.2, 1],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "linear",
            }}
        />
    );
}

// Terminal-style typing animation
function TerminalTyping({ text, delay = 0 }: { text: string; delay?: number }) {
    const [displayText, setDisplayText] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            let index = 0;
            const interval = setInterval(() => {
                if (index <= text.length) {
                    setDisplayText(text.slice(0, index));
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, 50);
            return () => clearInterval(interval);
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [text, delay]);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <span className="font-mono text-[var(--color-terminal-text)]">
            {displayText}
            <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>▋</span>
        </span>
    );
}

// Code snippet component with syntax highlighting feel
function CodeBlock({ children, delay }: { children: React.ReactNode; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.4 }}
            className="font-mono text-sm md:text-base"
        >
            {children}
        </motion.div>
    );
}

export function InProgressSection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Generate particles
    const particles = Array.from({ length: 15 }, (_, i) => ({
        delay: i * 0.8,
        size: Math.random() * 8 + 4,
        x: Math.random() * 100,
        duration: Math.random() * 8 + 12,
    }));

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--color-base-200)]">
            {/* Floating Particles */}
            {mounted && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {particles.map((p, i) => (
                        <FloatingParticle key={i} {...p} />
                    ))}
                </div>
            )}

            {/* Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-[var(--color-accent)]/10 via-[var(--color-accent)]/5 to-transparent blur-3xl"
                    style={{ top: "10%", right: "-10%" }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full bg-gradient-radial from-[var(--color-primary)]/15 via-[var(--color-primary)]/5 to-transparent blur-3xl"
                    style={{ bottom: "5%", left: "-5%" }}
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 md:px-6 py-10 md:py-20">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 mb-4 md:mb-8"
                    >
                        <motion.span
                            className="w-2 h-2 rounded-full bg-[var(--color-success)]"
                            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-sm font-medium text-[var(--color-accent)]">
                            Currently Building
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
                    >
                        <span className="bg-gradient-to-r from-[var(--foreground)] via-[var(--color-accent)] to-[var(--color-primary)] bg-clip-text text-transparent">
                            Something Amazing
                        </span>
                        <br />
                        <span className="text-[var(--foreground)]">Is Coming</span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-base md:text-xl text-muted mb-6 md:mb-12 max-w-2xl mx-auto px-2"
                    >
                        I'm rebuilding my portfolio from the ground up with modern tech,
                        stunning animations, and a fresh perspective. Stay tuned!
                    </motion.p>

                    {/* Terminal Mock */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="bg-[var(--color-terminal-bg)] border border-[var(--color-terminal-border)] rounded-xl md:rounded-2xl p-4 md:p-8 shadow-2xl text-left mb-6 md:mb-12"
                    >
                        {/* Terminal Header */}
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[var(--color-terminal-border)]/50">
                            <span className="w-3 h-3 rounded-full bg-red-500/80" />
                            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <span className="w-3 h-3 rounded-full bg-green-500/80" />
                            <span className="ml-4 text-sm text-[var(--color-terminal-text)]/50 font-mono">
                                ~/portfolio-rebuild
                            </span>
                        </div>

                        {/* Terminal Content */}
                        <div className="space-y-3">
                            <CodeBlock delay={0.8}>
                                <span className="text-[var(--color-accent)]">$</span>{" "}
                                <TerminalTyping text="npm run build:awesome" delay={0.8} />
                            </CodeBlock>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 3 }}
                                className="space-y-2 text-[var(--color-terminal-text)]/70"
                            >
                                <div className="flex items-center gap-2">
                                    <Icon icon="mdi:check-circle" className="text-[var(--color-success)] w-5 h-5" />
                                    <span className="font-mono text-sm">TypeScript configured</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Icon icon="mdi:check-circle" className="text-[var(--color-success)] w-5 h-5" />
                                    <span className="font-mono text-sm">Next.js 16 ready</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Icon icon="mdi:check-circle" className="text-[var(--color-success)] w-5 h-5" />
                                    <span className="font-mono text-sm">Tailwind 4 integrated</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Icon icon="mdi:loading" className="text-[var(--color-accent)] w-5 h-5" />
                                    </motion.div>
                                    <span className="font-mono text-sm text-[var(--color-accent)]">
                                        Building something incredible...
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Progress Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="grid grid-cols-3 gap-4 md:gap-8 max-w-md mx-auto mb-6 md:mb-12"
                    >
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-[var(--color-accent)]">
                                {mounted && <AnimatedCounter value={98} suffix="%" duration={10} />}
                            </div>
                            <div className="text-sm text-muted mt-1">Complete</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary)]">
                                {mounted && <AnimatedCounter value={7} duration={8} />}
                            </div>
                            <div className="text-sm text-muted mt-1">Features</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                                {mounted && <AnimatedCounter value={1} duration={6} />}
                            </div>
                            <div className="text-sm text-muted mt-1">Dreamer</div>
                        </div>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4"
                    >
                        <a
                            href="https://github.com/DivineStudio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--color-accent)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            <Icon icon="mdi:github" className="w-5 h-5 group-hover:text-[var(--color-accent)] transition-colors" />
                            <span className="font-medium">GitHub</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/dalton-ponder-99a96a131"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--color-accent)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            <Icon icon="mdi:linkedin" className="w-5 h-5 group-hover:text-[var(--color-accent)] transition-colors" />
                            <span className="font-medium">LinkedIn</span>
                        </a>
                    </motion.div>

                    {/* Footer Note */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.5 }}
                        className="mt-8 md:mt-16 text-sm text-muted/50 pb-4"
                    >
                        Crafted with ❤️ using Next.js, TypeScript, and far too much coffee
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
