"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="rounded-control border border-line bg-surface px-3 py-1.5 text-[12.5px] text-ink-2 shadow-btn hover:bg-hover hover:text-ink"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}
