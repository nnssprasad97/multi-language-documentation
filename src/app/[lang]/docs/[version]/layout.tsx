import Sidebar from "@/components/Sidebar";

export default async function DocsVersionLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string; version: string }>;
}) {
    const { lang, version } = await params;
    return (
        <div className="flex flex-1">
            <Sidebar lang={lang} version={version} />
            <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full min-w-0">
                {children}
            </main>
        </div>
    );
}
