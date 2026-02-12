import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const docsDirectory = path.join(process.cwd(), '_docs');

export async function getDocBySlug(version: string, lang: string, slug: string) {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(docsDirectory, version, lang, `${realSlug}.md`);

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // We return raw content for ReactMarkdown usage
        // We can also process html if needed, but for now raw content is key.

        return {
            slug: realSlug,
            meta: data,
            content: content,
        };
    } catch (error) {
        console.error(`Error reading doc: ${fullPath}`, error);
        return null;
    }
}

export function getAllDocs(version: string, lang: string) {
    const dir = path.join(docsDirectory, version, lang);
    if (!fs.existsSync(dir)) return [];

    const filenames = fs.readdirSync(dir);
    return filenames.map((name) => name.replace(/\.md$/, ''));
}
