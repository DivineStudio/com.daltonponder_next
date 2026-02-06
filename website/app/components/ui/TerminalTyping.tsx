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
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
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

        if (currentCharIndex < currentLine.length) {
            const timeout = setTimeout(() => {
                setDisplayedLines((prev) => {
                    const newLines = [...prev];
                    newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
                    return newLines;
                });
                setCurrentCharIndex((prev) => prev + 1);
            }, typingSpeed);
            return () => clearTimeout(timeout);
        } else {
            // Line complete, move to next line
            const timeout = setTimeout(() => {
                setCurrentLineIndex((prev) => prev + 1);
                setCurrentCharIndex(0);
                setDisplayedLines((prev) => [...prev, ""]);
            }, lineDelay);
            return () => clearTimeout(timeout);
        }
    }, [currentLineIndex, currentCharIndex, lines, typingSpeed, lineDelay]);

    const isTypingComplete = currentLineIndex >= lines.length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`font-mono text-sm md:text-base bg-[var(--color-terminal-bg)] rounded-lg p-4 border border-[var(--color-terminal-border)] ${className}`}
        >
            {displayedLines.map((line, index) => (
                <div key={index} className="flex items-center gap-2">
                    <span className="text-accent select-none">&gt;</span>
                    <span className="text-[var(--color-terminal-text)]">
                        {line}
                        {index === currentLineIndex && !isTypingComplete && (
                            <span
                                className={`inline-block w-2 h-4 ml-0.5 bg-accent ${showCursor ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                        )}
                    </span>
                </div>
            ))}
            {isTypingComplete && (
                <div className="flex items-center gap-2">
                    <span className="text-accent select-none">&gt;</span>
                    <span
                        className={`inline-block w-2 h-4 bg-accent ${showCursor ? "opacity-100" : "opacity-0"
                            }`}
                    />
                </div>
            )}
        </motion.div>
    );
}
