"use client";

import { useState } from "react";
import { motion } from "motion/react";

type Language = "en" | "es";

interface LanguageTogglerProps {
    onLanguageChange?: (lang: Language) => void;
}

export function LanguageToggler({ onLanguageChange }: LanguageTogglerProps) {
    const [language, setLanguage] = useState<Language>("en");

    const handleToggle = () => {
        const newLang = language === "en" ? "es" : "en";
        setLanguage(newLang);
        onLanguageChange?.(newLang);
    };

    return (
        <motion.button
            onClick={handleToggle}
            className="px-3 py-1.5 rounded-lg border-2 border-[var(--color-accent)] text-sm font-mono font-medium hover:bg-[var(--color-accent)] hover:text-[#1a1a2e] transition-colors"
            aria-label={`Language: ${language === "en" ? "English" : "Spanish"}. Switch to ${language === "en" ? "Spanish" : "English"}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.span
                key={language}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.15 }}
                aria-hidden="true"
            >
                {language.toUpperCase()}
            </motion.span>
        </motion.button>
    );
}
