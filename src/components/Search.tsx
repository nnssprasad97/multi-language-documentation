"use client";
import React, { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import FlexSearch from "flexsearch";
import { useRouter } from "next/navigation";

// Mock data to simulate content indexing
const contentLibrary = [
    { id: "/en/docs/v1/introduction", title: "Introduction", content: "Welcome to the documentation." },
    { id: "/en/docs/v1/getting-started", title: "Getting Started", content: "Get started with installation and setup." },
    { id: "/es/docs/v1/introduction", title: "Introducción", content: "Bienvenido a la documentación." },
    // Add more as needed
];

export function Search({ placeholder = "Search..." }: { placeholder?: string }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<{ id: string; title: string }[]>([]);
    const [index, setIndex] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        // Initialize FlexSearch index
        const idx = new FlexSearch.Document({
            document: {
                id: "id",
                index: ["title", "content"],
            }
        });

        // Add content to index
        contentLibrary.forEach(doc => idx.add(doc));
        setIndex(idx);
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const q = e.target.value;
        setQuery(q);

        if (q.length > 0 && index) {
            const searchResults = index.search(q, { limit: 5 });
            // Flatten results from FlexSearch
            const flatResults = searchResults.flatMap((field: any) => field.result.map((r: any) => {
                const doc = contentLibrary.find(d => d.id === r);
                return doc ? { id: doc.id, title: doc.title } : null;
            })).filter(Boolean);

            // Deduplicate
            const uniqueResults = Array.from(new Set(flatResults.map((r: any) => r.id)))
                .map(id => flatResults.find((r: any) => r.id === id));

            setResults(uniqueResults as any);
        } else {
            setResults([]);
        }
    };

    return (
        <div className="relative">
            <div className="flex items-center border rounded px-2 dark:border-gray-600 bg-white dark:bg-gray-800">
                <SearchIcon size={18} className="text-gray-400" />
                <input
                    data-testid="search-input"
                    type="text"
                    placeholder={placeholder}
                    className="p-2 outline-none bg-transparent w-full dark:text-white"
                    value={query}
                    onChange={handleSearch}
                />
            </div>

            {results.length > 0 && (
                <div data-testid="search-results" className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded mt-1 shadow-lg z-50">
                    <ul>
                        {results.map((result) => (
                            <li key={result.id}>
                                <button
                                    className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => {
                                        router.push(result.id);
                                        setQuery("");
                                        setResults([]);
                                    }}
                                >
                                    {result.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
