/**
 * Safely stringifies an object for embedding in HTML script tags.
 * It escapes <, >, and & using Unicode escape sequences to prevent XSS.
 */
export function safeJsonStringify(data: unknown): string {
  const json = JSON.stringify(data);
  if (json === undefined) {
    return "null";
  }
  return json.replace(/[<>&]/g, (char) => {
    const escape: Record<string, string> = {
      '<': '\\u003c',
      '>': '\\u003e',
      '&': '\\u0026',
    };
    return escape[char] || char;
  });
}
