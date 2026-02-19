import { CONTACT_FORM_COOLDOWN } from "./constants.ts";

// In-memory store for rate limiting
// Note: In a serverless environment, this will only work within the same execution context.
// For a production-ready solution, use a persistent store like Redis (e.g., Upstash).
const rateLimitStore = new Map<string, number>();

/**
 * Checks if a given identifier (e.g., IP address) is rate limited.
 * @param identifier The unique identifier for the client (IP address).
 * @returns { isLimited: boolean; remaining: number }
 */
export function checkRateLimit(identifier: string): { isLimited: boolean; remaining: number } {
    const now = Date.now();
    const lastSubmission = rateLimitStore.get(identifier);

    if (lastSubmission) {
        const diff = now - lastSubmission;
        if (diff < CONTACT_FORM_COOLDOWN) {
            return {
                isLimited: true,
                remaining: Math.ceil((CONTACT_FORM_COOLDOWN - diff) / 1000),
            };
        }
    }

    return { isLimited: false, remaining: 0 };
}

/**
 * Records a submission for a given identifier to start the rate limit cooldown.
 * @param identifier The unique identifier for the client (IP address).
 */
export function setRateLimit(identifier: string): void {
    rateLimitStore.set(identifier, Date.now());

    // Cleanup: Remove old entries to prevent memory leaks
    // This is a very simple cleanup mechanism
    if (rateLimitStore.size > 1000) {
        const now = Date.now();
        for (const [key, timestamp] of rateLimitStore.entries()) {
            if (now - timestamp > CONTACT_FORM_COOLDOWN) {
                rateLimitStore.delete(key);
            }
        }
    }
}
