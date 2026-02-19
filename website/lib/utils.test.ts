import assert from "node:assert";
import { test } from "node:test";
import { shuffle } from "./utils.ts";

test("shuffle should return a new array with the same elements", () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffle(original);

    assert.notStrictEqual(original, shuffled, "Should return a new array instance");
    assert.strictEqual(original.length, shuffled.length, "Should have the same length");

    // Check if all elements are present
    const sortedOriginal = [...original].sort();
    const sortedShuffled = [...shuffled].sort();
    assert.deepStrictEqual(sortedOriginal, sortedShuffled, "Should contain the same elements");
});

test("shuffle should randomize elements (statistically, for small sets, this might rarely fail, but 10 elements is usually safe)", () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let isDifferent = false;

    // Try a few times just in case we get the same order by chance (1 in 10! chance)
    for (let i = 0; i < 5; i++) {
        const shuffled = shuffle(original);
        if (JSON.stringify(original) !== JSON.stringify(shuffled)) {
            isDifferent = true;
            break;
        }
    }

    assert.strictEqual(isDifferent, true, "Shuffled array should be different from original eventually");
});

test("shuffle handles empty and single-element arrays", () => {
    assert.deepStrictEqual(shuffle([]), [], "Should handle empty array");
    assert.deepStrictEqual(shuffle([1]), [1], "Should handle single-element array");
});
