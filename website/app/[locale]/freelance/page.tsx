import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { FreelancePageContent } from "../../components/pages/FreelancePageContent";
import { StructuredData } from "../../components/seo/StructuredData";
import { SITE_URL } from "@/lib/constants";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata.Freelance" });

    return {
        title: t("Title"),
        description: t("Description"),
    };
}

export default async function FreelancePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata.Freelance" });

    const freelancePageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": t("Title"),
        "description": t("Description"),
        "url": `${SITE_URL}/${locale === "en" ? "" : `${locale}/`}freelance`
    };

    return (
        <>
            <StructuredData data={freelancePageSchema} />
            <Navbar />
            <main id="main-content">
                <FreelancePageContent />
            </main>
            <Footer />
        </>
    );
}
