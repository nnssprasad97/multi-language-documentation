import { redirect } from 'next/navigation';

export default async function LanguagePage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    redirect(`/${lang}/docs/v1/introduction`);
}
