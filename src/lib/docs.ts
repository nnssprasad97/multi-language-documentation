import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const docsDirectory = path.join(process.cwd(), '_docs');

export function getDocContent(version: string, lang: string, slug: string[]) {
    const realSlug = slug.join('/');
    const fullPath = path.join(docsDirectory, version, lang, `${realSlug}.md`);

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        return { slug: realSlug, meta: data, content };
    } catch {
        return null;
    }
}

export function getAllDocPaths() {
    const versions = fs.readdirSync(docsDirectory);
    const paths: { lang: string; version: string; slug: string[] }[] = [];

    versions.forEach((version) => {
        const versionPath = path.join(docsDirectory, version);
        if (!fs.statSync(versionPath).isDirectory()) return;

        const langs = fs.readdirSync(versionPath);
        langs.forEach((lang) => {
            const langPath = path.join(versionPath, lang);
            if (!fs.statSync(langPath).isDirectory()) return;

            const walk = (dir: string, currentSlug: string[]) => {
                const files = fs.readdirSync(dir);
                files.forEach((file) => {
                    const filePath = path.join(dir, file);
                    const stat = fs.statSync(filePath);

                    if (stat.isDirectory()) {
                        walk(filePath, [...currentSlug, file]);
                    } else if (file.endsWith('.md')) {
                        const slug = [...currentSlug, file.replace(/\.md$/, '')];
                        paths.push({ lang, version, slug });
                    }
                });
            };

            walk(langPath, []);
        });
    });

    return paths;
}
