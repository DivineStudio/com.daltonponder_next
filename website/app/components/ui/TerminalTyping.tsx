"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface TerminalTypingProps {
    lines: string[];
    typingSpeed?: number;
    lineDelay?: number;
    className?: string;
}

export function TerminalTyping({
    lines,
    typingSpeed = 50,
    lineDelay = 500,
    className = "",
}: TerminalTypingProps) {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    // Blinking cursor effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
    }, []);

    // Typing effect
    useEffect(() => {
        if (currentLineIndex >= lines.length) return;

        const currentLine = lines[currentLineIndex];
        let charIdx = 0;
        let isCancelled = false;
        let timeoutId: ReturnType<typeof setTimeout>;

        const type = () => {
            if (isCancelled) return;
            if (charIdx < currentLine.length) {
                setDisplayedLines((prev) => {
                    const newLines = [...prev];
                    // Ensure the array is large enough
                    while (newLines.length <= currentLineIndex) {
                        newLines.push("");
                    }
                    newLines[currentLineIndex] = currentLine.slice(0, charIdx + 1);
                    return newLines;
                });
                charIdx++;
                timeoutId = setTimeout(type, typingSpeed);
            } else {
                // Line complete, move to next line
                timeoutId = setTimeout(() => {
                    if (isCancelled) return;
                    setDisplayedLines((prev) => [...prev, ""]);
                    setCurrentLineIndex((prev) => prev + 1);
                }, lineDelay);
            }
        };

        // Initialize first line if empty
        setDisplayedLines((prev) => (prev.length === 0 ? [""] : prev));

        timeoutId = setTimeout(type, typingSpeed);

        return () => {
            isCancelled = true;
            clearTimeout(timeoutId);
        };
    }, [currentLineIndex, lines, typingSpeed, lineDelay]);

    const isTypingComplete = currentLineIndex >= lines.length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`font-mono text-sm md:text-base bg-[var(--color-terminal-bg)] rounded-lg p-4 border border-[var(--color-terminal-border)] ${className}`}
        >
            {lines.map((_, index) => (
                <div key={index} className="flex items-baseline gap-2">
                    <span className="text-accent select-none shrink-0">&gt;</span>
                    <span className="text-[var(--color-terminal-text)]">
                        {displayedLines[index] || ""}
                        {index === currentLineIndex && !isTypingComplete && (
                            <span
                                className={`inline-block w-2 h-4 ml-0.5 bg-accent ${showCursor ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                        )}
                    </span>
                </div>
            ))}
            {/* Stable final prompt line to prevent layout shift */}
            <div className="flex items-baseline gap-2">
                <span className={`text-accent select-none shrink-0 transition-opacity duration-300 ${isTypingComplete ? "opacity-100" : "opacity-0"}`}>&gt;</span>
                {isTypingComplete && (
                    <span
                        className={`inline-block w-2 h-4 bg-accent ${showCursor ? "opacity-100" : "opacity-0"
                            }`}
                    />
                )}
            </div>
        </motion.div>
    );
}
