import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://hcaptcha.com https://*.hcaptcha.com https://va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline' https://hcaptcha.com https://*.hcaptcha.com;
    img-src 'self' blob: data: https://hcaptcha.com https://*.hcaptcha.com;
    font-src 'self' data: https://hcaptcha.com https://*.hcaptcha.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self' https://formspree.io;
    frame-src https://hcaptcha.com https://*.hcaptcha.com;
    frame-ancestors 'none';
    connect-src 'self' https://formspree.io https://hcaptcha.com https://*.hcaptcha.com https://vitals.vercel-insights.com https://*.vercel-analytics.com https://api.iconify.design https://api.simplesvg.com https://api.unisvg.com;
    upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\s{2,}/g, ' ').trim(),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
