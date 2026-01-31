import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SkillsSection } from "../components/sections/SkillsSection";

export const metadata = {
    title: "Skills | Dalton Ponder",
    description:
        "Explore the technologies and tools Dalton Ponder works with - from full-stack development to cloud architecture and cybersecurity.",
};

export default function SkillsPage() {
    return (
        <>
            <Navbar />
            <main id="main-content" className="pt-20">
                <SkillsSection summary={false} />
            </main>
            <Footer />
        </>
    );
}
