"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Sidebar({ version, lang, dict }: { version: string, lang: string, dict: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const links = [
        { slug: "introduction", label: dict.introduction || "Introduction" },
        { slug: "getting-started", label: dict.getting_started || "Getting Started" },
    ];

    return (
        <>
            <button
                className="md:hidden p-2 fixed bottom-4 right-4 bg-blue-600 text-white rounded-full shadow-lg z-50"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Navigation"
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            <aside
                data-testid="sidebar"
                className={`w-64 border-r h-screen p-4 overflow-y-auto bg-white dark:bg-gray-950 fixed md:sticky top-0 left-0 z-40 transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >
                <nav className="flex flex-col gap-2">
                    {links.map((link) => (
                        <Link
                            key={link.slug}
                            href={`/${lang}/docs/${version}/${link.slug}`}
                            data-testid={`sidebar-nav-link-${link.slug}`}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    );
}

