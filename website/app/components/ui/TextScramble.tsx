'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';

interface TextScrambleProps {
    text: string;
    className?: string;
    duration?: number;
    delay?: number;
    characterSet?: string;
    scrambleSpeed?: number; // Time in ms between character updates (slower = less chaotic)
}

export const TextScramble = ({
    text,
    className = '',
    duration = 1.5, // Total duration of the effect
    delay = 0,
    characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
    scrambleSpeed = 50, // Default: Update random chars every 50ms (approx 20fps)
}: TextScrambleProps) => {
    const [display, setDisplay] = useState(text);
    const ref = useRef<HTMLSpanElement>(null);
    const bufferRef = useRef<string[]>([]);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number | null = null;
        let lastScrambleTime = 0;
        let frameId: number;

        // Start delay
        const timeoutId = setTimeout(() => {
            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const timeElapsed = timestamp - startTime;
                const progress = timeElapsed / (duration * 1000);

                if (progress >= 1) {
                    setDisplay(text);
                    return;
                }

                // Check if enough time has passed to update the scrambled characters
                // OR if we need to reveal a new character (to ensure smooth unlocking)
                if (timestamp - lastScrambleTime >= scrambleSpeed) {
                    lastScrambleTime = timestamp;

                    // Calculate how many characters should be revealed based on progress
                    const revealIndex = Math.floor(text.length * progress);
                    const textLen = text.length;
                    const charSetLen = characterSet.length;

                    // Initialize or resize buffer if needed
                    if (bufferRef.current.length !== textLen) {
                        bufferRef.current = new Array(textLen);
                    }

                    for (let i = 0; i < textLen; i++) {
                        const char = text[i];
                        if (char === ' ') {
                            bufferRef.current[i] = ' ';
                        } else if (i < revealIndex) {
                            bufferRef.current[i] = char;
                        } else {
                            bufferRef.current[i] = characterSet[Math.floor(Math.random() * charSetLen)];
                        }
                    }

                    setDisplay(bufferRef.current.join(''));
                }

                frameId = requestAnimationFrame(animate);
            };

            frameId = requestAnimationFrame(animate);
        }, delay * 1000);

        return () => {
            clearTimeout(timeoutId);
            cancelAnimationFrame(frameId);
        };
    }, [isInView, text, duration, delay, characterSet, scrambleSpeed]);

    return (
        <span
            ref={ref}
            className={className}
            aria-label={text} // Accessible label
        >
            {display}
        </span>
    );
};
