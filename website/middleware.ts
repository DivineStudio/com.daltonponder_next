import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

// Create the i18n middleware
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Allow static files, api routes, and Next.js internals
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/_vercel') ||
        pathname.includes('.')  // Static files
    ) {
        return NextResponse.next();
    }

    // Get the locale from the path or default to 'en'
    const pathnameLocale = routing.locales.find(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    // Check if this is a sub-route (not the index)
    // Examples of valid paths: /en, /es, /
    // Examples of invalid paths: /en/about, /es/contact, /about
    const isIndexRoute =
        pathname === '/' ||
        pathname === `/${pathnameLocale}` ||
        routing.locales.some(locale => pathname === `/${locale}`);

    // Redirect non-index routes to the index page
    if (!isIndexRoute) {
        const locale = pathnameLocale || routing.defaultLocale;
        const redirectUrl = new URL(`/${locale}`, request.url);
        return NextResponse.redirect(redirectUrl);
    }

    // Run the i18n middleware for valid routes
    return intlMiddleware(request);
}

export const config = {
    // Match all pathnames except static files
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/']
};
