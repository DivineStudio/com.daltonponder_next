"use client";

import { motion, HTMLMotionProps } from "motion/react";

/**
 * A simple client-side wrapper for motion.div to allow parent components
 * to remain Server Components.
 */
export function ClientMotionDiv({ children, ...props }: HTMLMotionProps<"div">) {
    return <motion.div {...props}>{children}</motion.div>;
}
