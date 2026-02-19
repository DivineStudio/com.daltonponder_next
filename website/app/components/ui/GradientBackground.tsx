'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useMemo, useSyncExternalStore } from 'react';
import { shuffle } from '@/lib/utils';

const emptySubscribe = () => () => { };

// Orb configuration type
interface OrbConfig {
    id: number;
    type: 'primary' | 'accent';
    size: number;
    blur: number;
    top: number;
    left: number;
    duration: number;
    delay: number;
    movement: {
        x: number[];
        y: number[];
        scale?: number[];
    };
}

// Generate random number within range
function random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

// Generate orb configurations using grid-based distribution
function generateOrbs(): OrbConfig[] {
    const orbs: OrbConfig[] = [];

    // Grid layout: 2 columns x 3 rows = 6 cells for 6 orbs
    const cols = 2;
    const rows = 3;
    const cellWidth = 80 / cols;  // 80% width (leaving margins)
    const cellHeight = 180 / rows; // 180% height (leaving margins in 200vh container)

    let orbIndex = 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Calculate cell boundaries
            const cellLeft = 5 + col * cellWidth;
            const cellTop = 5 + row * cellHeight;

            // Random position within cell (with padding to avoid edges)
            const padding = 5;
            const left = cellLeft + padding + random(0, cellWidth - padding * 2);
            const top = cellTop + padding + random(0, cellHeight - padding * 2);

            // Alternate colors to ensure mix
            const isPrimary = orbIndex % 2 === 0;
            const size = random(40, 95);
            const blur = random(20, 45);

            // Random movement patterns
            const moveX = random(40, 150);
            const moveY = random(40, 120);
            const hasScale = Math.random() > 0.4;

            orbs.push({
                id: orbIndex,
                type: isPrimary ? 'primary' : 'accent',
                size,
                blur,
                top,
                left,
                duration: random(30, 45),
                delay: random(0, 5),
                movement: {
                    x: [0, moveX, -moveX * 0.7, 0],
                    y: [0, -moveY, moveY * 0.8, 0],
                    ...(hasScale ? { scale: [1, random(1.1, 1.4), random(0.8, 0.95), 1] } : {}),
                },
            });

            orbIndex++;
        }
    }

    // Shuffle array to randomize render order (so colors aren't in predictable pattern)
    return shuffle(orbs);
}

export default function GradientBackground() {
    const isClient = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );
    const { scrollY } = useScroll();

    // Parallax effect: Moves background UP as you scroll DOWN.
    // Extended range prevents clamping.
    const y = useTransform(scrollY, [0, 5000], ["0px", "-1000px"]);

    // Generate orbs once on mount (useMemo with empty deps runs once)
    const orbs = useMemo(() => generateOrbs(), []);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none bg-[radial-gradient(circle_at_50%_50%,rgba(64,121,140,0.05),transparent_50%)]">
            {!isClient ? null : (
                <motion.div style={{ y }} className="relative w-full h-[200vh]">
                    {/*
                        Container is double height (200%) to accommodate the parallax shift
                        and ensure orbs exist "below the fold" that scroll into view.
                    */}
                {orbs.map((orb) => (
                    <motion.div
                        key={orb.id}
                        className={`absolute rounded-full mix-blend-multiply filter dark:mix-blend-normal ${orb.type === 'primary'
                            ? 'opacity-[0.4] dark:opacity-[0.4]'
                            : 'opacity-[0.55] dark:opacity-[0.2]'
                            }`}
                        style={{
                            background: orb.type === 'primary'
                                ? 'var(--color-primary)'
                                : 'var(--color-accent)',
                            width: orb.size,
                            height: orb.size,
                            top: `${orb.top}%`,
                            left: `${orb.left}%`,
                            filter: `blur(${orb.blur}px)`,
                        }}
                        animate={orb.movement}
                        transition={{
                            duration: orb.duration,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: orb.delay,
                        }}
                    />
                ))}
            </motion.div>
            )}
        </div>
    );
}
