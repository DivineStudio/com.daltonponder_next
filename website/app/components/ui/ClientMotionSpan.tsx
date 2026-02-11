"use client";

import { motion, HTMLMotionProps } from "motion/react";

/**
 * A simple client-side wrapper for motion.span to allow parent components
 * to remain Server Components.
 */
export function ClientMotionSpan({ children, ...props }: HTMLMotionProps<"span">) {
    return <motion.span {...props}>{children}</motion.span>;
}
