import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - NMTSA",
  description:
    "Learn about Neurologic Music Therapy Services of Arizona's mission, history, and approach to transforming lives through music therapy since 1982.",
};

import Navbar from "@/components/Navbar";
import AboutPage from "@/components/AboutPage";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <main>
      <Navbar />
      <AboutPage />
      <Footer />
    </main>
  );
}
