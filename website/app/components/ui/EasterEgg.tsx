"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const KONAMI_CODE = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
];

export function useKonamiCode() {
    const [inputSequence, setInputSequence] = useState<string[]>([]);
    const [isActivated, setIsActivated] = useState(false);

    const resetSequence = useCallback(() => {
        setInputSequence([]);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const newSequence = [...inputSequence, e.code].slice(-KONAMI_CODE.length);
            setInputSequence(newSequence);

            if (newSequence.join(",") === KONAMI_CODE.join(",")) {
                setIsActivated(true);
                resetSequence();
                // Auto-hide after 5 seconds
                setTimeout(() => setIsActivated(false), 5000);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [inputSequence, resetSequence]);

    return { isActivated, setIsActivated };
}

export function EasterEggOverlay() {
    const { isActivated, setIsActivated } = useKonamiCode();

    return (
        <AnimatePresence>
            {isActivated && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={() => setIsActivated(false)}
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="text-center p-8"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-8xl mb-6"
                        >
                            🎮
                        </motion.div>
                        <h2 className="font-mono text-3xl md:text-4xl font-bold text-white mb-4">
                            ACHIEVEMENT UNLOCKED!
                        </h2>
                        <p className="text-xl text-white/80 mb-2">
                            You found the Konami Code! 🎉
                        </p>
                        <p className="text-sm text-white/60">
                            ↑↑↓↓←→←→BA
                        </p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 text-white/40 text-sm"
                        >
                            Click anywhere to close
                        </motion.div>
                    </motion.div>

                    {/* Confetti-like particles */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                opacity: 1,
                                x: "50vw",
                                y: "50vh",
                                scale: 0,
                            }}
                            animate={{
                                opacity: 0,
                                x: `${Math.random() * 100}vw`,
                                y: `${Math.random() * 100}vh`,
                                scale: [0, 1, 0],
                                rotate: Math.random() * 360,
                            }}
                            transition={{
                                duration: 2,
                                delay: Math.random() * 0.5,
                                ease: "easeOut",
                            }}
                            className="fixed text-2xl pointer-events-none"
                        >
                            {["⭐", "🎮", "💻", "🚀", "✨"][Math.floor(Math.random() * 5)]}
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
