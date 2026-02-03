import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { CredentialsPageContent } from "../../components/pages/CredentialsPageContent";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: "Metadata.Credentials" });

    return {
        title: t("Title"),
        description: t("Description"),
    };
}

export default function CredentialsPage() {
    return (
        <>
            <Navbar />
            <main id="main-content">
                <CredentialsPageContent />
            </main>
            <Footer />
        </>
    );
}
