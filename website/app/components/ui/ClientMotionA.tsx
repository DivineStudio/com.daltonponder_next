"use client";

import { motion, HTMLMotionProps } from "motion/react";

/**
 * A simple client-side wrapper for motion.a to allow parent components
 * to remain Server Components.
 */
export function ClientMotionA({ children, ...props }: HTMLMotionProps<"a">) {
    return <motion.a {...props}>{children}</motion.a>;
}
