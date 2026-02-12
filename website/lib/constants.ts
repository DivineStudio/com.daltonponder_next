/**
 * Centralized constants for the website.
 * This file serves as the single source of truth for various URLs and contact information.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://daltonponder.com";

export const GITHUB_URL = "https://github.com/DivineStudio";
export const LINKEDIN_URL = "https://www.linkedin.com/in/dalton-ponder-99a96a131";

export const EMAIL = "hello@daltonponder.com";

export const SOCIAL_LINKS = {
    github: GITHUB_URL,
    linkedin: LINKEDIN_URL,
} as const;
