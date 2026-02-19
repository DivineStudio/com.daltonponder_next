"use server";

import { headers } from "next/headers";
import { isRateLimited, updateRateLimit } from "@/lib/rate-limit";

export interface ContactFormResponse {
    success: boolean;
    error?: "rate-limit" | "server-error";
    errors?: { field?: string; message: string; code?: string }[];
}

/**
 * Server action to handle contact form submission with server-side rate limiting.
 * @param data The form data to submit
 * @returns ContactFormResponse indicating success or error details
 */
export async function submitContactForm(data: Record<string, any>): Promise<ContactFormResponse> {
    try {
        const headerList = await headers();
        // Get the client's IP address from headers
        const ip = headerList.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

        // Check for server-side rate limiting
        if (isRateLimited(ip)) {
            return { success: false, error: "rate-limit" };
        }

        const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
        if (!formId) {
            console.error("FORMSPREE_ID is not configured");
            return { success: false, error: "server-error" };
        }

        // Forward the submission to Formspree
        const response = await fetch(`https://formspree.io/f/${formId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            // Update rate limit on successful submission
            updateRateLimit(ip);
            return { success: true };
        } else {
            // Return validation errors from Formspree
            return {
                success: false,
                errors: result.errors || [{ message: "Submission failed" }],
            };
        }
    } catch (error) {
        console.error("Contact form submission error:", error);
        return { success: false, error: "server-error" };
    }
}
