"use client";
import { useEffect, useState } from "react";

export function TableOfContents() {
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
    const [activeId, setActiveId] = useState("");

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll("h2, h3"))
            .map((elem) => ({
                id: elem.id,
                text: elem.textContent || "",
                level: Number(elem.tagName.substring(1)),
            }));
        setHeadings(elements);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -40% 0px" }
        );

        elements.forEach((elem) => {
            const el = document.getElementById(elem.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <nav data-testid="table-of-contents" className="toc ml-4 w-64 hidden xl:block">
            <h3 className="font-bold mb-2 uppercase text-sm text-gray-500">On this page</h3>
            <ul className="space-y-1 text-sm border-l pl-4 border-gray-200 dark:border-gray-700">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        className={`transition-colors ${activeId === heading.id
                            ? "text-blue-600 font-medium border-l-2 border-blue-600 -ml-[18px] pl-[14px]"
                            : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                            }`}
                        style={{ paddingLeft: (heading.level - 2) * 12 + (activeId === heading.id ? 14 : 0) }}
                    >
                        <a
                            href={`#${heading.id}`}
                            data-testid={`toc-link-${heading.id}`}
                            data-active={activeId === heading.id ? "true" : "false"}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" });
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
