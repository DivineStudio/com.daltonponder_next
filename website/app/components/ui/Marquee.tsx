import { ReactNode } from "react";

interface MarqueeProps {
    children: ReactNode;
    direction?: "left" | "right";
    speed?: "slow" | "normal" | "fast";
    pauseOnHover?: boolean;
    className?: string;
}

const speedClasses = {
    slow: "duration-[40s]",
    normal: "duration-[30s]",
    fast: "duration-[20s]",
};

export function Marquee({
    children,
    direction = "left",
    speed = "normal",
    pauseOnHover = true,
    className = "",
}: MarqueeProps) {
    const animationClass =
        direction === "left" ? "animate-marquee" : "animate-marquee-reverse";

    return (
        <div
            className={`marquee-track overflow-hidden ${className}`}
            style={{
                maskImage:
                    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
        >
            <div
                className={`flex ${pauseOnHover ? "group" : ""}`}
                style={{ width: "max-content" }}
            >
                <div
                    className={`flex ${animationClass} ${speedClasses[speed]}`}
                    style={{
                        animationPlayState: pauseOnHover ? undefined : "running",
                    }}
                >
                    <div className="flex items-center gap-8 pr-8 shrink-0">
                        {children}
                    </div>
                    <div className="flex items-center gap-8 pr-8 shrink-0">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface MarqueeItemProps {
    children: ReactNode;
    className?: string;
}

export function MarqueeItem({ children, className = "" }: MarqueeItemProps) {
    return (
        <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] transition-transform hover:scale-105 ${className}`}
        >
            {children}
        </div>
    );
}
