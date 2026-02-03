import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { HeroSection } from "../components/sections/HeroSection";
import { CredentialsSection } from "../components/sections/CredentialsSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { ProAboutSection } from "../components/sections/ProAboutSection";
import { PersonalAboutSection } from "../components/sections/PersonalAboutSection";
import { ContactSection } from "../components/sections/ContactSection";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.Home" });

  return {
    title: t("Title"),
    description: t("Description"),
  };
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <CredentialsSection summary={true} />
        <SkillsSection summary={true} />
        <TestimonialsSection summary={true} />
        <ProAboutSection summary={true} />
        <PersonalAboutSection summary={true} />
        <ContactSection summary={true} />
      </main>
      <Footer />
    </>
  );
}
