"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  PlayCircle,
  Heart,
  ArrowRight,
  ChevronDown,
  Music,
  Users,
  GraduationCap,
  Briefcase,
  UserPlus,
  ShoppingBag,
  BookOpen,
  Calendar,
  Star,
  Quote,
} from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";

const HomePage = () => {
  const stats = [
    { number: "40+", label: "Years Serving" },
    { number: "500+", label: "Families Helped" },
    { number: "15K+", label: "Sessions" },
  ];

  const programs = [
    {
      icon: Music,
      title: "Music Therapy",
      description: "Evidence-based interventions for neurologic conditions",
      color: "bg-nmtsa-500",
    },
    {
      icon: GraduationCap,
      title: "Music Lessons",
      description: "Adaptive music education for all skill levels",
      color: "bg-orange-500",
    },
    {
      icon: Users,
      title: "Community Education",
      description: "Workshops and training for families and professionals",
      color: "bg-amber-500",
    },
  ];

  const getInvolvedOptions = [
    {
      icon: Heart,
      title: "Volunteer",
      description: "Make a difference in our community",
      link: "/contact",
    },
    {
      icon: Briefcase,
      title: "Internship",
      description: "Gain hands-on experience in music therapy",
      link: "/contact",
    },
    {
      icon: UserPlus,
      title: "Employment",
      description: "Join our professional team",
      link: "/contact",
    },
  ];

  const testimonials = [
    {
      quote:
        "NMTSA has transformed our daughter's life through music therapy. The progress she's made is incredible.",
      author: "Sarah M.",
      role: "Parent",
    },
    {
      quote:
        "The music therapy sessions have helped me regain my speech and confidence after my stroke.",
      author: "Robert K.",
      role: "Client",
    },
    {
      quote:
        "The compassionate care and professional expertise at NMTSA is unmatched.",
      author: "Linda T.",
      role: "Family Member",
    },
  ];

  const blogPosts = [
    {
      title: "The Science Behind Music Therapy",
      excerpt:
        "Exploring how music activates neural pathways to promote healing...",
      date: "Oct 5, 2024",
      readTime: "5 min read",
    },
    {
      title: "Supporting Families Through Music",
      excerpt: "How our community programs create lasting impact...",
      date: "Sep 28, 2024",
      readTime: "3 min read",
    },
    {
      title: "New Research in Neurologic Music Therapy",
      excerpt: "Latest findings in evidence-based interventions...",
      date: "Sep 20, 2024",
      readTime: "4 min read",
    },
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

      {/* Programs Overview Section */}
      <section className="py-20 bg-gradient-to-br from-nmtsa-50 to-nmtsa-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-nmtsa-600 text-white rounded-full text-sm font-semibold mb-6">
              Our Programs
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
              Comprehensive <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a range of evidence-based programs designed to meet
              diverse needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                className="glass-card p-8 rounded-2xl text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`w-16 h-16 ${program.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                >
                  <program.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-6">{program.description}</p>
                <Link
                  href="/programs"
                  className="text-nmtsa-600 font-semibold hover:text-nmtsa-700 inline-flex items-center"
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Service Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
              Ready to Get <span className="gradient-text">Started</span>?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Take the first step towards transformation. Our team is here to
              guide you through our services and find the perfect program for
              your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary text-white font-semibold px-8 py-4 rounded-full inline-flex items-center text-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Request Service
              </Link>
              <Link
                href="/programs"
                className="btn-secondary text-nmtsa-600 font-semibold px-8 py-4 rounded-full inline-flex items-center text-lg"
              >
                <Music className="w-5 h-5 mr-2" />
                View Programs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Get Involved Highlights */}
      <section className="py-20 bg-gradient-to-br from-nmtsa-600 to-nmtsa-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
              Get <span className="text-nmtsa-200">Involved</span>
            </h2>
            <p className="text-xl text-nmtsa-100 max-w-3xl mx-auto">
              Join our mission and make a meaningful impact in the lives of
              others
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {getInvolvedOptions.map((option, index) => (
              <motion.div
                key={option.title}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <option.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-poppins">
                  {option.title}
                </h3>
                <p className="text-nmtsa-100 mb-6">{option.description}</p>
                <Link
                  href={option.link}
                  className="bg-white text-nmtsa-600 font-semibold px-6 py-3 rounded-full hover:bg-nmtsa-50 transition-colors inline-flex items-center"
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support / Donate Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 bg-nmtsa-100 text-nmtsa-700 rounded-full text-sm font-semibold mb-6">
                Support Our Mission
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
                Help Us Transform{" "}
                <span className="gradient-text">More Lives</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Your generous support enables us to provide life-changing music
                therapy services to individuals and families in need. Every
                donation makes a direct impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/donate"
                  className="btn-primary text-white font-semibold px-8 py-4 rounded-full inline-flex items-center text-lg"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Donate Now
                </Link>
                <Link
                  href="/contact"
                  className="btn-secondary text-nmtsa-600 font-semibold px-8 py-4 rounded-full inline-flex items-center text-lg"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Shop Merchandise
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-nmtsa-600 font-poppins mb-2">
                  $50
                </div>
                <p className="text-gray-600 text-sm">
                  Funds one therapy session
                </p>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-nmtsa-600 font-poppins mb-2">
                  $200
                </div>
                <p className="text-gray-600 text-sm">
                  Supports a monthly program
                </p>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-nmtsa-600 font-poppins mb-2">
                  $500
                </div>
                <p className="text-gray-600 text-sm">
                  Sponsors a family&apos;s care
                </p>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center">
                <div className="text-3xl font-bold text-nmtsa-600 font-poppins mb-2">
                  $1000
                </div>
                <p className="text-gray-600 text-sm">Funds training programs</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-gradient-to-br from-nmtsa-50 to-nmtsa-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-nmtsa-600 text-white rounded-full text-sm font-semibold mb-6">
              Testimonials
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
              Stories of <span className="gradient-text">Transformation</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="glass-card p-8 rounded-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Quote className="w-8 h-8 text-nmtsa-400 mb-4" />
                <p className="text-gray-600 mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-nmtsa-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-nmtsa-600 font-bold">
                      {testimonial.author[0]}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-nmtsa-100 text-nmtsa-700 rounded-full text-sm font-semibold mb-6">
              Latest News
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
              From Our <span className="gradient-text">Blog</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest insights, research, and stories from
              NMTSA
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                className="glass-card p-6 rounded-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {post.date}
                  <span className="mx-2">•</span>
                  {post.readTime}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-poppins">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link
                  href="/blog"
                  className="text-nmtsa-600 font-semibold hover:text-nmtsa-700 inline-flex items-center"
                >
                  Read More <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              href="/blog"
              className="btn-secondary text-nmtsa-600 font-semibold px-8 py-4 rounded-full inline-flex items-center text-lg"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              View All Posts
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-nmtsa-600 to-nmtsa-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
              Ready to Begin Your{" "}
              <span className="text-nmtsa-200">Journey</span>?
            </h2>
            <p className="text-xl text-nmtsa-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Whether you&apos;re seeking music therapy services, want to get
              involved, or have questions about our programs, we&apos;re here to
              help you take the next step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-nmtsa-600 font-semibold px-8 py-4 rounded-full inline-flex items-center text-lg hover:bg-nmtsa-50 transition-colors"
              >
                <Users className="w-5 h-5 mr-2" />
                Contact Us Today
              </Link>
              <Link
                href="/programs"
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full inline-flex items-center text-lg hover:bg-white hover:text-nmtsa-600 transition-colors"
              >
                <Music className="w-5 h-5 mr-2" />
                Explore Programs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
