import assert from "node:assert";
import { test } from "node:test";
import { ContactFormSchema } from "./validations.ts";
import { checkRateLimit, setRateLimit } from "./rate-limit.ts";
import { CONTACT_FORM_COOLDOWN } from "./constants.ts";

test("ContactFormSchema validates correct data", () => {
    const validData = {
        name: "John Doe",
        email: "john@example.com",
        subject: "Freelance",
        message: "I would like to hire you for a project.",
    };
    const result = ContactFormSchema.safeParse(validData);
    assert.strictEqual(result.success, true);
});

test("ContactFormSchema rejects invalid email", () => {
    const invalidData = {
        name: "John Doe",
        email: "not-an-email",
        subject: "Freelance",
        message: "I would like to hire you for a project.",
    };
    const result = ContactFormSchema.safeParse(invalidData);
    assert.strictEqual(result.success, false);
    if (!result.success) {
        assert.ok(result.error.flatten().fieldErrors.email);
    }
});

test("ContactFormSchema rejects short message", () => {
    const invalidData = {
        name: "John Doe",
        email: "john@example.com",
        subject: "Freelance",
        message: "Too short",
    };
    const result = ContactFormSchema.safeParse(invalidData);
    assert.strictEqual(result.success, false);
    if (!result.success) {
        assert.ok(result.error.flatten().fieldErrors.message);
    }
});

test("Rate limiting works correctly", async () => {
    const ip = "127.0.0.1";

    // Initially not limited
    let status = checkRateLimit(ip);
    assert.strictEqual(status.isLimited, false);

    // Set limit
    setRateLimit(ip);

    // Now limited
    status = checkRateLimit(ip);
    assert.strictEqual(status.isLimited, true);
    assert.ok(status.remaining > 0);
    assert.ok(status.remaining <= CONTACT_FORM_COOLDOWN / 1000);
});
