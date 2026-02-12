import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { withVercelToolbar } from "@vercel/toolbar/plugins/next";

const withNextIntl = createNextIntlPlugin();

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://hcaptcha.com https://*.hcaptcha.com https://va.vercel-scripts.com https://vercel.live;
    style-src 'self' 'unsafe-inline' https://hcaptcha.com https://*.hcaptcha.com https://vercel.live;
    img-src 'self' blob: data: https://hcaptcha.com https://*.hcaptcha.com https://vercel.live https://vercel.com;
    font-src 'self' data: https://hcaptcha.com https://*.hcaptcha.com https://vercel.live;
    object-src 'none';
    base-uri 'self';
    form-action 'self' https://formspree.io;
    frame-src https://hcaptcha.com https://*.hcaptcha.com https://vercel.live;
    frame-ancestors 'self' https://vercel.com;
    connect-src 'self' https://formspree.io https://hcaptcha.com https://*.hcaptcha.com https://vitals.vercel-insights.com https://*.vercel-analytics.com https://api.iconify.design https://api.simplesvg.com https://api.unisvg.com https://vercel.live https://*.vercel.live;
    upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  poweredByHeader: false,
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

export default withVercelToolbar()(withNextIntl(nextConfig));
