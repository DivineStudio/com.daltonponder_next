"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { CONTACT_FORM_COOLDOWN } from "@/lib/constants";
import { submitContactForm } from "@/app/actions/contact";

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

/**
 * Custom validation error component to replace @formspree/react ValidationError.
 * It works with the raw error array returned by our Server Action.
 */
function LocalValidationError({ prefix, field, errors }: { prefix: string; field: string; errors: any[] }) {
    const error = errors.find((e) => e.field === field || (e.code === "EMPTY" && e.field === undefined && field === "message"));
    // Note: Formspree sometimes doesn't provide a field for general errors, but here we only care about field-specific ones.
    if (!error) return null;

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-red-500 text-xs mt-1"
        >
            {prefix} {error.message}
        </motion.div>
    );
}

export function ContactForm({ useCaptcha = true, className = "" }: ContactFormProps) {
    const t = useTranslations("Home.ContactSection");
    const tContact = useTranslations("Contact");

    // Custom state management to replace @formspree/react useForm
    const [state, setState] = useState({
        submitting: false,
        succeeded: false,
        errors: [] as any[],
    });

    const reset = useCallback(() => {
        setState({ submitting: false, succeeded: false, errors: [] });
    }, []);

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
        if (state.succeeded) {
            localStorage.setItem("contact_form_last_submission", Date.now().toString());
        }
    }, [state.succeeded]);

    const handleReset = () => {
        reset();
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
        if (isCooldownActive) return;

        setState((prev) => ({ ...prev, submitting: true, errors: [] }));

        const form = e.currentTarget;
        const data = {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            ...(useCaptcha && captchaToken ? { "h-captcha-response": captchaToken } : {}),
        };

        const result = await submitContactForm(data);

        if (result.success) {
            setState({ submitting: false, succeeded: true, errors: [] });
        } else {
            setState({
                submitting: false,
                succeeded: false,
                errors: result.errors || [],
            });

            if (result.error === "rate-limit") {
                setIsCooldownActive(true);
                // Sync localStorage to maintain UI cooldown if it was bypassed/cleared
                localStorage.setItem("contact_form_last_submission", Date.now().toString());
            }
        }
    };

    const isSubmitDisabled = useCaptcha
        ? state.submitting || !captchaToken || isCooldownActive
        : state.submitting || isCooldownActive;

    if (state.succeeded) {
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
                    className="w-full px-4 py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
                    placeholder={tContact("Form.NamePlaceholder")}
                />
                <LocalValidationError prefix="Name" field="name" errors={state.errors} />
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
                    className="w-full px-4 py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
                    placeholder={tContact("Form.EmailPlaceholder")}
                />
                <LocalValidationError prefix="Email" field="email" errors={state.errors} />
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
                    className="w-full px-4 py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all cursor-pointer"
                >
                    <option value="">{t("Form.SelectSubject")}</option>
                    {contactSubjectKeys.map((key) => (
                        <option key={key} value={t(`Form.Subjects.${key}`)}>
                            {t(`Form.Subjects.${key}`)}
                        </option>
                    ))}
                </select>
                <LocalValidationError prefix="Subject" field="subject" errors={state.errors} />
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
                    className="w-full px-4 py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all resize-none"
                    placeholder={tContact("Form.MessagePlaceholder")}
                />
                <LocalValidationError prefix="Message" field="message" errors={state.errors} />
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

            {/* Rate Limit Message */}
            {isCooldownActive && !state.succeeded && (
                <div className="flex items-center gap-2 text-amber-500 text-sm justify-center bg-amber-500/10 py-2 px-4 rounded-lg border border-amber-500/20">
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
                {state.submitting ? (
                    <>
                        <Icon icon="tabler:loader-2" width={20} height={20} className="animate-spin" />
                        {t("Form.Sending")}
                    </>
                ) : isCooldownActive && !state.succeeded ? (
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
