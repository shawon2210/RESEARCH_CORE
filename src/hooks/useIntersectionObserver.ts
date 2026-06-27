"use client";

import { useEffect, useState, useRef, type RefObject } from "react";

interface Options {
  threshold?: number;
  rootMargin?: string;
}

export function useIntersectionObserver(
  ref: RefObject<HTMLElement | null>,
  options: Options = {}
): boolean {
  const [isVisible, setIsVisible] = useState(false);
  const hasBeenVisible = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasBeenVisible.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          hasBeenVisible.current = true;
          observer.unobserve(element);
        }
      },
      { threshold: options.threshold ?? 0.1, rootMargin: options.rootMargin ?? "0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options.threshold, options.rootMargin]);

  return isVisible;
}
