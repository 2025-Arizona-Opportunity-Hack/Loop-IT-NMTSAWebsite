import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Programs - NMTSA",
  description:
    "Discover NMTSA's comprehensive neurologic music therapy programs including individual therapy, group sessions, family support, and adapted music lessons.",
};

import Navbar from "@/components/Navbar";
import ProgramsPage from "@/components/ProgramsPage";
import Footer from "@/components/Footer";

export default function Programs() {
  return (
    <main>
      <Navbar />
      <ProgramsPage />
      <Footer />
    </main>
  );
}
