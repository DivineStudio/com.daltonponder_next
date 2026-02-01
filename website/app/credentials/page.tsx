import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { CredentialsPageContent } from "../components/pages/CredentialsPageContent";

export const metadata = {
    title: "Credentials | Dalton Ponder",
    description:
        "View Dalton Ponder's professional credentials, work experience, education, and certifications.",
};

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
