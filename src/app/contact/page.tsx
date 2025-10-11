import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - NMTSA",
  description:
    "Get in touch with NMTSA. Located in Phoenix, Arizona. Call (602) 840-6410 or email info@nmtsa.org to learn more about our music therapy services.",
};

import Navbar from "@/components/Navbar";
import ContactPage from "@/components/ContactPage";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <main>
      <Navbar />
      <ContactPage />
      <Footer />
    </main>
  );
}
