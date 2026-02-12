import Link from "next/link";

export function Sidebar({ version, lang }: { version: string, lang: string }) {
    // In a real app, generate these dynamically based on files in _docs
    const links = [
        { slug: "introduction", label: "Introduction" },
        { slug: "getting-started", label: "Getting Started" },
    ];

    return (
        <aside data-testid="sidebar" className="w-64 border-r h-screen p-4 overflow-y-auto hidden md:block">
            <nav className="flex flex-col gap-2">
                {links.map((link) => (
                    <Link
                        key={link.slug}
                        href={`/${lang}/docs/${version}/${link.slug}`}
                        data-testid={`sidebar-nav-link-${link.slug}`}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
