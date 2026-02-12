"use client";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

// Dynamic import to avoid SSR issues with Swagger UI
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function ApiReferencePage() {
    return (
        <div className="p-4 bg-white h-screen overflow-y-auto">
            {/* Ensure public/openapi.json exists */}
            <SwaggerUI url="/openapi.json" />
        </div>
    );
}
