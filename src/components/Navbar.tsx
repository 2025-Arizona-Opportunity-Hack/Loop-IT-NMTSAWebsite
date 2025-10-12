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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-navbar-scrolled" : "glass-navbar"
      }`}
    >
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link
              href="/"
              className="flex items-center rounded-lg transition-transform duration-300 hover:scale-105"
            >
              <Image
                src="/images/NMTSA Logo-2.png"
                alt="NMTSA"
                width={200}
                height={80}
                className="h-8 sm:h-10 lg:h-12 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-900 hover:text-nmtsa-600 font-medium transition-all duration-300 relative group px-3 py-2 rounded-lg hover:bg-white/20 text-sm xl:text-base"
              >
                {item.name}
                <span className="absolute -bottom-1 left-3 w-0 h-0.5 bg-nmtsa-500 transition-all duration-300 group-hover:w-6"></span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex flex-shrink-0">
            <Link href="/donate" className="btn-primary text-sm xl:text-base">
              Donate Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
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
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-white/30 shadow-xl">
          <div className="container-responsive py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-900 hover:text-nmtsa-600 font-medium py-3 px-4 rounded-lg hover:bg-white/50 transition-all duration-300 text-base"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200/50">
              <Link
                href="/donate"
                className="btn-primary w-full text-center block"
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
