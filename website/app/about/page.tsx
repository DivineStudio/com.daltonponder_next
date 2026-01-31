import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ProAboutSection } from "../components/sections/ProAboutSection";
import { PersonalAboutSection } from "../components/sections/PersonalAboutSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";

export const metadata = {
    title: "About | Dalton Ponder",
    description:
        "Learn more about Dalton Ponder - Full-stack developer and cybersecurity expert with over a decade of experience.",
};

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main id="main-content" className="pt-20">
                <ProAboutSection summary={false} />
                <PersonalAboutSection summary={false} />
                <TestimonialsSection summary={false} />
            </main>
            <Footer />
        </>
    );
}
