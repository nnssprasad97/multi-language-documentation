"use client";

import { useState, isValidElement } from "react";
import { Copy, Check } from "lucide-react";
import clsx from "clsx";

export default function CodeBlock({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLPreElement>) {
    const [copied, setCopied] = useState(false);

    const onCopy = () => {
        let text = "";
        if (typeof children === "string") {
            text = children;
        } else if (isValidElement(children) && children.props && typeof children.props === 'object' && 'children' in children.props) {
            text = String((children.props as any).children);
        } else {
            // recursive extraction if needed
            // text = ...
        }

        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div data-testid="code-block" className="relative group my-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <button
                data-testid="copy-code-button"
                onClick={onCopy}
                className="absolute right-2 top-2 p-1.5 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Copy to clipboard"
            >
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
            <pre className={clsx("p-4 overflow-x-auto text-sm", className)} {...props}>
                {children}
            </pre>
        </div>
    );
}
