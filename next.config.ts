import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.supabase.co',
                pathname: '/storage/v1/object/public/**', // Use 'public' if bucket is public
            },
            {
                protocol: 'https',
                hostname: '**.supabase.co',
                port: '',
                pathname: '/storage/v1/object/sign/**'
            }
        ]

    }
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
