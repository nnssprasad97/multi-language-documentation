"use client";
import { useState } from "react";

export function CodeBlock({ children }: { children: string }) {
    const handleCopy = () => {
        navigator.clipboard.writeText(children);
    };

    return (
        <div data-testid="code-block" className="relative group bg-gray-900 text-white p-4 rounded my-4">
            <button
                data-testid="copy-code-button"
                onClick={handleCopy}
                className="absolute top-2 right-2 bg-gray-700 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition"
            >
                Copy
            </button>
            <pre><code>{children}</code></pre>
        </div>
    );
}
