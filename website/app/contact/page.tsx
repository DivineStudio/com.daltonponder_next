import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ContactSection } from "../components/sections/ContactSection";

export const metadata = {
    title: "Contact | Dalton Ponder",
    description:
        "Get in touch with Dalton Ponder for freelance projects, employment opportunities, or technical consultations.",
};

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <main id="main-content" className="pt-20">
                <ContactSection summary={false} />
            </main>
            <Footer />
        </>
    );
}
