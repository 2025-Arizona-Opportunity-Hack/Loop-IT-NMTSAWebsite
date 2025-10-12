import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate - Support NMTSA",
  description:
    "Support NMTSA's mission to transform lives through music therapy. Arizona residents can receive tax credits up to $841 for donations.",
};

import Link from "next/link";

export default function Donate() {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-gradient-to-br from-nmtsa-50 via-nmtsa-100 to-nmtsa-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold font-poppins text-gray-900 mb-6">
              Support Our <span className="gradient-text">Mission</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Your generous donation directly supports our music therapy
              programs and helps us reach more families in need.
            </p>
          </div>

          {/* Tax Credit Highlight */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 sm:p-12 text-white mb-12 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">$</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-poppins mb-4">
                Arizona Tax Credit Available!
              </h2>
              <p className="text-lg sm:text-xl text-green-100 mb-6 leading-relaxed">
                Arizona residents can claim up to{" "}
                <strong className="text-white">$841 in tax credits</strong> for
                donations to NMTSA. Your donation reduces your state tax
                liability dollar-for-dollar while transforming lives through
                music therapy.
              </p>
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3">How It Works:</h3>
                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold mb-2">1. Donate</div>
                    <div className="text-green-100">
                      Make your tax-deductible donation to NMTSA
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold mb-2">2. Receive Credit</div>
                    <div className="text-green-100">
                      Get dollar-for-dollar Arizona tax credit
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold mb-2">3. Transform Lives</div>
                    <div className="text-green-100">
                      Fund life-changing music therapy services
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Impact Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-nmtsa-600 font-poppins mb-2">
                $50
              </div>
              <p className="text-gray-600 mb-2">Funds one therapy session</p>
              <div className="text-green-600 text-sm font-medium">
                Tax Credit: $50
              </div>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-nmtsa-600 font-poppins mb-2">
                $200
              </div>
              <p className="text-gray-600 mb-2">Supports monthly programs</p>
              <div className="text-green-600 text-sm font-medium">
                Tax Credit: $200
              </div>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-nmtsa-600 font-poppins mb-2">
                $500
              </div>
              <p className="text-gray-600 mb-2">
                Sponsors a family&apos;s care
              </p>
              <div className="text-green-600 text-sm font-medium">
                Tax Credit: $500
              </div>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center border-2 border-nmtsa-300">
              <div className="text-3xl font-bold text-nmtsa-600 font-poppins mb-2">
                $841
              </div>
              <p className="text-gray-600 mb-2">Maximum tax credit</p>
              <div className="text-green-600 text-sm font-medium">
                Full Credit: $841
              </div>
            </div>
          </div>

          {/* Donation Options */}
          <div className="glass-card p-8 sm:p-12 rounded-3xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-poppins">
              Ready to Make an Impact?
            </h2>
            <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
              We&apos;re currently setting up secure donation processing. In the
              meantime, please contact us directly to learn about donation
              opportunities and claim your Arizona tax credit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link
                href="/contact"
                className="btn-primary text-white font-semibold px-8 py-4 rounded-full inline-flex items-center justify-center text-lg flex-1"
              >
                Contact Us to Donate
              </Link>
              <Link
                href="/programs"
                className="btn-secondary text-nmtsa-600 font-semibold px-8 py-4 rounded-full inline-flex items-center justify-center text-lg flex-1"
              >
                Learn About Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
