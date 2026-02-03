import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { SkillsPageContent } from "../../components/pages/SkillsPageContent";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata.Skills" });

    return {
        title: t("Title"),
        description: t("Description"),
    };
}

export default function SkillsPage() {
    return (
        <>
            <Navbar />
            <main id="main-content">
                <SkillsPageContent />
            </main>
            <Footer />
        </>
    );
}
