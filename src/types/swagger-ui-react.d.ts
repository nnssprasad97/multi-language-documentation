declare module 'swagger-ui-react' {
    import * as React from 'react';

    export interface SwaggerUIProps {
        spec?: object;
        url?: string;
        layout?: string;
        docExpansion?: 'list' | 'full' | 'none';
        onComplete?: (system: any) => void;
        requestInterceptor?: (req: any) => any | Promise<any>;
        responseInterceptor?: (res: any) => any | Promise<any>;
        filter?: boolean | string;
        deepLinking?: boolean;
        showExtensions?: boolean;
        showCommonExtensions?: boolean;
        showMutatedRequest?: boolean;
        supportedSubmitMethods?: string[];
        validatorUrl?: string | null;
        presets?: any[];
        plugins?: any[];
        displayOperationId?: boolean;
        displayRequestDuration?: boolean;
        defaultModelExpandDepth?: number;
        defaultModelsExpandDepth?: number;
        defaultModelRendering?: 'example' | 'model';
        tryItOutEnabled?: boolean;
    }

    class SwaggerUI extends React.Component<SwaggerUIProps> { }
    export default SwaggerUI;
}
