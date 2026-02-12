import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_URL;
    const lastUpdated = new Date('2026-02-05'); // Update manually when content changes
    const routes = ['', '/about', '/skills', '/credentials', '/contact'];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: lastUpdated,
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));
}
