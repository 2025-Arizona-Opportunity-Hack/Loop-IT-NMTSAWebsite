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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="bg-gradient-to-r from-nmtsa-600 to-nmtsa-700 rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2 font-poppins">
                Stay Connected
              </h3>
              <p className="text-nmtsa-100">
                Get updates on our programs, success stories, and music therapy
                resources delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-nmtsa-600 font-semibold px-6 py-3 rounded-full hover:bg-nmtsa-50 transition-colors inline-flex items-center justify-center">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Link href="/">
                <Image
                  src="/images/NMTSA Logo-2.png"
                  alt="NMTSA Logo"
                  width={140}
                  height={60}
                  className="h-8 w-auto object-contain"
                />
              </Link>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Unleashing unique potential through neurologic music therapy since
              1982.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-nmtsa-500 rounded-full flex items-center justify-center hover:bg-nmtsa-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-nmtsa-500 rounded-full flex items-center justify-center hover:bg-nmtsa-600 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 font-poppins">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 font-poppins">
              Programs
            </h3>
            <ul className="space-y-2">
              {programLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 font-poppins">
              Resources
            </h3>
            <ul className="space-y-2">
              {additionalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-nmtsa-400" />
              <span className="text-gray-400">Phoenix, Arizona</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-nmtsa-400" />
              <span className="text-gray-400">(602) 717-6400</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-nmtsa-400" />
              <span className="text-gray-400">info@nmtsa.org</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
              © 2024 Neurologic Music Therapy Services of Arizona. All rights
              reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
