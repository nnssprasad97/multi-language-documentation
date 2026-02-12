"use client";

import { usePathname, useRouter } from "next/navigation";

export default function VersionSelector() {
    const pathname = usePathname();
    const router = useRouter();

    // Assumes path is /[lang]/docs/[version]/...
    const segments = pathname.split("/");
    // segments[0] = ""
    // segments[1] = lang
    // segments[2] = "docs"
    // segments[3] = version (v1, v2)

    const currentVersion = segments[3] && segments[3].startsWith("v") ? segments[3] : "v1";

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newVersion = e.target.value;
        segments[3] = newVersion;
        router.push(segments.join("/"));
    };

    if (!segments[2] || segments[2] !== 'docs') return null;

    return (
        <div className="relative">
            <select
                data-testid="version-selector"
                value={currentVersion}
                onChange={handleChange}
                className="appearance-none bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="v1" data-testid="version-option-v1">v1</option>
                <option value="v2" data-testid="version-option-v2">v2</option>
                <option value="v3" data-testid="version-option-v3">v3</option>
            </select>
        </div>
    );
}
