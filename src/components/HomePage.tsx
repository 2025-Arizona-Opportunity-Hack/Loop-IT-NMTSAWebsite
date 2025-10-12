"use client";

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
      color: "bg-nmtsa-600",
    },
    {
      icon: Users,
      title: "Community Education",
      description: "Workshops and training for families and professionals",
      color: "bg-nmtsa-700",
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
        "NMTSA has transformed our daughter&apos;s life through music therapy. The progress she&apos;s made is incredible.",
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-nmtsa-50 via-nmtsa-100 to-nmtsa-200">
        {/* Hero Content */}
        <div className="container-responsive text-center py-20">
          <h1 className="font-poppins font-bold text-gray-900 mb-6 leading-tight text-responsive-4xl">
            Unleashing <span className="gradient-text">Unique Potential</span>
            <br />
            Through Music Therapy
          </h1>

          <p className="text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto text-responsive-lg">
            NMTSA provides comprehensive music therapy services to individuals
            with neurologic impairments and their families in the greater
            Phoenix area, creating positive change through the power of music.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/programs" className="btn-primary group">
              <PlayCircle className="w-5 h-5 mr-2" />
              Explore Our Programs
            </Link>

            <Link href="/about" className="btn-secondary group">
              <Heart className="w-5 h-5 mr-2" />
              Learn Our Story
            </Link>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-6 sm:gap-8 max-w-md mx-auto lg:max-w-lg">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="font-bold text-nmtsa-600 font-poppins text-responsive-xl">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-responsive-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white relative">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block px-4 py-2 bg-nmtsa-100 text-nmtsa-700 rounded-full font-semibold mb-6 text-responsive-base">
                About NMTSA
              </span>
              <p className="text-gray-600 mb-8 leading-relaxed text-responsive-lg">
                Since 1982, Neurologic Music Therapy Services of Arizona has
                been dedicated to unleashing the unique potential of individuals
                with disabilities through evidence-based music therapy
                interventions.
              </p>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="glass-card overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-xl">
                <Image
                  src="https://static.wixstatic.com/media/072f2d_a15cb6cb61a74ff8956322ba1d5028f1.jpg/v1/fill/w_600,h_450,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/_MG_1270_JPG.jpg"
                  alt="Music therapy session at NMTSA"
                  width={600}
                  height={384}
                  className="w-full object-cover aspect-[4/3] h-96 transition-transform duration-300 hover:scale-[1.01]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-nmtsa-50 to-nmtsa-100">
        <div className="container-responsive">
          <header className="text-center mb-8 lg:mb-12">
            <span className="inline-block px-3 py-1.5 bg-nmtsa-600 text-white rounded-full font-medium mb-4 text-sm">
              Our Programs
            </span>
            <h2 className="font-bold font-poppins text-gray-900 mb-4 text-2xl sm:text-3xl lg:text-4xl">
              Comprehensive <span className="gradient-text">Services</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              Evidence-based programs designed to meet diverse needs
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {programs.map((program, index) => (
              <article
                key={program.title}
                className="glass-card p-4 sm:p-6 rounded-xl text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 ${program.color} rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-[1.05]`}
                >
                  <program.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3 font-poppins text-lg sm:text-xl">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
                  {program.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Request Service Section */}
      <section
        className="py-12 sm:py-16 lg:py-20 bg-white"
        id="get-started"
        aria-labelledby="get-started-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2
              id="get-started-heading"
              className="font-bold font-poppins text-gray-900 mb-6"
              style={{ fontSize: "clamp(2rem, 6vw, 3rem)" }}
            >
              Ready to Get <span className="gradient-text">Started</span>?
            </h2>
            <p
              className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{ fontSize: "clamp(1rem, 3vw, 1.25rem)" }}
            >
              Take the first step towards transformation. Our team is here to
              guide you through our services and find the perfect program for
              your needs.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              role="group"
              aria-label="Get started actions"
            >
              <Link
                href="/contact"
                className="btn-primary text-white font-semibold px-8 py-4 rounded-full inline-flex items-center
                         focus:outline-none focus:ring-4 focus:ring-nmtsa-400 focus:ring-opacity-50
                         transition-all duration-250 touch-target-large"
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                  minHeight: "48px",
                  minWidth: "180px",
                }}
                aria-describedby="request-service-description"
              >
                <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
                Request Service
              </Link>
              <div id="request-service-description" className="sr-only">
                Contact NMTSA to request music therapy services
              </div>

              <Link
                href="/programs"
                className="btn-secondary text-nmtsa-600 font-semibold px-8 py-4 rounded-full inline-flex items-center
                         focus:outline-none focus:ring-4 focus:ring-nmtsa-400 focus:ring-opacity-50
                         transition-all duration-250 touch-target-large"
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                  minHeight: "48px",
                  minWidth: "180px",
                }}
                aria-describedby="view-programs-description"
              >
                <Music className="w-5 h-5 mr-2" aria-hidden="true" />
                View Programs
              </Link>
              <div id="view-programs-description" className="sr-only">
                Browse all available NMTSA programs and services
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Highlights */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-nmtsa-600 via-nmtsa-650 to-nmtsa-700 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

        <div className="container-responsive relative">
          <header className="text-center mb-8 lg:mb-12">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4 border border-white/20">
              Opportunities
            </span>
            <h2 className="font-bold font-poppins mb-4 text-2xl sm:text-3xl lg:text-4xl">
              Get <span className="text-nmtsa-200">Involved</span>
            </h2>
            <p className="text-nmtsa-100 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Join our mission and make a meaningful impact in the lives of
              individuals with neurologic impairments
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {getInvolvedOptions.map((option, index) => (
              <article
                key={option.title}
                className="get-involved-card p-6 sm:p-8 rounded-3xl text-center transition-all duration-500 ease-out group hover-lift"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white/30 to-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 ease-out group-hover:scale-[1.15] group-hover:from-white/40 group-hover:to-white/20 shadow-lg">
                  <option.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-sm" />
                </div>
                <h3 className="font-bold mb-4 font-poppins text-xl sm:text-2xl text-white drop-shadow-sm">
                  {option.title}
                </h3>
                <p className="text-nmtsa-100 mb-6 text-base sm:text-lg leading-relaxed">
                  {option.description}
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    className="form-btn-white text-nmtsa-600 font-semibold px-6 py-3 rounded-full text-base sm:text-lg group/btn"
                    onClick={() => {
                      // Create form URL based on the option type
                      const formUrl =
                        option.title === "Volunteer"
                          ? "/contact?form=volunteer"
                          : option.title === "Internship"
                          ? "/contact?form=internship"
                          : "/contact?form=employment";
                      window.location.href = formUrl;
                    }}
                  >
                    Apply for {option.title}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Support / Donate Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-nmtsa-100 text-nmtsa-700 rounded-full text-sm font-semibold mb-6">
                Support Our Mission
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
                Help Us Transform{" "}
                <span className="gradient-text">More Lives</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Your generous support enables us to provide life-changing music
                therapy services to individuals and families in need. Every
                donation makes a direct impact.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/donate"
                  className="btn-primary text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full inline-flex items-center justify-center text-base sm:text-lg"
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Donate Now
                </Link>
                <Link
                  href="/contact"
                  className="btn-secondary text-nmtsa-600 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full inline-flex items-center justify-center text-base sm:text-lg"
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Shop Merchandise
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Impact Cards */}
              <div className="glass-card p-4 sm:p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold text-nmtsa-600 font-poppins mb-2">
                  $50
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Funds one therapy session
                </p>
              </div>

              <div className="glass-card p-4 sm:p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold text-nmtsa-600 font-poppins mb-2">
                  $200
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Supports monthly programs
                </p>
              </div>

              <div className="glass-card p-4 sm:p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold text-nmtsa-600 font-poppins mb-2">
                  $500
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Sponsors a family&apos;s care
                </p>
              </div>

              <div className="glass-card p-4 sm:p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold text-nmtsa-600 font-poppins mb-2">
                  $1000
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Transforms multiple lives
                </p>
              </div>

              {/* Additional info card spanning full width on mobile */}
              <div className="sm:col-span-2 bg-gradient-to-r from-nmtsa-500 to-nmtsa-600 p-4 sm:p-6 rounded-2xl text-white text-center">
                <h3 className="font-bold text-base sm:text-lg mb-2">
                  Why Choose NMTSA?
                </h3>
                <p className="text-nmtsa-100 text-xs sm:text-sm">
                  40+ years of proven results • Evidence-based therapy •
                  Board-certified therapists • Direct community impact
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-gradient-to-br from-nmtsa-50 to-nmtsa-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-nmtsa-600 text-white rounded-full text-sm font-semibold mb-6">
              Testimonials
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
              Stories of <span className="gradient-text">Transformation</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
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
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="glass-card p-6 rounded-2xl">
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
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="btn-secondary text-nmtsa-600 font-semibold px-8 py-4 rounded-full inline-flex items-center text-lg"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-nmtsa-600 to-nmtsa-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
