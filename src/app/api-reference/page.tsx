"use client";

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import React from 'react';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

class ApiErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 text-red-500">
                    <h2>Something went wrong loading the API documentation.</h2>
                    <p>Please check if openapi.json is valid or accessible.</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default function ApiReferencePage() {
    return (
        <div className="p-4 bg-white dark:bg-gray-100 min-h-screen">
            <ApiErrorBoundary>
                <SwaggerUI url="/openapi.json" />
            </ApiErrorBoundary>
        </div>
    );
}
