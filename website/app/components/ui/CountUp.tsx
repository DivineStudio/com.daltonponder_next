"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "motion/react";

interface CountUpProps {
    end: number;
    suffix?: string;
    duration?: number;
}

export function CountUp({ end, suffix = "", duration = 2 }: CountUpProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrameId: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isInView, end, duration]);

    return (
        <span ref={ref}>
            <span aria-hidden="true">{count}{suffix}</span>
            <span className="sr-only">{end}{suffix}</span>
        </span>
    );
}
