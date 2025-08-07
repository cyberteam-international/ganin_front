import type { Metadata } from "next";
import Hero from "@/components/Hero";
import AdditionalInfo from "@/components/AdditionalInfo";

export const metadata: Metadata = {
  title: "Ганин Вячеслав - Клинический психолог",
  description: "Магистр психологии, психоаналитик, педагог-психолог. Помощь при зависимости, созависимости, тревожности и других психологических проблемах.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <AdditionalInfo />
    </main>
  );
}
