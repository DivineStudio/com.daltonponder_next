import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { CredentialsSection } from "../components/sections/CredentialsSection";

export const metadata = {
    title: "Credentials | Dalton Ponder",
    description:
        "View Dalton Ponder's credentials - Education, certifications, and years of experience in software development and cybersecurity.",
};

export default function CredentialsPage() {
    return (
        <>
            <Navbar />
            <main id="main-content" className="pt-20">
                <CredentialsSection summary={false} />
            </main>
            <Footer />
        </>
    );
}
