"use client";

import { useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { useForm, ValidationError } from "@formspree/react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

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

    // Formspree hook
    const [state, handleSubmit, reset] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID || "");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const captchaRef = useRef<HCaptcha>(null);
    const locale = useLocale();

    const handleReset = () => {
        reset();
        setFormData({ name: "", email: "", subject: "", message: "" });
        if (useCaptcha) {
            captchaRef.current?.resetCaptcha();
            setCaptchaToken(null);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const isSubmitDisabled = useCaptcha
        ? state.submitting || !captchaToken
        : state.submitting;

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
        <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
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
                <ValidationError prefix="Name" field="name" errors={state.errors} />
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
                <ValidationError prefix="Email" field="email" errors={state.errors} />
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
                <ValidationError prefix="Subject" field="subject" errors={state.errors} />
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
                <ValidationError prefix="Message" field="message" errors={state.errors} />
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
