"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

const philosophyQuotes = [
    {
        quote: "We suffer more in imagination than in reality.",
        author: "Seneca",
        interpretation: "Most bugs I've debugged at 2am turned out to be simpler than I feared.",
    },
    {
        quote: "The impediment to action advances action. What stands in the way becomes the way.",
        author: "Marcus Aurelius",
        interpretation: "Every constraint forces better solutions. Limitations breed creativity.",
    },
    {
        quote: "No man is free who is not master of himself.",
        author: "Epictetus",
        interpretation: "Clean code discipline today means freedom from tech debt tomorrow.",
    },
    {
        quote: "It is not that we have a short time to live, but that we waste a lot of it.",
        author: "Seneca",
        interpretation: "Automate the mundane. Focus on what truly matters.",
    },
];

interface PhilosophyQuoteProps {
    className?: string;
}

export function PhilosophyQuote({ className = "" }: PhilosophyQuoteProps) {
    // Use ref for stable autoplay plugin reference
    const autoplayPluginRef = useRef(
        Autoplay({ delay: 10000, stopOnInteraction: false, stopOnMouseEnter: true })
    );

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplayPluginRef.current]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    // Sync isPlaying state with actual Autoplay plugin state
    const onAutoplayPlay = useCallback(() => {
        setIsPlaying(true);
    }, []);

    const onAutoplayStop = useCallback(() => {
        setIsPlaying(false);
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setCurrentIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelect);
        emblaApi.on("autoplay:play" as any, onAutoplayPlay);
        emblaApi.on("autoplay:stop" as any, onAutoplayStop);

        // Cleanup on unmount
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("autoplay:play" as any, onAutoplayPlay);
            emblaApi.off("autoplay:stop" as any, onAutoplayStop);
        };
    }, [emblaApi, onAutoplayPlay, onAutoplayStop]);

    const scrollTo = (index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    };

    const toggleAutoplay = useCallback(() => {
        const autoplayPlugin = autoplayPluginRef.current;
        if (!autoplayPlugin) return;

        // Use the plugin's isPlaying method for accurate state
        if (autoplayPlugin.isPlaying()) {
            autoplayPlugin.stop();
        } else {
            autoplayPlugin.play();
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`bento-card relative overflow-hidden ${className}`}
        >
            {/* Decorative element */}
            <div className="absolute top-4 right-4 opacity-10">
                <Icon icon="tabler:quote" width={80} height={80} />
            </div>

            <div className="flex items-center gap-2 mb-4 relative z-10">
                <Icon icon="tabler:brain" width={20} height={20} className="text-accent" />
                <span className="font-mono text-sm text-muted uppercase tracking-wide">
                    Philosophy
                </span>
            </div>

            <div className="overflow-hidden cursor-grab active:cursor-grabbing relative z-10" ref={emblaRef}>
                <div className="flex">
                    {philosophyQuotes.map((quote, index) => (
                        <div className="flex-[0_0_100%] min-w-0" key={index}>
                            <blockquote className="font-serif text-lg md:text-xl italic mb-3">
                                &ldquo;{quote.quote}&rdquo;
                            </blockquote>
                            <p className="text-sm text-muted mb-4">— {quote.author}</p>

                            <div className="border-t border-[var(--card-border)] pt-4">
                                <p className="text-sm text-muted italic">
                                    <span className="text-accent font-medium">My take:</span>{" "}
                                    {quote.interpretation}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Progress dots with play/pause button */}
            <div className="flex gap-2 items-center mt-4 relative z-10">
                {philosophyQuotes.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${index === currentIndex
                            ? "bg-accent w-4"
                            : "bg-[var(--color-base-200)]"
                            }`}
                        aria-label={`Go to quote ${index + 1}`}
                    />
                ))}
                <button
                    onClick={toggleAutoplay}
                    className="ml-2 p-1 rounded-full hover:bg-[var(--color-base-200)] transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
                    title={isPlaying ? "Pause autoplay" : "Resume autoplay"}
                >
                    <Icon
                        icon={isPlaying ? "tabler:player-pause" : "tabler:player-play"}
                        width={16}
                        height={16}
                        className="text-muted"
                    />
                </button>
            </div>
        </motion.div>
    );
}

