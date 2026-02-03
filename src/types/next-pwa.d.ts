declare module 'next-pwa' {
    import { NextConfig } from 'next';

    interface PWAConfig {
        dest?: string;
        register?: boolean;
        skipWaiting?: boolean;
        disable?: boolean;
        fallbacks?: {
            document?: string;
            image?: string;
            audio?: string;
            video?: string;
            font?: string;
        };
        additionalManifestEntries?: Array<{
            url: string;
            revision: string | null;
        }>;
        publicExcludes?: string[];
        buildExcludes?: (string | RegExp)[];
    }

    function withPWAInit(config: PWAConfig): (nextConfig: NextConfig) => NextConfig;

    export default withPWAInit;
}
