import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { VersionSelector } from "@/components/VersionSelector";
import { getDictionary } from "@/lib/dictionary";
import { Search } from "@/components/Search";

export default async function DocsLayout(props: {
    children: React.ReactNode;
    params: Promise<{ lang: string; version: string }>;
}) {
    const params = await props.params;
    const { children } = props;
    const dict = await getDictionary(params.lang);

    return (
        <div className="flex flex-col min-h-screen">
            <header className="h-16 border-b flex items-center justify-between px-6 dark:border-gray-700">
                <div className="font-bold text-xl">DocPortal</div>
                <div className="flex gap-4 items-center">
                    <div className="w-64 hidden md:block">
                        <Search placeholder={dict.search_placeholder} />
                    </div>
                    <VersionSelector currentVersion={params.version} label={dict.version} />
                    <LanguageSwitcher />
                    <ThemeToggle />
                </div>
            </header>
            <div className="flex flex-1">
                <Sidebar lang={params.lang} version={params.version} dict={dict} />
                <main className="flex-1 p-8 max-w-4xl mx-auto">{children}</main>
            </div>
        </div>
    );
}

