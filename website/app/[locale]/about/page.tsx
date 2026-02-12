import { SITE_URL } from "@/lib/constants";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { AboutPageContent } from "../../components/pages/AboutPageContent";
import { StructuredData } from "../../components/seo/StructuredData";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata.About" });

    return {
        title: t("Title"),
        description: t("Description"),
    };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata.About" });

    const aboutPageSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": t("Title"),
        "description": t("Description"),
        "url": `${SITE_URL}/${locale === "en" ? "" : `${locale}/`}about`
    };

    return (
        <>
            <StructuredData data={aboutPageSchema} />
            <Navbar />
            <main id="main-content">
                <AboutPageContent />
            </main>
            <Footer />
        </>
    );
}

