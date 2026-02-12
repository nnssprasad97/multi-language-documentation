import { notFound } from 'next/navigation';
import { getAllDocs, getDocBySlug } from '@/lib/docs';
import ReactMarkdown from 'react-markdown';
import Sidebar from '@/components/Sidebar';
import TableOfContents from '@/components/TableOfContents';
import FeedbackWidget from '@/components/FeedbackWidget';
import CodeBlock from '@/components/CodeBlock';
import { getDictionary } from '@/get-dictionary'; // Adjusted import
import rehypeSlug from 'rehype-slug';

export const revalidate = 60;

export async function generateStaticParams() {
    const versions = ['v1', 'v2', 'v3']; // Should be dynamic
    const langs = ['en', 'es', 'fr', 'de'];
    const params = [];

    for (const version of versions) {
        for (const lang of langs) {
            const docs = getAllDocs(version, lang);
            for (const slug of docs) {
                params.push({ lang, version, slug });
            }
        }
    }
    return params;
}

export default async function DocPage({
    params,
}: {
    params: Promise<{ lang: string; version: string; slug: string }>;
}) {
    const { lang, version, slug } = await params;
    const doc = await getDocBySlug(version, lang, slug);
    const dict = await getDictionary(lang);

    if (!doc) {
        notFound();
    }

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar - Mobile/Desktop handled in CSS (hidden md:block) */}

            <div className="flex-1 min-w-0">
                <article data-testid="doc-content" className="prose dark:prose-invert max-w-none">
                    <h1 className="text-3xl font-bold mb-4">{doc.meta.title}</h1>

                    <ReactMarkdown
                        rehypePlugins={[rehypeSlug]}
                        components={{
                            pre: CodeBlock,
                        }}
                    >
                        {doc.meta.contentRaw || doc.content}
                    </ReactMarkdown>
                </article>

                <FeedbackWidget />
            </div>

            <TableOfContents />
        </div>
    );
}

// Note: Ensure `getDocBySlug` returns `content` in a way compatible with ReactMarkdown.
// We previously set it to return `contentHTML`. We should update it to return raw content for ReactMarkdown,
// OR use dangerouslySetInnerHTML if sticking to remark-html.
// Given the Requirement for custom components, ReactMarkdown needs raw markdown.
