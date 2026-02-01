import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ContactPageContent } from "../components/pages/ContactPageContent";

export const metadata = {
    title: "Contact | Dalton Ponder",
    description:
        "Get in touch with Dalton Ponder for freelance, full-time, or consulting opportunities.",
};

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
