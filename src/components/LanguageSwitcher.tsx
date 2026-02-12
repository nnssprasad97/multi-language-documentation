"use client";
import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLang = pathname.split("/")[1];

    const changeLanguage = (lang: string) => {
        const newPath = pathname.replace(`/${currentLang}`, `/${lang}`);
        router.push(newPath);
    };

    return (
        <div data-testid="language-switcher" className="flex gap-2">
            {['en', 'es', 'fr', 'de'].map((lang) => (
                <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className="uppercase font-bold text-sm"
                    data-testid={`language-switcher-option-${lang}`}
                >
                    {lang}
                </button>
            ))}
        </div>
    );
}
