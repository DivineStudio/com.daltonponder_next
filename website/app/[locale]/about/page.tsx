import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { AboutPageContent } from "../../components/pages/AboutPageContent";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: "Metadata.About" });

    return {
        title: t("Title"),
        description: t("Description"),
    };
}

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main id="main-content">
                <AboutPageContent />
            </main>
            <Footer />
        </>
    );
}

