import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate - Support NMTSA",
  description:
    "Support NMTSA's mission to transform lives through music therapy. Arizona residents can receive tax credits up to $841 for donations.",
};

import Link from "next/link";
import {
  Heart,
  Building2,
  Users,
  Gift,
  DollarSign,
  CheckCircle,
  Mail,
  Phone,
  Download,
  ExternalLink,
  Award,
  Calendar,
  CreditCard,
  User,
  UserCheck,
  ShoppingBag,
  Shirt,
  Coffee,
  Star,
} from "lucide-react";

export default function Donate() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-nmtsa-600 via-nmtsa-650 to-nmtsa-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

        <div className="container-responsive relative text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-bold font-poppins mb-6 text-4xl sm:text-5xl lg:text-6xl">
            💖 Support <span className="text-nmtsa-200">NMTSA</span>
          </h1>
          <p className="text-nmtsa-100 max-w-4xl mx-auto text-lg sm:text-xl leading-relaxed mb-8">
            Your generosity helps children and adults with neurological
            differences gain independence, confidence, and joy through
            Neurologic Music Therapy. Explore the ways you can support NMTSA
            below.
          </p>
        </div>
      </section>

      {/* Merchandise Marketplace */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
              🛍️ Merchandise Marketplace
            </span>
            <h2 className="font-bold font-poppins text-gray-900 mb-6 text-3xl sm:text-4xl lg:text-5xl">
              Shop for a <span className="gradient-text">Cause</span>
            </h2>
            <p className="text-gray-600 max-w-4xl mx-auto text-lg sm:text-xl leading-relaxed">
              Support NMTSA by purchasing branded merchandise! Every purchase
              helps fund our music therapy programs while spreading awareness of
              our mission in the community.
            </p>
          </div>

          {/* Featured Products */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="glass-card p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-105">
                <Shirt className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-xl">
                Apparel & Accessories
              </h3>
              <p className="text-gray-600 mb-4">
                T-shirts, hoodies, tote bags, and more featuring the NMTSA logo
                and inspiring messages.
              </p>
              <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>Quality materials • Comfortable fit</span>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-105">
                <Coffee className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-xl">
                Drinkware & Home
              </h3>
              <p className="text-gray-600 mb-4">
                Mugs, water bottles, and home decor items to show your support
                for music therapy.
              </p>
              <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>Dishwasher safe • Durable design</span>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-105">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-xl">
                Gift Items
              </h3>
              <p className="text-gray-600 mb-4">
                Perfect gifts for music therapy supporters, including branded
                stationery and collectibles.
              </p>
              <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>Thoughtful gifts • Support included</span>
              </div>
            </div>
          </div>

          {/* Benefits & Impact */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-6 text-xl">
                Why Shop Our Merchandise?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Every purchase directly supports music therapy programs
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    High-quality products with meaningful designs
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Spread awareness about neurologic music therapy
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Perfect gifts for friends, family, and music lovers
                  </span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">
                Shopping Made Easy
              </h3>
              <p className="text-gray-600 mb-6">
                Browse our full collection online with secure checkout, fast
                shipping, and excellent customer service. Your purchase makes a
                difference!
              </p>

              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">
                    🚚 Free shipping on orders over $50
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="font-medium text-gray-700">
                    🔄 Easy returns within 30 days
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="font-medium text-gray-700">
                    💝 Gift wrapping available
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 sm:p-12 text-white">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold font-poppins mb-4">
                Ready to Shop & Support?
              </h3>
              <p className="text-indigo-100 mb-8 text-lg leading-relaxed">
                Visit our online merchandise store to browse the full
                collection. Every purchase helps us continue providing
                life-changing music therapy services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Link
                  href="/marketplace"
                  className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full inline-flex items-center justify-center hover:bg-indigo-50 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Shop Merchandise
                </Link>
                <Link
                  href="/contact?form=custom-order"
                  className="border-2 border-white text-white font-semibold px-6 py-3 rounded-full inline-flex items-center justify-center hover:bg-white hover:text-indigo-600 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Custom Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Sponsorships */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              🏢 Corporate Sponsorships
            </span>
            <h2 className="font-bold font-poppins text-gray-900 mb-6 text-3xl sm:text-4xl lg:text-5xl">
              🌟 Partner with NMTSA to Create{" "}
              <span className="gradient-text">Real, Lasting Change</span>
            </h2>
            <p className="text-gray-600 max-w-4xl mx-auto text-lg sm:text-xl leading-relaxed">
              Corporate sponsors help fund innovative therapy programs,
              community education, and scholarships — improving the lives of
              individuals with neurologic impairments across Arizona.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-6 text-xl">
                Sponsorship Opportunities:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Sponsor new or specialized clinical programs
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Fund educational or therapy scholarships
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Support NMTSA fundraising events
                  </span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-6 text-xl">
                Sponsorship Benefits:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Award className="w-5 h-5 text-nmtsa-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Recognition on NMTSA&apos;s website & social media
                  </span>
                </li>
                <li className="flex items-start">
                  <Award className="w-5 h-5 text-nmtsa-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Logo displayed in NMTSA&apos;s clinic waiting room
                  </span>
                </li>
                <li className="flex items-start">
                  <Award className="w-5 h-5 text-nmtsa-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Recognition at NMTSA events
                  </span>
                </li>
                <li className="flex items-start">
                  <Award className="w-5 h-5 text-nmtsa-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Exposure to 1,000+ social followers & newsletter readers
                  </span>
                </li>
                <li className="flex items-start">
                  <Award className="w-5 h-5 text-nmtsa-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Public alignment with a mission-driven nonprofit
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-2xl">
            <p className="text-gray-600 mb-6 flex items-center justify-center">
              <Mail className="w-5 h-5 mr-2" />
              📧 To learn more or customize a sponsorship package, contact{" "}
              <strong>info@nmtsa.org</strong>
            </p>
            <Link
              href="/contact?form=corporate-sponsor"
              className="btn-primary inline-flex items-center"
            >
              <Building2 className="w-5 h-5 mr-2" />
              Become a Corporate Sponsor
            </Link>
          </div>
        </div>
      </section>

      {/* Friends of NMTSA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-nmtsa-50 to-nmtsa-100">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              🤝 Friends of NMTSA (Monthly Giving Program)
            </span>
            <h2 className="font-bold font-poppins text-gray-900 mb-6 text-3xl sm:text-4xl lg:text-5xl">
              💫 Join Our Community of{" "}
              <span className="gradient-text">Ongoing Supporters</span>
            </h2>
            <p className="text-gray-600 max-w-4xl mx-auto text-lg sm:text-xl leading-relaxed">
              By becoming a Friend of NMTSA, your monthly contribution provides
              consistent funding for therapy sessions, outreach programs, and
              community workshops.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-6 text-xl">
                How to Join:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <DollarSign className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Choose a monthly amount (e.g., $25, $50, $100, or custom)
                  </span>
                </li>
                <li className="flex items-start">
                  <CreditCard className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Enroll securely through PayPal or credit card
                  </span>
                </li>
                <li className="flex items-start">
                  <UserCheck className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Receive exclusive program updates & recognition
                  </span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
              <h3 className="font-bold text-gray-900 mb-4 text-xl">
                Prefer to give by check or cash?
              </h3>
              <p className="text-gray-600 mb-6 flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Call us at <strong>602-840-6410</strong> to set up your monthly
                contributions offline.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link
                href="/contact?form=monthly-giving"
                className="btn-primary inline-flex items-center"
              >
                <Heart className="w-5 h-5 mr-2" />
                Join Friends of NMTSA
              </Link>
              <Link href="#" className="btn-secondary inline-flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Download Brochure
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Arizona Tax Credit */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              🏛️ Arizona State Tax Credit Donations (QCO# 20446)
            </span>
            <h2 className="font-bold font-poppins text-gray-900 mb-6 text-3xl sm:text-4xl lg:text-5xl">
              💡 Receive a{" "}
              <span className="gradient-text">Dollar-for-Dollar Credit</span> on
              Your Arizona Taxes
            </h2>
            <p className="text-gray-600 max-w-4xl mx-auto text-lg sm:text-xl leading-relaxed">
              If you&apos;re an Arizona resident, you can support NMTSA at no
              cost to you through the Qualified Charitable Organization (QCO)
              Tax Credit.
            </p>
          </div>

          {/* QCO Info */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 sm:p-12 text-white mb-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold font-poppins mb-4">
              NMTSA QCO Code:{" "}
              <span className="bg-white/20 px-4 py-2 rounded-lg">20446</span>
            </h3>
          </div>

          {/* How It Works */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-6 text-xl">
                How It Works:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                    1
                  </span>
                  <span className="text-gray-600">
                    Donate up to $470 (individual) or $938 (married filing
                    jointly) by April 15, 2025.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                    2
                  </span>
                  <span className="text-gray-600">
                    Get a receipt — we&apos;ll send it once your gift is
                    processed.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                    3
                  </span>
                  <span className="text-gray-600">
                    Claim your credit on your Arizona tax return (Form 321).
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                    4
                  </span>
                  <span className="text-gray-600">
                    You&apos;ll receive a dollar-for-dollar credit on your
                    Arizona taxes and may also qualify for a federal deduction
                    if you itemize.
                  </span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-6 text-xl">
                Ways to Donate:
              </h3>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <ExternalLink className="w-5 h-5 text-nmtsa-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    💻 Donate securely online
                  </span>
                </li>
                <li className="flex items-start">
                  <Mail className="w-5 h-5 text-nmtsa-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    💵 Mail a check to NMTSA, 302 W. Bethany Home Rd., Phoenix,
                    AZ 85013
                  </span>
                </li>
              </ul>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Federal Tax Deduction:
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    • Itemized charitable gifts may qualify for federal
                    deduction limits.
                  </li>
                  <li>
                    • Universal deduction ended in 2021; itemization now
                    required.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-600">
              📝 <strong>Note:</strong> NMTSA is not a tax advisor. Please
              consult your tax professional for personalized advice.
            </p>
          </div>

          <div className="text-center mt-8">
            <a
              href="https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=J2RM9AGPDLDX6&ssrt=1760240758179"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center text-lg"
            >
              <Gift className="w-5 h-5 mr-2" />
              Donate Online
            </a>
          </div>
        </div>
      </section>

      {/* Other Ways to Help */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-nmtsa-50 to-nmtsa-100">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-bold font-poppins text-gray-900 mb-6 text-3xl sm:text-4xl lg:text-5xl">
              ❤️ Other Ways to <span className="gradient-text">Help</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Honor & Memory
              </h3>
              <p className="text-gray-600 text-sm">
                Donate in honor or memory of someone special
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Fundraising Events
              </h3>
              <p className="text-gray-600 text-sm">
                Organize a fundraising event for NMTSA
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Employer Matching
              </h3>
              <p className="text-gray-600 text-sm">
                Ask your employer about donation matching
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/contact?form=other-giving"
              className="btn-primary inline-flex items-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Us for Other Giving Options
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-nmtsa-600 to-nmtsa-700 text-white">
        <div className="container-responsive text-center">
          <h2 className="font-bold font-poppins mb-6 text-3xl sm:text-4xl lg:text-5xl">
            🧾 Every donation — no matter the size — helps{" "}
            <span className="text-nmtsa-200">transform lives</span> through
            music therapy.
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto mt-8">
            <a
              href="https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=J2RM9AGPDLDX6&ssrt=1760240758179"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-nmtsa-600 font-semibold px-6 py-3 rounded-full inline-flex items-center justify-center hover:bg-nmtsa-50 transition-colors"
            >
              <Heart className="w-5 h-5 mr-2" />
              Donate Now
            </a>
            <Link
              href="/contact?form=monthly-giving"
              className="border-2 border-white text-white font-semibold px-6 py-3 rounded-full inline-flex items-center justify-center hover:bg-white hover:text-nmtsa-600 transition-colors"
            >
              <Users className="w-5 h-5 mr-2" />
              Join Monthly Giving
            </Link>
            <Link
              href="/contact?form=tax-credit"
              className="border-2 border-white text-white font-semibold px-6 py-3 rounded-full inline-flex items-center justify-center hover:bg-white hover:text-nmtsa-600 transition-colors"
            >
              <Gift className="w-5 h-5 mr-2" />
              Learn About Tax Credits
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
