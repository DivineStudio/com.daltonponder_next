import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { CredentialsPageContent } from "../../components/pages/CredentialsPageContent";
import { StructuredData } from "../../components/seo/StructuredData";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata.Credentials" });

    return {
        title: t("Title"),
        description: t("Description"),
    };
}

export default async function CredentialsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata.Credentials" });

    const credentialsPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": t("Title"),
        "description": t("Description"),
        "url": `https://daltonponder.com/${locale === "en" ? "" : `${locale}/`}credentials`
    };

    return (
        <>
            <StructuredData data={credentialsPageSchema} />
            <Navbar />
            <main id="main-content">
                <CredentialsPageContent />
            </main>
            <Footer />
        </>
    );
}
