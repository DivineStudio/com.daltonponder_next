import { InProgressSection } from "../components/sections/InProgressSection";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.Home" });

  return {
    title: "Dalton Ponder | Coming Soon",
    description: "Something amazing is being built. Stay tuned for my new portfolio experience.",
  };
}

export default function Home() {
  return (
    <main id="main-content">
      <InProgressSection />
    </main>
  );
}
