import { CONTACT_FORM_COOLDOWN } from "./constants";

/**
 * In-memory store for rate limiting.
 * Key: IP address
 * Value: Last submission timestamp (ms)
 */
const rateLimitMap = new Map<string, number>();

/**
 * Checks if a given IP address is currently rate-limited.
 * @param ip The IP address to check
 * @returns boolean True if the IP is rate-limited, false otherwise
 */
export function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const lastSubmission = rateLimitMap.get(ip);

    if (lastSubmission && now - lastSubmission < CONTACT_FORM_COOLDOWN) {
        return true;
    }

    return false;
}

/**
 * Updates the last submission timestamp for a given IP address.
 * Also performs a basic cleanup of the map if it grows too large.
 * @param ip The IP address to update
 */
export function updateRateLimit(ip: string): void {
    const now = Date.now();
    rateLimitMap.set(ip, now);

    // Basic cleanup: if map exceeds 1000 entries, remove entries older than 24 hours
    if (rateLimitMap.size > 1000) {
        const oneDayAgo = now - 24 * 60 * 60 * 1000;
        for (const [key, value] of rateLimitMap.entries()) {
            if (value < oneDayAgo) {
                rateLimitMap.delete(key);
            }
        }
    }
}
