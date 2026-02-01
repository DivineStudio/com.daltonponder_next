import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { AboutPageContent } from "../components/pages/AboutPageContent";

export const metadata = {
    title: "About | Dalton Ponder",
    description:
        "Learn more about Dalton Ponder - Full-stack developer and cybersecurity expert with over a decade of experience.",
};

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

