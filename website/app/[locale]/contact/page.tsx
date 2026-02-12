import { SITE_URL } from "@/lib/constants";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { ContactPageContent } from "../../components/pages/ContactPageContent";
import { StructuredData } from "../../components/seo/StructuredData";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata.Contact" });

    return {
        title: t("Title"),
        description: t("Description"),
    };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata.Contact" });

    const contactPageSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": t("Title"),
        "description": t("Description"),
        "url": `${SITE_URL}/${locale === "en" ? "" : `${locale}/`}contact`
    };

    return (
        <>
            <StructuredData data={contactPageSchema} />
            <Navbar />
            <main id="main-content">
                <ContactPageContent />
            </main>
            <Footer />
        </>
    );
}
