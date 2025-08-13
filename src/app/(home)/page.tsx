import type { Metadata } from "next";
import Hero from "@/components/Hero";
import AdditionalInfo from "@/components/AdditionalInfo";
import Services from "@/components/Services";
import WhyMe from "@/components/WhyMe";
import Education from "@/components/Education";
import Articles from "@/components/Articles";
import SuccessStories from "@/components/SuccessStories";
import { generateMetadata as generateMeta, pageConfigs } from "@/lib/metadata";

export const metadata: Metadata = generateMeta(pageConfigs.home);

export default function Home() {
  return (
    <main>
      <Hero />
      <AdditionalInfo />
      <Services />
      <WhyMe />
      <Education />
      <Articles />
      <SuccessStories />
    </main>
  );
}
