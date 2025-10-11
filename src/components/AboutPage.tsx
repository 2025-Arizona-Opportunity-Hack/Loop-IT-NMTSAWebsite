"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart, Users, ArrowRight, Music, Target, Eye } from "lucide-react";

const AboutPage = () => {
  const values = [
    {
      icon: Music,
      title: "Evidence-Based",
      description:
        "Using scientifically proven neurologic music therapy techniques to achieve measurable results.",
    },
    {
      icon: Users,
      title: "Family-Centered",
      description:
        "Supporting individuals and their families throughout their therapeutic journey.",
    },
    {
      icon: Heart,
      title: "Compassionate",
      description:
        "Delivering care with empathy, respect, and unwavering dedication to each client.",
    },
  ];

  const milestones = [
    { year: "1982", event: "NMTSA founded in Phoenix, Arizona" },
    {
      year: "1990",
      event: "Expanded services to include family support programs",
    },
    { year: "2000", event: "Introduced group therapy sessions" },
    { year: "2010", event: "Launched professional development initiatives" },
    { year: "2020", event: "Adapted services for virtual and hybrid delivery" },
    { year: "2024", event: "Celebrating 40+ years of transforming lives" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-nmtsa-50 via-nmtsa-100 to-nmtsa-200 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-nmtsa-200/30 rounded-full blur-xl animate-pulse-slow" />
          <div
            className="absolute bottom-20 right-10 w-48 h-48 bg-nmtsa-300/20 rounded-full blur-xl animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-nmtsa-100 text-nmtsa-700 rounded-full text-sm font-semibold mb-6">
                About NMTSA
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold font-poppins text-gray-900 mb-6">
                Transforming Lives Through{" "}
                <span className="gradient-text">Music</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Since 1982, Neurologic Music Therapy Services of Arizona has
                been dedicated to unleashing the unique potential of individuals
                with disabilities through evidence-based music therapy
                interventions.
              </p>
              <Link
                href="/programs"
                className="btn-primary text-white font-semibold px-8 py-4 rounded-full inline-flex items-center text-lg"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Explore Our Programs
              </Link>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
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

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              className="bg-gradient-to-br from-nmtsa-500 to-nmtsa-600 rounded-3xl p-8 text-white"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Target className="w-12 h-12 mb-6" />
              <h2 className="font-poppins font-bold text-3xl mb-4">
                Our Mission
              </h2>
              <p className="text-nmtsa-50 leading-relaxed">
                To provide exceptional neurologic music therapy services that
                enhance the quality of life for individuals with neurologic
                impairments and support their families in achieving their goals.
                We are committed to evidence-based practice, family-centered
                care, and professional excellence.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Eye className="w-12 h-12 mb-6" />
              <h2 className="font-poppins font-bold text-3xl mb-4">
                Our Vision
              </h2>
              <p className="text-blue-50 leading-relaxed">
                To unleash the unique potential of individuals with disabilities
                through the transformative power of music therapy. We envision a
                world where every person has access to innovative, compassionate
                care that empowers them to achieve their fullest potential.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our Core <span className="gradient-text">Values</span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              The principles that guide everything we do at NMTSA
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="glass-card p-8 text-center rounded-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-nmtsa-500 to-nmtsa-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four decades of growth, innovation, and impact in the Phoenix
              community
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-nmtsa-300"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                    }`}
                  >
                    <div className="glass-card p-6 rounded-2xl">
                      <div className="text-2xl font-bold text-nmtsa-600 font-poppins mb-2">
                        {milestone.year}
                      </div>
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-nmtsa-500 rounded-full border-4 border-white shadow-lg relative z-10"></div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-nmtsa-500 to-nmtsa-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-nmtsa-100 mb-8 leading-relaxed">
              Contact us today to learn how our music therapy services can make
              a difference in your life or the life of someone you care about.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/programs"
                className="bg-white text-nmtsa-600 font-semibold px-8 py-4 rounded-full inline-flex items-center justify-center text-lg hover:bg-nmtsa-50 transition-colors"
              >
                View Our Programs
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full inline-flex items-center justify-center text-lg hover:bg-white hover:text-nmtsa-600 transition-colors"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
