"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";

export function ThemeToggler() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-[var(--color-accent)]"
                aria-label="Toggle theme"
            >
                <div className="w-5 h-5" />
            </button>
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <motion.button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[#1a1a2e] transition-colors"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                key={isDark ? "moon" : "sun"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {isDark ? (
                    <Icon icon="tabler:sun" width={20} height={20} />
                ) : (
                    <Icon icon="tabler:moon" width={20} height={20} />
                )}
            </motion.div>
        </motion.button>
    );
}
