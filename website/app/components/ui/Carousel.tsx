"use client";

import React, { ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay, { AutoplayType } from "embla-carousel-autoplay";
import { EmblaOptionsType, EmblaCarouselType, EmblaPluginType } from "embla-carousel";
import { Icon } from "@iconify/react";

interface CarouselProps {
    children: ReactNode;
    options?: EmblaOptionsType;
    autoplay?: boolean;
    autoplayDelay?: number;
    className?: string;
    slideClassName?: string;
    plugins?: EmblaPluginType[];
    showDots?: boolean;
}

export function Carousel({
    children,
    options = { loop: true, align: "start", dragFree: true },
    autoplay = true,
    autoplayDelay = 4000,
    className = "",
    slideClassName = "",
    plugins = [],
    showDots = false,
}: CarouselProps) {
    const [isPlaying, setIsPlaying] = React.useState(autoplay);

    // Use ref for stable autoplay plugin reference
    const autoplayPluginRef = React.useRef<AutoplayType | null | undefined>(undefined);

    // Lazily initialize the autoplay plugin
    if (autoplayPluginRef.current === undefined) {
        autoplayPluginRef.current = autoplay
            ? Autoplay({
                delay: autoplayDelay,
                stopOnInteraction: false,
                stopOnMouseEnter: true
            })
            : null;
    }

    const internalPlugins = React.useMemo(() => {
        const p = [...plugins];
        if (autoplayPluginRef.current) {
            p.push(autoplayPluginRef.current);
        }
        return p;
    }, [plugins]);

    const [emblaRef, emblaApi] = useEmblaCarousel(options, internalPlugins);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

    const onInit = React.useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    // Sync isPlaying state with actual Autoplay plugin state
    const onAutoplayPlay = React.useCallback(() => {
        setIsPlaying(true);
    }, []);

    const onAutoplayStop = React.useCallback(() => {
        setIsPlaying(false);
    }, []);

    React.useEffect(() => {
        if (!emblaApi) return;

        onInit(emblaApi);
        onSelect(emblaApi);

        // Add Embla event listeners
        emblaApi.on("reInit", onInit);
        emblaApi.on("reInit", onSelect);
        emblaApi.on("select", onSelect);

        // Add Autoplay plugin event listeners to sync state
        const autoplayPlugin = autoplayPluginRef.current;
        if (autoplayPlugin) {
            emblaApi.on("autoplay:play", onAutoplayPlay);
            emblaApi.on("autoplay:stop", onAutoplayStop);
        }

        // Cleanup on unmount
        return () => {
            emblaApi.off("reInit", onInit);
            emblaApi.off("reInit", onSelect);
            emblaApi.off("select", onSelect);
            if (autoplayPlugin) {
                emblaApi.off("autoplay:play", onAutoplayPlay);
                emblaApi.off("autoplay:stop", onAutoplayStop);
            }
        };
    }, [emblaApi, onInit, onSelect, onAutoplayPlay, onAutoplayStop]);

    const scrollTo = React.useCallback(
        (index: number) => {
            if (emblaApi) emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    const toggleAutoplay = React.useCallback(() => {
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
        <div className={`relative ${className}`}>
            <div className={`overflow-hidden cursor-grab active:cursor-grabbing`} ref={emblaRef}>
                <div className="flex touch-pan-y gap-4">
                    {React.Children.map(children, (child, index) => (
                        <div className={`flex-[0_0_auto] min-w-0 ${slideClassName}`} key={index}>
                            {child}
                        </div>
                    ))}
                </div>
            </div>
            {showDots && (
                <div className="flex gap-2 justify-center items-center mt-6 z-10 relative">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${index === selectedIndex
                                ? "bg-accent w-4"
                                : "bg-[var(--color-base-200)]"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                    {autoplay && (
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
                    )}
                </div>
            )}
        </div>
    );
}

