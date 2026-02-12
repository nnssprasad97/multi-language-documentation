"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function LanguageSwitcher() {
    const pathname = usePathname();
    const currentLocale = pathname.split("/")[1];

    const languages = [
        { code: "en", label: "English" },
        { code: "es", label: "Español" },
        { code: "fr", label: "Français" },
        { code: "de", label: "Deutsch" },
    ];

    const getLink = (locale: string) => {
        const segments = pathname.split("/");
        segments[1] = locale;
        return segments.join("/");
    };

    return (
        <div data-testid="language-switcher" className="flex gap-2 text-sm">
            {languages.map((lang) => (
                <Link
                    key={lang.code}
                    href={getLink(lang.code)}
                    className={`hover:underline ${currentLocale === lang.code ? "font-bold" : ""}`}
                >
                    {lang.label}
                </Link>
            ))}
        </div>
    );
}
