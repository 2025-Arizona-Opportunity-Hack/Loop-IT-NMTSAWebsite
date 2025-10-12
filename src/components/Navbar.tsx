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

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest("nav")) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Get Involved", href: "/get-involved" },
    { name: "Donate", href: "/donate" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
      <nav
        className={`relative transition-all duration-500 rounded-full ${
          isScrolled ? "glass-navbar-scrolled" : "glass-navbar"
        }`}
      >
        {/* True 100% Glass Effect Overlay with ultra curved edges */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/2 to-transparent rounded-full"></div>
        <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-b from-white/5 to-white/8 rounded-full"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent rounded-full"></div>

        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo - with 25px margin from left using Tailwind */}
            <div className="flex items-center flex-shrink-0 ml-6">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/NMTSA Logo-2.png"
                  alt="NMTSA"
                  width={220}
                  height={88}
                  className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation - centered with better spacing */}
            <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8">
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-800 hover:text-nmtsa-600 font-medium transition-all duration-500 ease-out relative group px-4 py-3 rounded-2xl hover:bg-white/15 text-base whitespace-nowrap nav-hover-pop hover:shadow-md"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-nmtsa-500 transition-all duration-500 ease-out group-hover:w-8"></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side buttons - with 25px margin and 15px spacing using Tailwind */}
            <div className="hidden lg:flex items-center space-x-4 flex-shrink-0 mr-6">
              <Link
                href="/marketplace"
                className="btn-secondary text-base px-6 py-3 font-medium transition-all duration-500 ease-out hover:bg-white/15 nav-hover-pop hover:shadow-lg"
              >
                Shop
              </Link>
              <a
                href="https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=J2RM9AGPDLDX6&ssrt=1760240758179"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-6 py-3 font-medium transition-all duration-500 ease-out hover:bg-white/15 nav-hover-pop hover:shadow-lg"
              >
                Donate Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-3 rounded-2xl hover:bg-white/25 transition-all duration-500 ease-out nav-hover-pop hover:shadow-md"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-white/30 shadow-xl rounded-b-[2rem] mt-2">
            <div className="py-4 px-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-900 hover:text-nmtsa-600 font-medium py-3 px-4 rounded-2xl hover:bg-white/50 transition-all duration-500 ease-out text-base nav-hover-pop hover:shadow-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200/50 space-y-2">
                <Link
                  href="/marketplace"
                  className="btn-secondary w-full text-center block transition-all duration-500 ease-out nav-hover-pop hover:shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  Shop
                </Link>
                <a
                  href="https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=J2RM9AGPDLDX6&ssrt=1760240758179"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center block transition-all duration-500 ease-out nav-hover-pop hover:shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  Donate Now
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
