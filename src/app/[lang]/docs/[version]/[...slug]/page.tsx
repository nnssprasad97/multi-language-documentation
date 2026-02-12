import { getDocContent, getAllDocPaths } from "@/lib/docs";
import { notFound } from "next/navigation";
import { FeedbackWidget } from "@/components/FeedbackWidget";
// import { TableOfContents } from "@/components/TableOfContents"; // Optionally add TOC
import { CodeBlock } from "@/components/CodeBlock";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

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
    const processedContent = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings)
        .use(rehypeStringify)
        .process(doc.content);
    const contentHtml = processedContent.toString();

    return (
        <div className="flex gap-8">
            <div className="flex-1">
                <h1 className="text-3xl font-bold mb-4">{doc.meta.title}</h1>


                {/* Render content safely with hydration for code blocks */}
                <div data-testid="doc-content">
                    <CodeBlock htmlContent={contentHtml} />
                </div>

                <div className="mt-8 text-sm text-gray-500">
                    <a
                        href={`https://github.com/nnssprasad97/multi-language-documentation/edit/main/doc-portal/_docs/${params.version}/${params.lang}/${params.slug.join("/")}.md`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        Edit this page on GitHub
                    </a>
                </div>
                <hr className="my-8" />
                <FeedbackWidget />
            </div>
            {/* <TableOfContents /> */}
        </div>
    );
}
