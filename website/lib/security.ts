import htmlescape from "htmlescape";

/**
 * Safely stringifies an object for embedding in HTML script tags.
 * It uses the htmlescape library to ensure comprehensive protection against XSS
 * by escaping <, >, &, \u2028, and \u2029.
 */
export function safeJsonStringify(data: unknown): string {
  try {
    return htmlescape(data) ?? "null";
  } catch {
    return "null";
  }
}
