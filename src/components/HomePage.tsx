"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PlayCircle, Heart, ArrowRight, ChevronDown } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";

const HomePage = () => {
  const stats = [
    { number: "40+", label: "Years Serving" },
    { number: "500+", label: "Families Helped" },
    { number: "15K+", label: "Sessions" },
  ];

  const scrollToSection = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <ParticlesBackground />

        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-nmtsa-50 via-nmtsa-100 to-nmtsa-200" />

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-nmtsa-600 shadow-lg">
              ✨ Transforming Lives Since 1982
            </span>
          </motion.div>

          <motion.h1
            className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Unleashing <span className="gradient-text">Unique Potential</span>
            <br />
            Through Music Therapy
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            NMTSA provides comprehensive music therapy services to individuals
            with neurologic impairments and their families in the greater
            Phoenix area, creating positive change through the power of music.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              href="/programs"
              className="btn-primary text-white font-semibold px-8 py-4 rounded-full inline-flex items-center text-lg shadow-lg"
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              Explore Our Programs
            </Link>
            <Link
              href="/about"
              className="btn-secondary text-nmtsa-600 font-semibold px-8 py-4 rounded-full inline-flex items-center text-lg"
            >
              <Heart className="w-5 h-5 mr-2" />
              Learn Our Story
            </Link>
          </motion.div>

          {/* Statistics */}
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-md mx-auto lg:max-w-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-nmtsa-600 font-poppins">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="flex flex-col items-center text-gray-600">
            <span className="text-sm mb-2">Learn More</span>
            <ChevronDown className="w-6 h-6 animate-bounce-slow" />
          </div>
        </motion.div>

        {/* Floating Statistics for Desktop */}
        <div className="hidden lg:block">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="absolute glass-card p-4 rounded-2xl"
              style={{
                top: `${20 + index * 15}%`,
                right: index % 2 === 0 ? "10%" : "auto",
                left: index % 2 === 1 ? "10%" : "auto",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-nmtsa-600 font-poppins">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-nmtsa-100 text-nmtsa-700 rounded-full text-sm font-semibold mb-6">
                About NMTSA
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
                Transforming Lives Through{" "}
                <span className="gradient-text">Music</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Since 1982, Neurologic Music Therapy Services of Arizona has
                been dedicated to unleashing the unique potential of individuals
                with disabilities through evidence-based music therapy
                interventions.
              </p>
              <Link
                href="/about"
                className="btn-primary text-white font-semibold px-6 py-3 rounded-full inline-flex items-center"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Learn More About Us
              </Link>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="glass-card overflow-hidden rounded-3xl">
                <Image
                  src="https://static.wixstatic.com/media/072f2d_a15cb6cb61a74ff8956322ba1d5028f1.jpg/v1/fill/w_600,h_450,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/_MG_1270_JPG.jpg"
                  alt="Music therapy session at NMTSA"
                  width={600}
                  height={384}
                  className="w-full h-96 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
