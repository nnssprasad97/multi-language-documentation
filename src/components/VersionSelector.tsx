"use client";
import { usePathname, useRouter } from "next/navigation";

export function VersionSelector({ currentVersion, label }: { currentVersion: string, label: string }) {
    const router = useRouter();
    const pathname = usePathname();

    const changeVersion = (version: string) => {
        // Assuming version is the 3rd segment in /lang/docs/version/...
        const segments = pathname.split("/");
        // Segments: ["", "lang", "docs", "version", ...]
        if (segments.length >= 4) {
            segments[3] = version;
            const newPath = segments.join("/");
            router.push(newPath);
        }
    };

    const versions = ['v1', 'v2']; // Should be dynamic or configurable

    return (
        <div data-testid="version-selector" className="flex items-center gap-2">
            <span className="text-sm font-medium">{label}:</span>
            <select
                data-testid="version-selector-dropdown"
                value={currentVersion}
                onChange={(e) => changeVersion(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                {versions.map((v) => (
                    <option key={v} value={v}>
                        {v}
                    </option>
                ))}
            </select>
        </div>
    );
}
