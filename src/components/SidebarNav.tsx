"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarNavProps {
    docs: { slug: string; title: string }[];
    lang: string;
    version: string;
}

export default function SidebarNav({ docs, lang, version }: SidebarNavProps) {
    const pathname = usePathname();

    return (
        <ul className="space-y-2">
            {docs.map((doc) => {
                const href = `/${lang}/docs/${version}/${doc.slug}`;
                const isActive = pathname === href;

                return (
                    <li key={doc.slug}>
                        <Link
                            href={href}
                            data-testid={`sidebar-nav-link-${doc.slug}`}
                            className={`block text-sm px-2 py-1.5 rounded transition-colors ${isActive
                                    ? "bg-blue-50 text-blue-600 font-medium dark:bg-blue-900/30 dark:text-blue-400"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                }`}
                        >
                            {doc.title}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
