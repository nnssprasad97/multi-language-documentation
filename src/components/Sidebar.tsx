import Link from 'next/link';
import React from 'react';
import SidebarNav from './SidebarNav';
import { getAllDocs, getDocBySlug } from '@/lib/docs';

async function getDocsList(version: string, lang: string) {
    const slugs = getAllDocs(version, lang);
    const docs = await Promise.all(slugs.map(async (slug) => {
        const doc = await getDocBySlug(version, lang, slug);
        // Simple fallback if doc fails to load or no title
        return { slug, title: doc?.meta?.title || slug };
    }));
    return docs;
}

interface SidebarProps {
    lang?: string;
    version?: string;
}

export default async function Sidebar({ lang = 'en', version = 'v1' }: SidebarProps) {
    const docs = await getDocsList(version, lang);

    return (
        <aside
            data-testid="sidebar"
            className="w-64 h-[calc(100vh-64px)] overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-4 sticky top-16 hidden md:block"
        >
            <nav className="space-y-4">
                <Link
                    href={`/${lang}/docs/${version}/introduction`}
                    className="font-semibold text-gray-500 uppercase text-xs hover:text-gray-900 dark:hover:text-gray-300 block transition-colors"
                >
                    Documentation ({version})
                </Link>
                <SidebarNav docs={docs} lang={lang} version={version} />
            </nav>
        </aside>
    );
}
