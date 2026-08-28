"use client";

import { useEffect, useState } from "react";

export function useSectionSpy(ids: string[], initialId: string) {
  const [activeId, setActiveId] = useState(initialId);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || ids.length === 0) return;
    const visibleEntries = new Map<Element, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleEntries.set(entry.target, entry);
          else visibleEntries.delete(entry.target);
        }

        const nearest = [...visibleEntries.values()].sort(
          (left, right) =>
            Math.abs(left.boundingClientRect.top - 120) -
            Math.abs(right.boundingClientRect.top - 120),
        )[0];
        if (nearest?.target.id) setActiveId(nearest.target.id);
      },
      { rootMargin: "-100px 0px -65% 0px" },
    );

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
