/**
 * Safely stringifies an object for embedding in HTML script tags.
 * It ensures comprehensive protection against XSS by escaping <, >, &, \u2028, and \u2029.
 */
export function safeJsonStringify(data: unknown): string {
  try {
    const json = JSON.stringify(data);
    if (json === undefined) return "null";
    return json
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026")
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029");
  } catch {
    return "null";
  }
}
