"use client";

import { motion } from "motion/react";
import { ReactNode, useMemo } from "react";
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
    accent: "bento-card bg-accent text-[#1a1a2e]",
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
    const { orderClasses, nonOrderClasses } = useMemo(() => {
        const classes = className.trim().split(/\s+/);
        const order = [];
        const nonOrder = [];

        for (const c of classes) {
            // Check for Tailwind order classes (e.g., order-1, md:order-last)
            // We use includes("order-") to avoid matching "border"
            if (c.includes("order-")) {
                order.push(c);
            } else {
                nonOrder.push(c);
            }
        }

        return {
            orderClasses: order.join(" "),
            nonOrderClasses: nonOrder.join(" "),
        };
    }, [className]);

    const containerClasses = useMemo(
        () =>
            cn(colSpanClasses[colSpan], rowSpanClasses[rowSpan], orderClasses),
        [colSpan, rowSpan, orderClasses]
    );

    const innerClasses = useMemo(
        () => cn(variantClasses[variant], "h-full", nonOrderClasses),
        [variant, nonOrderClasses]
    );

    const staticClasses = useMemo(
        () =>
            cn(
                variantClasses[variant],
                colSpanClasses[colSpan],
                rowSpanClasses[rowSpan],
                orderClasses,
                nonOrderClasses
            ),
        [variant, colSpan, rowSpan, orderClasses, nonOrderClasses]
    );

    if (!animate) {
        return <div className={staticClasses}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.5,
                delay: delay,
                ease: "easeOut",
            }}
            className={containerClasses}
        >
            <div className={innerClasses}>{children}</div>
        </motion.div>
    );
}
