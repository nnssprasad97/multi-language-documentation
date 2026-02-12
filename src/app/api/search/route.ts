import { NextResponse } from 'next/server';
import { getAllDocs, getDocBySlug } from '@/lib/docs';

export async function GET() {
    const versions = ['v1', 'v2', 'v3'];
    const langs = ['en', 'es', 'fr', 'de'];
    const results = [];

    for (const version of versions) {
        for (const lang of langs) {
            const slugs = getAllDocs(version, lang);
            for (const slug of slugs) {
                const doc = await getDocBySlug(version, lang, slug);
                if (doc) {
                    results.push({
                        title: doc.meta.title,
                        description: doc.meta.description,
                        slug: doc.slug,
                        version,
                        lang,
                        path: `/${lang}/docs/${version}/${slug}`
                    });
                }
            }
        }
    }

    return NextResponse.json(results);
}
