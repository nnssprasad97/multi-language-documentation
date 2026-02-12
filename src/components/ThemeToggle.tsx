"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ label = "Theme" }: { label?: string }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <button className="p-2 border rounded opacity-50 cursor-not-allowed">Loading...</button>;
    }

    return (
        <button
            data-testid="theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
            <span className="sr-only">{label}</span>
        </button>
    );
}
