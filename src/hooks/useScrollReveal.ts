import { useEffect } from "react";

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.2,
  rootMargin: "0px 0px -10% 0px",
};

/**
 * Applies a simple reveal animation to sections when they enter the viewport.
 * Targets all `<section>` elements and any element with the `data-scroll-reveal` attribute.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const candidates = Array.from(
      document.querySelectorAll<HTMLElement>("section, [data-scroll-reveal]")
    ).filter((el) => !el.dataset.scrollRevealIgnore);

    if (candidates.length === 0) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;

        if (entry.isIntersecting) {
          element.classList.add("scroll-reveal-visible");
          element.classList.remove("scroll-reveal-hidden");

          if (element.dataset.scrollRevealOnce !== undefined) {
            observer.unobserve(element);
          }
        } else if (element.dataset.scrollRevealRepeat !== undefined) {
          element.classList.remove("scroll-reveal-visible");
          element.classList.add("scroll-reveal-hidden");
        }
      });
    }, OBSERVER_OPTIONS);

    candidates.forEach((element) => {
      if (!element.dataset.scrollRevealInitialized) {
        element.dataset.scrollRevealInitialized = "true";
        element.classList.add("scroll-reveal-base", "scroll-reveal-hidden");
      }
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);
}
