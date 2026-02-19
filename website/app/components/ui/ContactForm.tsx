"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { CONTACT_FORM_COOLDOWN } from "@/lib/constants";
import { submitContactForm } from "@/app/actions/contact";
import { ContactFormSchema } from "@/lib/validations";

// Contact subject keys for the dropdown
export const contactSubjectKeys = [
    "Freelance",
    "FullTime",
    "PartTime",
    "Startup",
    "Consultation",
    "Maintenance",
    "Speaking",
    "Collaboration",
    "Media",
    "Networking",
    "Other",
];

interface ContactFormProps {
    /** Whether to use hCaptcha for form submission */
    useCaptcha?: boolean;
    /** Custom class name for the form wrapper */
    className?: string;
}

export function ContactForm({ useCaptcha = true, className = "" }: ContactFormProps) {
    const t = useTranslations("Home.ContactSection");
    const tContact = useTranslations("Contact");

    // Form state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSucceeded, setIsSucceeded] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [isCooldownActive, setIsCooldownActive] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const captchaRef = useRef<HCaptcha>(null);
    const locale = useLocale();

    const checkCooldown = useCallback(() => {
        if (typeof window === "undefined") return;
        const lastSubmission = localStorage.getItem("contact_form_last_submission");
        if (lastSubmission) {
            const now = Date.now();
            const diff = now - parseInt(lastSubmission, 10);
            if (diff < CONTACT_FORM_COOLDOWN) {
                setIsCooldownActive(true);
                setRemainingTime(Math.ceil((CONTACT_FORM_COOLDOWN - diff) / 1000));
                return;
            }
        }
        setIsCooldownActive(false);
        setRemainingTime(0);
    }, []);

    // Check for cooldown on mount and every second
    useEffect(() => {
        const interval = setInterval(checkCooldown, 1000);
        // Initial check deferred to next tick to avoid synchronous setState in effect lint error
        const timeout = setTimeout(checkCooldown, 0);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [checkCooldown]);

    // Set cooldown in localStorage when form succeeds
    useEffect(() => {
        if (isSucceeded) {
            localStorage.setItem("contact_form_last_submission", Date.now().toString());
        }
    }, [isSucceeded]);

    const handleReset = () => {
        setIsSucceeded(false);
        setServerError(null);
        setFieldErrors({});
        setFormData({ name: "", email: "", subject: "", message: "" });
        if (useCaptcha) {
            captchaRef.current?.resetCaptcha();
            setCaptchaToken(null);
        }
        // Manual check when resetting the form
        checkCooldown();
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isCooldownActive || isSubmitting) return;

        setServerError(null);
        setFieldErrors({});

        // Client-side validation
        const result = ContactFormSchema.safeParse({
            ...formData,
            "h-captcha-response": captchaToken || undefined,
        });

        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;
            setFieldErrors(errors as Record<string, string[]>);
            return;
        }

        setIsSubmitting(true);

        try {
            const form = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                form.append(key, value);
            });
            if (captchaToken) {
                form.append("h-captcha-response", captchaToken);
            }

            const response = await submitContactForm(form);

            if (response.success) {
                setIsSucceeded(true);
            } else {
                setServerError(response.error || "An error occurred");
                if (response.type === "validation" && response.errors) {
                    setFieldErrors(response.errors);
                }
            }
        } catch (err) {
            setServerError("A network error occurred. Please try again.");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isSubmitDisabled = useCaptcha
        ? isSubmitting || !captchaToken || isCooldownActive
        : isSubmitting || isCooldownActive;

    if (isSucceeded) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bento-card text-center py-12"
            >
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Icon icon="tabler:check" width={32} height={32} className="text-green-500" />
                </div>
                <h3 className="font-mono text-xl font-semibold mb-2">{t("Form.SuccessHeader")}</h3>
                <p className="text-muted mb-6">{t("Form.SuccessMessage")}</p>
                <button
                    onClick={handleReset}
                    className="btn-secondary text-sm"
                >
                    Send Another Message
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleFormSubmit} className={`space-y-6 ${className}`}>
            {/* Name Field */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {tContact("Form.NameLabel")}
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-[var(--card-bg)] border ${
                        fieldErrors.name ? "border-red-500" : "border-[var(--card-border)]"
                    } focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all`}
                    placeholder={tContact("Form.NamePlaceholder")}
                />
                {fieldErrors.name && (
                    <p className="mt-1 text-sm text-red-500 font-mono">{fieldErrors.name[0]}</p>
                )}
            </div>

            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {tContact("Form.EmailLabel")}
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-[var(--card-bg)] border ${
                        fieldErrors.email ? "border-red-500" : "border-[var(--card-border)]"
                    } focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all`}
                    placeholder={tContact("Form.EmailPlaceholder")}
                />
                {fieldErrors.email && (
                    <p className="mt-1 text-sm text-red-500 font-mono">{fieldErrors.email[0]}</p>
                )}
            </div>

            {/* Subject Dropdown */}
            <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    {t("Form.Subject")}
                </label>
                <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-[var(--card-bg)] border ${
                        fieldErrors.subject ? "border-red-500" : "border-[var(--card-border)]"
                    } focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all cursor-pointer`}
                >
                    <option value="">{t("Form.SelectSubject")}</option>
                    {contactSubjectKeys.map((key) => (
                        <option key={key} value={t(`Form.Subjects.${key}`)}>
                            {t(`Form.Subjects.${key}`)}
                        </option>
                    ))}
                </select>
                {fieldErrors.subject && (
                    <p className="mt-1 text-sm text-red-500 font-mono">{fieldErrors.subject[0]}</p>
                )}
            </div>

            {/* Message Field */}
            <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {tContact("Form.MessageLabel")}
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-[var(--card-bg)] border ${
                        fieldErrors.message ? "border-red-500" : "border-[var(--card-border)]"
                    } focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all resize-none`}
                    placeholder={tContact("Form.MessagePlaceholder")}
                />
                {fieldErrors.message && (
                    <p className="mt-1 text-sm text-red-500 font-mono">{fieldErrors.message[0]}</p>
                )}
            </div>

            {/* hCaptcha (conditional) */}
            {useCaptcha && (
                <div className="min-h-[78px] flex justify-center my-4">
                    <HCaptcha
                        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ""}
                        onVerify={setCaptchaToken}
                        onExpire={() => setCaptchaToken(null)}
                        ref={captchaRef}
                        languageOverride={locale}
                        theme="dark"
                    />
                </div>
            )}

            {/* Global Error Message */}
            {serverError && (
                <div className="flex items-center gap-2 text-red-500 text-sm justify-center bg-red-500/10 py-2 px-4 rounded-lg border border-red-500/20 font-mono">
                    <Icon icon="tabler:alert-circle" width={18} height={18} />
                    <p>{serverError}</p>
                </div>
            )}

            {/* Rate Limit Message */}
            {isCooldownActive && !isSucceeded && (
                <div className="flex items-center gap-2 text-amber-500 text-sm justify-center bg-amber-500/10 py-2 px-4 rounded-lg border border-amber-500/20 font-mono">
                    <Icon icon="tabler:clock-bolt" width={18} height={18} />
                    <p>
                        {t("Form.RateLimitError")} ({remainingTime}s)
                    </p>
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitDisabled}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                {isSubmitting ? (
                    <>
                        <Icon icon="tabler:loader-2" width={20} height={20} className="animate-spin" />
                        {t("Form.Sending")}
                    </>
                ) : isCooldownActive && !isSucceeded ? (
                    <>
                        {t("Form.Send")}
                        <Icon icon="tabler:clock-pause" width={20} height={20} />
                    </>
                ) : (
                    <>
                        {t("Form.Send")}
                        <Icon icon="tabler:send" width={20} height={20} />
                    </>
                )}
            </button>
        </form>
    );
}
