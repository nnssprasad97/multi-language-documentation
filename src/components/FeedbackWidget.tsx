"use client";

import { useState } from "react";

export default function FeedbackWidget() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div data-testid="feedback-success-message" className="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-md">
                Thanks for your feedback!
            </div>
        );
    }

    return (
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-2">Was this page helpful?</h3>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
                <textarea
                    data-testid="feedback-input"
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 font-inherit"
                    placeholder="Any feedback?"
                    required
                />
                <button
                    type="submit"
                    data-testid="feedback-submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
