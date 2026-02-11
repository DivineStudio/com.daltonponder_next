"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";

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
    const inputSequenceRef = useRef<string[]>([]);
    const [isActivated, setIsActivated] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleKeyDown = (e: KeyboardEvent) => {
            const sequence = inputSequenceRef.current;
            sequence.push(e.code);

            if (sequence.length > KONAMI_CODE.length) {
                sequence.shift();
            }

            if (
                sequence.length === KONAMI_CODE.length &&
                sequence.every((code, i) => code === KONAMI_CODE[i])
            ) {
                setIsActivated(true);
                sequence.length = 0;
                // Auto-hide after 5 seconds
                timeoutId = setTimeout(() => setIsActivated(false), 5000);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    return { isActivated, setIsActivated };
}

export function EasterEggOverlay() {
    const { isActivated, setIsActivated } = useKonamiCode();

    const [particles] = useState(() => {
        return [...Array(20)].map(() => ({
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            rotate: Math.random() * 360,
            delay: Math.random() * 0.5,
            icon: ["tabler:star", "tabler:device-gamepad-2", "tabler:device-laptop", "tabler:rocket", "tabler:sparkles"][Math.floor(Math.random() * 5)]
        }));
    });

    // Add Escape key handler for accessibility
    useEffect(() => {
        if (!isActivated) return;
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsActivated(false);
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isActivated, setIsActivated]);

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
                            className="text-8xl mb-6 text-accent flex justify-center"
                        >
                            <Icon icon="tabler:device-gamepad-2" width={96} height={96} />
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
                    {particles.map((particle, i) => (
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
                                x: particle.x,
                                y: particle.y,
                                scale: [0, 1, 0],
                                rotate: particle.rotate,
                            }}
                            transition={{
                                duration: 2,
                                delay: particle.delay,
                                ease: "easeOut",
                            }}
                            className="fixed text-2xl pointer-events-none text-accent"
                        >
                            <Icon
                                icon={particle.icon}
                                width={24}
                                height={24}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
