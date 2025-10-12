"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Music, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Get Involved", href: "/contact" },
    { name: "Donate", href: "/donate" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "mx-2 sm:mx-4 md:mx-6 mt-2 sm:mt-3 md:mt-4 rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/30 shadow-2xl shadow-black/20 backdrop-saturate-200"
          : "bg-white/5 backdrop-blur-2xl border-b border-white/20 shadow-lg backdrop-saturate-200"
      }`}
      style={{
        backdropFilter: "blur(40px) saturate(200%)",
        WebkitBackdropFilter: "blur(40px) saturate(200%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 sm:h-22 md:h-24">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/NMTSA Logo-2.png"
                alt="NMTSA Logo"
                width={200}
                height={80}
                className="h-12 sm:h-14 md:h-16 w-auto object-contain transform hover:scale-105 transition-transform duration-300"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item, index) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="text-gray-900 hover:text-nmtsa-600 font-medium text-xl transition-all duration-300 relative group px-2 lg:px-3 py-2 rounded-lg hover:bg-white/30 backdrop-blur-sm"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-2 lg:left-3 w-0 h-0.5 bg-nmtsa-500 transition-all duration-300 group-hover:w-6"></span>
                </Link>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Link
              href="/donate"
              className="bg-gradient-to-r from-nmtsa-500 to-nmtsa-600 hover:from-nmtsa-600 hover:to-nmtsa-700 text-white font-semibold px-4 lg:px-6 py-2.5 rounded-full inline-flex items-center text-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 sm:p-3 rounded-lg hover:bg-white/30 backdrop-blur-sm transition-all duration-300"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <X className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden bg-white/10 backdrop-blur-2xl border-t border-white/30 shadow-xl backdrop-saturate-200 mx-2 sm:mx-4 rounded-b-2xl sm:rounded-b-3xl"
          style={{
            backdropFilter: "blur(40px) saturate(200%)",
            WebkitBackdropFilter: "blur(40px) saturate(200%)",
          }}
        >
          <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-6">
            {navItems.map((item, index) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block text-gray-900 hover:text-nmtsa-600 font-semibold text-xl py-3 px-4 rounded-lg hover:bg-white/30 backdrop-blur-sm transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            ))}
            <div className="pt-4 sm:pt-6 border-t border-gray-200/50">
              <Link
                href="/donate"
                className="bg-gradient-to-r from-nmtsa-500 to-nmtsa-600 hover:from-nmtsa-600 hover:to-nmtsa-700 text-white font-semibold text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-full w-full text-center inline-block transition-all duration-300 shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
