import type { Metadata } from "next";
import Hero from "@/components/Hero";
import AdditionalInfo from "@/components/AdditionalInfo";
import Services from "@/components/Services";
import WhyMe from "@/components/WhyMe";
import Education from "@/components/Education";
import Articles from "@/components/Articles";
import SuccessStories from "@/components/SuccessStories";

export const metadata: Metadata = {
  title: "Ганин Вячеслав - Клинический психолог",
  description: "Магистр психологии, психоаналитик, педагог-психолог. Помощь при зависимости, созависимости, тревожности и других психологических проблемах.",
};

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
