import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
    it("should merge strings", () => {
        expect(cn("a", "b")).toBe("a b");
    });

    it("should handle conditional classes", () => {
        expect(cn("a", { b: true, c: false })).toBe("a b");
    });

    it("should handle array inputs", () => {
        expect(cn(["a", "b"], "c")).toBe("a b c");
    });

    it("should handle falsy values", () => {
        expect(cn("a", undefined, null, false, "b")).toBe("a b");
    });

    it("should merge tailwind classes", () => {
        expect(cn("px-2", "px-4")).toBe("px-4");
        expect(cn("p-4", "p-2", "p-8")).toBe("p-8");
        expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
    });

    it("should handle complex combinations", () => {
        expect(cn("base", ["array1", "array2"], { object1: true, object2: false }, "last")).toBe("base array1 array2 object1 last");
    });

    it("should return empty string for no inputs", () => {
        expect(cn()).toBe("");
    });
});
