"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Music,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Youtube,
  Send,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Contact", href: "/contact" },
    { name: "Donate", href: "/donate" },
  ];

  const programLinks = [
    { name: "Individual Therapy", href: "/programs#individual" },
    { name: "Group Therapy", href: "/programs#group" },
    { name: "Educational Services", href: "/programs#educational" },
    { name: "Community Outreach", href: "/programs#outreach" },
  ];

  const additionalLinks = [
    { name: "Blog", href: "/blog" },
    { name: "Resources", href: "#" },
    { name: "Research", href: "#" },
    { name: "Training", href: "#" },
  ];

  return (
    <footer
      className="bg-gray-900 text-white"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Newsletter Section */}
        <section
          className="bg-gradient-to-r from-nmtsa-600 to-nmtsa-700 rounded-2xl p-6 sm:p-8 mb-12"
          aria-labelledby="newsletter-heading"
        >
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h3
                id="newsletter-heading"
                className="text-xl sm:text-2xl font-bold mb-2 font-poppins"
                style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)" }}
              >
                Stay Connected
              </h3>
              <p
                className="text-nmtsa-100 leading-relaxed"
                style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
              >
                Get updates on our programs, success stories, and music therapy
                resources delivered to your inbox.
              </p>
            </div>
            <form
              className="flex flex-col sm:flex-row gap-4"
              aria-label="Newsletter subscription"
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email address for newsletter
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                required
                aria-required="true"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 
                         focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50
                         touch-target transition-all duration-250"
                style={{ minHeight: "44px" }}
              />
              <button
                type="submit"
                className="bg-white text-nmtsa-600 font-semibold px-6 py-3 rounded-full 
                         hover:bg-nmtsa-50 focus:bg-nmtsa-50 
                         focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50
                         transition-all duration-250 inline-flex items-center justify-center
                         touch-target-large"
                style={{ minHeight: "44px", minWidth: "120px" }}
                aria-describedby="newsletter-description"
              >
                <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                Subscribe
              </button>
            </form>
            <div id="newsletter-description" className="sr-only">
              Subscribe to receive updates about NMTSA programs and resources
            </div>
          </div>
        </section>

        {/* Main Footer Content */}
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 mb-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center mb-4">
              <Link
                href="/"
                className="focus:outline-none focus:ring-4 focus:ring-nmtsa-400 focus:ring-opacity-50 rounded"
                aria-label="Return to NMTSA homepage"
              >
                <Image
                  src="/images/NMTSA Logo-2.png"
                  alt="NMTSA - Neurologic Music Therapy Services of Arizona"
                  width={140}
                  height={60}
                  className="h-8 w-auto object-contain transition-transform duration-250 hover:scale-105"
                  style={{ height: "clamp(32px, 4vw, 40px)" }}
                />
              </Link>
            </div>
            <p
              className="text-gray-400 mb-6 leading-relaxed"
              style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
            >
              Unleashing unique potential through neurologic music therapy since
              1982.
            </p>
            <div
              className="flex space-x-4"
              role="list"
              aria-label="Social media links"
            >
              <a
                href="#"
                className="touch-target bg-nmtsa-500 rounded-full flex items-center justify-center 
                         hover:bg-nmtsa-600 focus:bg-nmtsa-600 
                         focus:outline-none focus:ring-4 focus:ring-nmtsa-400 focus:ring-opacity-50
                         transition-all duration-250"
                style={{ width: "44px", height: "44px" }}
                aria-label="Follow NMTSA on Facebook"
                role="listitem"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="#"
                className="touch-target bg-nmtsa-500 rounded-full flex items-center justify-center 
                         hover:bg-nmtsa-600 focus:bg-nmtsa-600 
                         focus:outline-none focus:ring-4 focus:ring-nmtsa-400 focus:ring-opacity-50
                         transition-all duration-250"
                style={{ width: "44px", height: "44px" }}
                aria-label="Watch NMTSA videos on YouTube"
                role="listitem"
              >
                <Youtube className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="xs:col-span-1" aria-labelledby="quick-links-heading">
            <h3
              id="quick-links-heading"
              className="font-semibold mb-4 font-poppins"
              style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2" role="list">
              {quickLinks.map((link) => (
                <li key={link.name} role="listitem">
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white focus:text-white
                             focus:outline-none focus:underline 
                             transition-all duration-250 inline-block py-1
                             touch-target-text"
                    style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Programs */}
          <nav className="xs:col-span-1" aria-labelledby="programs-heading">
            <h3
              id="programs-heading"
              className="font-semibold mb-4 font-poppins"
              style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
            >
              Programs
            </h3>
            <ul className="space-y-2" role="list">
              {programLinks.map((link) => (
                <li key={link.name} role="listitem">
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white focus:text-white
                             focus:outline-none focus:underline 
                             transition-all duration-250 inline-block py-1
                             touch-target-text"
                    style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav className="xs:col-span-1" aria-labelledby="resources-heading">
            <h3
              id="resources-heading"
              className="font-semibold mb-4 font-poppins"
              style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
            >
              Resources
            </h3>
            <ul className="space-y-2" role="list">
              {additionalLinks.map((link) => (
                <li key={link.name} role="listitem">
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white focus:text-white
                             focus:outline-none focus:underline 
                             transition-all duration-250 inline-block py-1
                             touch-target-text"
                    style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Contact Info & Legal */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          {/* Contact Information */}
          <section
            className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
            aria-labelledby="contact-info-heading"
          >
            <h2 id="contact-info-heading" className="sr-only">
              Contact Information
            </h2>

            <div className="flex items-center space-x-3 touch-target-text">
              <MapPin
                className="w-5 h-5 text-nmtsa-400 flex-shrink-0"
                aria-hidden="true"
              />
              <span
                className="text-gray-400"
                style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
              >
                Phoenix, Arizona
              </span>
            </div>

            <div className="flex items-center space-x-3 touch-target-text">
              <Phone
                className="w-5 h-5 text-nmtsa-400 flex-shrink-0"
                aria-hidden="true"
              />
              <a
                href="tel:+16027176400"
                className="text-gray-400 hover:text-white focus:text-white
                         focus:outline-none focus:underline transition-all duration-250"
                style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
                aria-label="Call NMTSA at 6 0 2 7 1 7 6 4 0 0"
              >
                (602) 717-6400
              </a>
            </div>

            <div className="flex items-center space-x-3 touch-target-text">
              <Mail
                className="w-5 h-5 text-nmtsa-400 flex-shrink-0"
                aria-hidden="true"
              />
              <a
                href="mailto:info@nmtsa.org"
                className="text-gray-400 hover:text-white focus:text-white
                         focus:outline-none focus:underline transition-all duration-250"
                style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}
                aria-label="Email NMTSA at info@nmtsa.org"
              >
                info@nmtsa.org
              </a>
            </div>
          </section>

          {/* Legal Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-6 border-t border-gray-800 gap-4">
            <p
              className="text-gray-400 order-2 sm:order-1"
              style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
            >
              © 2025 Neurologic Music Therapy Services of Arizona. All rights
              reserved.
            </p>
            <nav
              className="flex flex-col xs:flex-row gap-4 xs:gap-6 order-1 sm:order-2"
              aria-label="Legal pages"
            >
              <Link
                href="#"
                className="text-gray-400 hover:text-white focus:text-white
                         focus:outline-none focus:underline 
                         transition-all duration-250 touch-target-text"
                style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white focus:text-white
                         focus:outline-none focus:underline 
                         transition-all duration-250 touch-target-text"
                style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
              >
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
