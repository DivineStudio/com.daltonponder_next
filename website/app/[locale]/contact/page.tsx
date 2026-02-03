import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { ContactPageContent } from "../../components/pages/ContactPageContent";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata.Contact" });

    return {
        title: t("Title"),
        description: t("Description"),
    };
}

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <main id="main-content">
                <ContactPageContent />
            </main>
            <Footer />
        </>
    );
}
