import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate - Support NMTSA",
  description:
    "Support NMTSA's mission to transform lives through music therapy. Arizona residents can receive tax credits up to $841 for donations.",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Donate() {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen pt-20">
        <section className="py-20 bg-gradient-to-br from-nmtsa-50 via-nmtsa-100 to-nmtsa-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold font-poppins text-gray-900 mb-6">
              Support Our <span className="gradient-text">Mission</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Your generous donation directly supports our music therapy
              programs and helps us reach more families in need.
            </p>
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Donation Options Coming Soon
              </h2>
              <p className="text-gray-600 mb-6">
                We&apos;re currently setting up secure donation processing. In
                the meantime, please contact us directly to learn about donation
                opportunities.
              </p>
              <Link
                href="/contact"
                className="btn-primary text-white font-semibold px-8 py-4 rounded-full inline-flex items-center text-lg"
              >
                Contact Us to Donate
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
