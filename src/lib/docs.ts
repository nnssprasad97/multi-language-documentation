import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const docsDirectory = path.join(process.cwd(), '_docs');

export function getDocContent(version: string, lang: string, slug: string[]) {
    const realSlug = slug.join('/');
    const fullPath = path.join(docsDirectory, version, lang, `${realSlug}.md`);

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        return { slug: realSlug, meta: data, content };
    } catch (e) {
        return null;
    }
}

export function getAllDocPaths() {
    // This would ideally recursively walk the _docs directory
    // For simplicity, we assume a flat structure or specific nested levels
    // You must implement directory walking here for robust nested routing
    return [];
}
