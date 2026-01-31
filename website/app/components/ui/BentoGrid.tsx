"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
    children: ReactNode;
    className?: string;
    columns?: 1 | 2 | 3 | 4;
    gap?: "sm" | "md" | "lg";
}

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    colSpan?: 1 | 2 | 3 | 4;
    rowSpan?: 1 | 2 | 3;
    variant?: "default" | "secondary" | "accent";
    animate?: boolean;
    delay?: number;
}

const gapClasses = {
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
};

const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

const colSpanClasses = {
    1: "col-span-1",
    2: "col-span-1 md:col-span-2",
    3: "col-span-1 md:col-span-2 lg:col-span-3",
    4: "col-span-1 md:col-span-2 lg:col-span-4",
};

const rowSpanClasses = {
    1: "row-span-1",
    2: "row-span-1 md:row-span-2",
    3: "row-span-1 md:row-span-2 lg:row-span-3",
};

const variantClasses = {
    default: "bento-card",
    secondary: "bento-card bg-secondary text-[#2D3748]",
    accent: "bento-card bg-accent text-white",
};

export function BentoGrid({
    children,
    className = "",
    columns = 4,
    gap = "md",
}: BentoGridProps) {
    return (
        <div className={cn("grid", colClasses[columns], gapClasses[gap], className)}>
            {children}
        </div>
    );
}

export function BentoCard({
    children,
    className = "",
    colSpan = 1,
    rowSpan = 1,
    variant = "default",
    animate = true,
    delay = 0,
}: BentoCardProps) {
    const cardContent = (
        <div
            className={cn(
                variantClasses[variant],
                colSpanClasses[colSpan],
                rowSpanClasses[rowSpan],
                className
            )}
        >
            {children}
        </div>
    );

    if (!animate) {
        return cardContent;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.5,
                delay: delay,
                ease: "easeOut",
            }}
            className={cn(colSpanClasses[colSpan], rowSpanClasses[rowSpan])}
        >
            <div className={cn(variantClasses[variant], "h-full", className)}>
                {children}
            </div>
        </motion.div>
    );
}
