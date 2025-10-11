"use client";

import Link from "next/link";
import { Music, MapPin, Phone, Mail, Facebook, Youtube } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Programs", href: "/programs" },
    { name: "Who We Serve", href: "/programs" },
    { name: "Volunteer", href: "/contact" },
  ];

  const supportLinks = [
    { name: "Donate", href: "/donate" },
    { name: "Tax Credit", href: "/donate" },
    { name: "Corporate Sponsorship", href: "/contact" },
    { name: "Fundraising Events", href: "/contact" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer className="bg-gray-900 text-white">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-nmtsa-500 to-nmtsa-600 rounded-full flex items-center justify-center mr-3">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="font-poppins font-bold text-xl">NMTSA</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Unleashing unique potential through neurologic music therapy since
              1982.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="w-10 h-10 bg-nmtsa-500 rounded-full flex items-center justify-center hover:bg-nmtsa-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-nmtsa-500 rounded-full flex items-center justify-center hover:bg-nmtsa-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Youtube className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-lg mb-4 font-poppins">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-lg mb-4 font-poppins">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-lg mb-4 font-poppins">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-nmtsa-500 mt-0.5 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <p>3221 N 16th Street, Suite 201</p>
                  <p>Phoenix, AZ 85016</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-nmtsa-500 flex-shrink-0" />
                <span className="text-gray-400 text-sm">(602) 840-6410</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-nmtsa-500 flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@nmtsa.org</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Border */}
        <motion.div
          className="border-t border-gray-800 pt-8 text-center text-gray-400"
          variants={itemVariants}
        >
          <p>
            &copy; 2025 Neurologic Music Therapy Services of Arizona. All rights
            reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
