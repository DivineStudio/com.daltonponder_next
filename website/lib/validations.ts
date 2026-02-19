import { z } from "zod";

export const ContactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(1, "Please select a subject"),
    message: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message must be less than 5000 characters"),
    "h-captcha-response": z.string().optional(),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
