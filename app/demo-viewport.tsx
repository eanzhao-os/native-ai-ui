"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function DemoViewport({ children }: { children: ReactNode }) {
  const boundary = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setActive(true);
        observer.disconnect();
      },
      { rootMargin: "800px 0px" },
    );

    if (boundary.current) observer.observe(boundary.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={boundary}
      className="flex min-h-80 w-full items-center justify-center"
    >
      {active ? (
        children
      ) : (
        <span className="sr-only">Demo loads near viewport</span>
      )}
    </div>
  );
}
