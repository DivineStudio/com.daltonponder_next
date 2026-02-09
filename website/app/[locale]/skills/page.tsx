import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { SkillsPageContent } from "../../components/pages/SkillsPageContent";
import { StructuredData } from "../../components/seo/StructuredData";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata.Skills" });

    return {
        title: t("Title"),
        description: t("Description"),
    };
}

export default async function SkillsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata.Skills" });

    const skillsPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": t("Title"),
        "description": t("Description"),
        "url": `https://daltonponder.com/${locale === "en" ? "" : `${locale}/`}skills`
    };

    return (
        <>
            <StructuredData data={skillsPageSchema} />
            <Navbar />
            <main id="main-content">
                <SkillsPageContent />
            </main>
            <Footer />
        </>
    );
}
