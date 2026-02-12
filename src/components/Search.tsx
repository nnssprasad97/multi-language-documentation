"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';

interface SearchResult {
    title: string;
    description: string;
    path: string;
}

export default function Search() {
    const [query, setQuery] = useState("");
    const [allDocs, setAllDocs] = useState<SearchResult[]>([]);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Fetch index once on mount
        fetch('/api/search')
            .then((res) => res.json())
            .then((data) => setAllDocs(data));
    }, []);

    useEffect(() => {
        if (query.trim() === "") {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = allDocs.filter((doc) =>
            doc.title.toLowerCase().includes(lowerQuery) ||
            doc.description?.toLowerCase().includes(lowerQuery)
        );
        setResults(filtered);
    }, [query, allDocs]);

    return (
        <div className="relative group">
            <input
                type="text"
                data-testid="search-input"
                placeholder="Search docs..."
                className="p-2 border rounded text-sm text-gray-700 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            />

            {isOpen && query && (
                <div data-testid="search-results" className="absolute top-full left-0 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg mt-2 max-h-64 overflow-y-auto z-50 p-2">
                    {results.length > 0 ? (
                        results.map((result) => (
                            <Link
                                key={result.path}
                                href={result.path}
                                className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                                <div className="font-semibold text-sm">{result.title}</div>
                                <div className="text-xs text-gray-500 truncate">{result.description}</div>
                            </Link>
                        ))
                    ) : (
                        <div data-testid="search-no-results" className="p-2 text-sm text-gray-500 text-center">
                            No results found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
