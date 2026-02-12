import { getDocContent, getAllDocPaths } from "@/lib/docs";
import { notFound } from "next/navigation";
import { FeedbackWidget } from "@/components/FeedbackWidget";
// import { TableOfContents } from "@/components/TableOfContents"; // Optionally add TOC
import { CodeBlock } from "@/components/CodeBlock";
import { remark } from "remark";
import html from "remark-html";

// Enable ISR
export const revalidate = 60;

export async function generateStaticParams() {
    const paths = getAllDocPaths();
    return paths.map((path) => ({
        lang: path.lang,
        version: path.version,
        slug: path.slug,
    }));
}

export default async function DocPage(props: { params: Promise<{ lang: string, version: string, slug: string[] }> }) {
    const params = await props.params;
    const doc = getDocContent(params.version, params.lang, params.slug);

    if (!doc) notFound();

    // Parse markdown content
    const processedContent = await remark()
        .use(html)
        .process(doc.content);
    const contentHtml = processedContent.toString();

    return (
        <div className="flex gap-8">
            <div className="flex-1">
                <h1 className="text-3xl font-bold mb-4">{doc.meta.title}</h1>

                {/* Render content safely */}
                <div
                    data-testid="doc-content"
                    className="prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />

                <hr className="my-8" />
                <FeedbackWidget />
            </div>
            {/* <TableOfContents /> */}
        </div>
    );
}
