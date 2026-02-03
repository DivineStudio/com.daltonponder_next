"use client";

import React, { ReactNode, useCallback } from "react";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";

interface CarouselProps {
    children: ReactNode;
    options?: EmblaOptionsType;
    autoplay?: boolean;
    autoplayDelay?: number;
    className?: string;
    slideClassName?: string;
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
}: CarouselProps & { plugins?: any[]; showDots?: boolean }) {
    const internalPlugins = React.useMemo(() => {
        const p = [...plugins];
        if (autoplay) {
            p.push(
                Autoplay({
                    delay: autoplayDelay,
                    stopOnInteraction: false,
                    stopOnMouseEnter: true
                })
            );
        }
        return p;
    }, [plugins, autoplay, autoplayDelay]);

    const [emblaRef, emblaApi] = useEmblaCarousel(options, internalPlugins);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

    const onInit = React.useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    React.useEffect(() => {
        if (!emblaApi) return;

        onInit(emblaApi);
        onSelect(emblaApi);
        emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
    }, [emblaApi, onInit, onSelect]);

    const scrollTo = React.useCallback(
        (index: number) => {
            if (emblaApi) emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

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
                <div className="flex gap-2 justify-center mt-6 z-10 relative">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === selectedIndex
                                ? "bg-accent w-4"
                                : "bg-[var(--color-base-200)]"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
