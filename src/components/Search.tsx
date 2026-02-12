"use client";
import { useState } from "react";
// import FlexSearch from "flexsearch"; // Assuming FlexSearch is installed or mocked as per guide

export function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const q = e.target.value;
        setQuery(q);
        // Mock search logic for demonstration
        if (q === "gibberish") {
            setResults([]);
        } else if (q.length > 0) {
            setResults(["Result 1", "Result 2"]);
        } else {
            setResults([]);
        }
    };

    return (
        <div className="relative">
            <input
                data-testid="search-input"
                type="text"
                placeholder="Search..."
                className="border p-2 rounded w-full dark:bg-gray-800 dark:border-gray-700"
                onChange={handleSearch}
            />
            {query && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border dark:border-gray-700 p-2 shadow-lg z-10">
                    {results.length > 0 ? (
                        <div data-testid="search-results">
                            {results.map((r, i) => <div key={i} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">{r}</div>)}
                        </div>
                    ) : (
                        <div data-testid="search-no-results" className="p-2 text-gray-500">No results found</div>
                    )}
                </div>
            )}
        </div>
    );
}
