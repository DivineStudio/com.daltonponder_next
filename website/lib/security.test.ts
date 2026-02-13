import assert from "node:assert";
import { test } from "node:test";
import { safeJsonStringify } from "./security.ts";

test("safeJsonStringify escapes basic characters", () => {
  const data = {
    test: "<script>alert('xss')</script>",
    amp: "this & that",
  };
  const result = safeJsonStringify(data);
  assert.strictEqual(result.includes("<"), false);
  assert.strictEqual(result.includes(">"), false);
  assert.strictEqual(result.includes("&"), false);
  assert.strictEqual(result.includes("\\u003c"), true);
  assert.strictEqual(result.includes("\\u003e"), true);
  assert.strictEqual(result.includes("\\u0026"), true);
});

test("safeJsonStringify handles null-ish values", () => {
  assert.strictEqual(safeJsonStringify(null), "null");
  assert.strictEqual(safeJsonStringify(undefined), "null");
  assert.strictEqual(safeJsonStringify(() => {}), "null");
});

test("safeJsonStringify vulnerability with line separators", () => {
  // \u2028 and \u2029 can be problematic in script tags in some contexts
  const data = {
    lineSep: "\u2028",
    paraSep: "\u2029",
  };
  const result = safeJsonStringify(data);
  // Current implementation does NOT escape these, but a secure one should
  assert.strictEqual(result.includes("\u2028"), false, "Should not contain raw line separator");
  assert.strictEqual(result.includes("\u2029"), false, "Should not contain raw paragraph separator");
  assert.strictEqual(result.includes("\\u2028"), true, "Should contain escaped line separator");
  assert.strictEqual(result.includes("\\u2029"), true, "Should contain escaped paragraph separator");
});
