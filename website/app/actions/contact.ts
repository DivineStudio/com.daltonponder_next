"use server";

import { headers } from "next/headers";
import { ContactFormSchema } from "@/lib/validations";
import { checkRateLimit, setRateLimit } from "@/lib/rate-limit";

export async function submitContactForm(formData: FormData) {
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for") || "unknown";

    // 1. Rate Limiting
    const { isLimited, remaining } = checkRateLimit(ip);
    if (isLimited) {
        return {
            success: false,
            error: `Too many requests. Please try again in ${remaining}s.`,
            type: "rate-limit",
        };
    }

    // 2. Validation
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = ContactFormSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            error: "Invalid form data. Please check your inputs.",
            errors: validatedFields.error.flatten().fieldErrors,
            type: "validation",
        };
    }

    const data = validatedFields.data;

    // 3. hCaptcha verification (optional but recommended)
    // In a real app, you would verify the captcha token here
    // const captchaToken = data["h-captcha-response"];
    // ... verification logic ...

    // 4. Submit to Formspree
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (!formspreeId) {
        console.error("NEXT_PUBLIC_FORMSPREE_ID is not set");
        return {
            success: false,
            error: "Form service is currently unavailable.",
            type: "server",
        };
    }

    try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            setRateLimit(ip);
            return { success: true };
        } else {
            const result = await response.json();
            return {
                success: false,
                error: result.error || "Failed to send message.",
                type: "formspree",
            };
        }
    } catch (error) {
        console.error("Error submitting to Formspree:", error);
        return {
            success: false,
            error: "An unexpected error occurred. Please try again later.",
            type: "server",
        };
    }
}
