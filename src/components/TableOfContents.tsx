"use client";

import { useEffect, useState } from "react";

export default function TableOfContents() {
    const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll("h2, h3"));
        const headingsData = elements
            .filter((elem) => elem.id)
            .map((elem) => ({
                id: elem.id,
                text: elem.textContent || "",
            }));
        setHeadings(headingsData);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -80% 0px" }
        );

        elements.forEach((elem) => observer.observe(elem));

        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <nav data-testid="table-of-contents" className="space-y-2 sticky top-24 hidden xl:block w-64 pl-4 border-l border-gray-200 dark:border-gray-800">
            <p className="font-semibold text-sm mb-4">On this page</p>
            <ul className="space-y-2 text-sm">
                {headings.map((heading) => (
                    <li key={heading.id}>
                        <a
                            href={`#${heading.id}`}
                            data-testid={`toc-link-${heading.id}`}
                            data-active={activeId === heading.id}
                            className={`block hover:text-blue-600 transition-colors ${activeId === heading.id
                                ? "text-blue-600 font-medium"
                                : "text-gray-600 dark:text-gray-400"
                                }`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({
                                    behavior: "smooth",
                                });
                                setActiveId(heading.id);
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
