"use client";
import { useState } from "react";

export function FeedbackWidget() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="mt-10 p-4 border rounded">
            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    <textarea data-testid="feedback-input" className="w-full border p-2 mb-2 dark:bg-gray-800 dark:text-white" placeholder="Feedback..." required />
                    <button type="submit" data-testid="feedback-submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Submit
                    </button>
                </form>
            ) : (
                <div data-testid="feedback-success-message" className="text-green-600">
                    Thank you for your feedback!
                </div>
            )}
        </div>
    );
}
