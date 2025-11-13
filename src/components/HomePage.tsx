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
  Award,
  CheckCircle,
  Target,
  TrendingUp,
  Clock,
  MapPin,
  Phone,
} from "lucide-react";
import {
  useContent,
  getContentValue,
  getMetadataArray,
  getMetadataValue,
} from "@/lib/hooks/useContent";
import MusicalLoader from "./MusicalLoader";

const HomePage = () => {
  // Fetch all homepage content
  const { contentMap, loading } = useContent({ page: "home" });

  // Show loader while content is loading
  if (loading) {
    return <MusicalLoader />;
  }

  // Default fallback data
  const defaultStats = [
    { number: "40+", label: "Years Serving" },
    { number: "500+", label: "Families Helped" },
    { number: "15K+", label: "Sessions" },
  ];

  const defaultPrograms = [
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

  const defaultTestimonials = [
    {
      quote:
        "NMTSA has transformed our daughter's life through music therapy. The progress she's made is incredible.",
      author: "Sarah M.",
      role: "Parent",
      rating: 5,
    },
    {
      quote:
        "The music therapy sessions have helped me regain my speech and confidence after my stroke.",
      author: "Robert K.",
      role: "Client",
      rating: 5,
    },
    {
      quote:
        "The compassionate care and professional expertise at NMTSA is unmatched.",
      author: "Linda T.",
      role: "Family Member",
      rating: 5,
    },
    {
      quote:
        "As a healthcare provider, I confidently refer my patients to NMTSA. Their evidence-based approach delivers real results.",
      author: "Dr. Michael Chen",
      role: "Neurologist",
      rating: 5,
    },
    {
      quote:
        "The music therapy program has been instrumental in my son's development. He's more engaged and communicative than ever.",
      author: "Jennifer R.",
      role: "Parent of Child with Autism",
      rating: 5,
    },
    {
      quote:
        "Working with NMTSA's board-certified therapists has been life-changing for my recovery from traumatic brain injury.",
      author: "David M.",
      role: "TBI Survivor",
      rating: 5,
    },
  ];

  // Get content from CMS or use defaults
  const heroTitle = getContentValue(
    contentMap["home_hero_title"],
    "Unleashing Unique Potential Through Music Therapy"
  );
  const heroSubtitle = getContentValue(
    contentMap["home_hero_subtitle"],
    "NMTSA provides comprehensive music therapy services to individuals with neurologic impairments and their families in the greater Phoenix area, creating positive change through the power of music."
  );

  const stats = getMetadataArray(
    contentMap["home_stats"],
    "stats",
    defaultStats
  );
  const programs = getMetadataArray(
    contentMap["home_programs"],
    "programs",
    defaultPrograms
  );
  const testimonials = getMetadataArray(
    contentMap["home_testimonials"],
    "testimonials",
    defaultTestimonials
  );

  // About Preview Section
  const aboutPreviewBadge = getContentValue(
    contentMap["home_about_preview_badge"],
    "About NMTSA"
  );
  const aboutPreviewHeading = getContentValue(
    contentMap["home_about_preview_heading"],
    "Unleashing the Unique Potential of Individuals with Disabilities"
  );
  const aboutPreviewDescription = getContentValue(
    contentMap["home_about_preview_text"],
    "Since 1982, NMTSA has provided services to persons with neurologic impairments (ages 18 months to 75+ years) and their families in the greater Phoenix area, using evidence-based neurologic music therapy."
  );
  const aboutPreviewButtonText = getContentValue(
    contentMap["home_about_preview_button_text"],
    "Learn More About Us"
  );
  const aboutPreviewText = getContentValue(
    contentMap["home_about_preview_text"],
    "Since 1982, Neurologic Music Therapy Services of Arizona has been dedicated to unleashing the unique potential of individuals with disabilities through evidence-based music therapy interventions."
  );
  const aboutPreviewImage = getContentValue(
    contentMap["home_about_preview_image"],
    "https://static.wixstatic.com/media/072f2d_a15cb6cb61a74ff8956322ba1d5028f1.jpg/v1/fill/w_600,h_450,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/_MG_1270_JPG.jpg"
  );

  // Programs Overview Section
  const programsBadge = getContentValue(
    contentMap["home_programs_badge"],
    "Our Programs"
  );
  const programsHeading = getContentValue(
    contentMap["home_programs_heading"],
    "Comprehensive Services"
  );
  const programsSubtitle = getContentValue(
    contentMap["home_programs_subtitle"],
    "Evidence-based programs designed to meet diverse needs"
  );

  // Request Service Section
  const requestServiceHeading = getContentValue(
    contentMap["home_request_service_heading"],
    "Ready to Transform Your Life with Music?"
  );
  const requestServiceIntro = getContentValue(
    contentMap["home_request_service_intro"],
    "Join hundreds of families who have experienced the life-changing power of music therapy."
  );
  const requestServiceTitle = getContentValue(
    contentMap["home_request_service_title"],
    "Ready to Get Started?"
  );
  const requestServiceDescription = getContentValue(
    contentMap["home_request_service_description"],
    "Take the first step towards transformation. Our team is here to guide you through our services and find the perfect program for your needs."
  );

  const defaultQuickStats = [
    { icon: "Clock", label: "2-minute", description: "consultation form" },
    { icon: "CheckCircle", label: "24-hour", description: "response time" },
    { icon: "Users", label: "12 families", description: "started this month" },
  ];
  const quickStats = getMetadataArray(
    contentMap["home_request_service_quick_stats"],
    "stats",
    defaultQuickStats
  );

  const requestServicePhone = getContentValue(
    contentMap["home_request_service_phone"],
    "(602) 588-7631"
  );
  const requestServicePhoneLabel = getContentValue(
    contentMap["home_request_service_phone_label"],
    "Have questions? Call us today"
  );

  // Get Involved Section
  const getInvolvedBadge = getContentValue(
    contentMap["home_get_involved_badge"],
    "Opportunities"
  );
  const getInvolvedTitle = getContentValue(
    contentMap["home_get_involved_title"],
    "Get Involved"
  );
  const getInvolvedSubtitle = getContentValue(
    contentMap["home_get_involved_subtitle"],
    "Join our mission and make a meaningful impact in the lives of individuals with neurologic impairments"
  );

  const defaultGetInvolvedOptions = [
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
  const getInvolvedOptions = getMetadataArray(
    contentMap["home_get_involved_options"],
    "options",
    defaultGetInvolvedOptions
  );

  // Use testimonials from CMS (already defined earlier)
  // const testimonials is already defined from contentMap['home_testimonials']

  // Trust & Credibility Section
  const trustSectionTitle = getContentValue(
    contentMap["home_trust_section_title"],
    "Why Choose NMTSA?"
  );
  const trustSectionSubtitle = getContentValue(
    contentMap["home_trust_section_subtitle"],
    "Trusted by families across Arizona for evidence-based music therapy"
  );

  const defaultTrustBuilders = [
    {
      icon: "Award",
      title: "40+ Years of Excellence",
      description: "Serving Arizona families since 1982",
    },
    {
      icon: "CheckCircle",
      title: "Board-Certified Therapists",
      description: "Evidence-based, professional care",
    },
    {
      icon: "Target",
      title: "Proven Results",
      description: "500+ families transformed",
    },
    {
      icon: "TrendingUp",
      title: "15,000+ Sessions",
      description: "Delivering consistent outcomes",
    },
  ];
  const trustBuilders = getMetadataArray(
    contentMap["home_trust_builders"],
    "trustBuilders",
    defaultTrustBuilders
  );

  const defaultTrustSignals = {
    servingLabel: "Proudly Serving",
    signals: [
      { icon: "MapPin", text: "Greater Phoenix Area" },
      { icon: "Award", text: "Board-Certified Staff" },
      { icon: "CheckCircle", text: "Evidence-Based Approach" },
    ],
  };
  const trustSignalsData =
    contentMap["home_trust_signals"]?.metadata || defaultTrustSignals;
  const trustServingLabel =
    trustSignalsData.servingLabel || defaultTrustSignals.servingLabel;
  const trustSignals = trustSignalsData.signals || defaultTrustSignals.signals;

  // Process / How It Works Section
  const processTitle = getContentValue(
    contentMap["home_process_title"],
    "How Music Therapy Works"
  );
  const processSubtitle = getContentValue(
    contentMap["home_process_subtitle"],
    "Your journey with NMTSA: Simple, professional, and transformative"
  );
  const processCTAText = getContentValue(
    contentMap["home_process_cta_text"],
    "Ready to start your transformation journey?"
  );

  const defaultProcessSteps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "Free consultation to understand your needs and goals",
      icon: "Phone",
    },
    {
      number: "02",
      title: "Assessment",
      description: "Comprehensive evaluation by our certified therapists",
      icon: "CheckCircle",
    },
    {
      number: "03",
      title: "Personalized Plan",
      description: "Custom therapy program designed for you",
      icon: "Target",
    },
    {
      number: "04",
      title: "Ongoing Sessions",
      description: "Regular therapy sessions with progress tracking",
      icon: "Music",
    },
    {
      number: "05",
      title: "Progress Tracking",
      description: "Continuous evaluation and plan adjustments",
      icon: "TrendingUp",
    },
  ];
  const processSteps = getMetadataArray(
    contentMap["home_process_steps"],
    "steps",
    defaultProcessSteps
  );

  // Donate Section
  const donateTitle = getContentValue(
    contentMap["home_donate_title"],
    "Transform Lives Through Music"
  );
  const donateDescription = getContentValue(
    contentMap["home_donate_description"],
    "Your support helps us provide life-changing music therapy services to individuals with neurologic impairments and their families."
  );

  const defaultDonateImpact = [
    { amount: "$50", description: "One therapy session" },
    { amount: "$100", description: "Two therapy sessions" },
    { amount: "$250", description: "Five therapy sessions" },
    { amount: "$500", description: "Full month of therapy" },
  ];

  const donateImpact = getMetadataArray(
    contentMap["home_donate_impact"],
    "impactCards",
    defaultDonateImpact
  );
  const whyChooseNMTSA = getContentValue(
    contentMap["home_donate_why_choose"],
    "Why Choose NMTSA?"
  );

  // Testimonials Section
  const testimonialsBadge = getContentValue(
    contentMap["home_testimonials_badge"],
    "Testimonials"
  );
  const testimonialsHeading = getContentValue(
    contentMap["home_testimonials_heading"],
    "Stories of Transformation"
  );
  const testimonialsSubtitle = getContentValue(
    contentMap["home_testimonials_subtitle"],
    "Hear from families, clients, and healthcare professionals"
  );

  const defaultOverallRating = {
    rating: 5.0,
    maxRating: 5,
    reviewCount: "120+",
  };
  const overallRatingData =
    contentMap["home_testimonials_overall_rating"]?.metadata ||
    defaultOverallRating;
  const overallRating = overallRatingData.rating || defaultOverallRating.rating;
  const maxRating =
    overallRatingData.maxRating || defaultOverallRating.maxRating;
  const reviewCount =
    overallRatingData.reviewCount || defaultOverallRating.reviewCount;

  const testimonialsScrollHint = getContentValue(
    contentMap["home_testimonials_scroll_hint"],
    "← Swipe to see more testimonials →"
  );

  // Blog Section
  const blogBadge = getContentValue(
    contentMap["home_blog_badge"],
    "Latest News"
  );
  const blogHeading = getContentValue(
    contentMap["home_blog_heading"],
    "From Our Blog"
  );
  const blogSubtitle = getContentValue(
    contentMap["home_blog_subtitle"],
    "Stay updated with the latest insights, research, and stories from NMTSA"
  );

  const defaultBlogPosts = [
    {
      title: "The Science Behind Music Therapy",
      excerpt:
        "Exploring how music activates neural pathways to promote healing...",
      date: "Oct 5, 2024",
      readTime: "5 min read",
      link: "/blog",
    },
    {
      title: "Supporting Families Through Music",
      excerpt: "How our community programs create lasting impact...",
      date: "Sep 28, 2024",
      readTime: "3 min read",
      link: "/blog",
    },
    {
      title: "New Research in Neurologic Music Therapy",
      excerpt: "Latest findings in evidence-based interventions...",
      date: "Sep 20, 2024",
      readTime: "4 min read",
      link: "/blog",
    },
  ];
  const blogPosts = getMetadataArray(
    contentMap["home_blog_posts"],
    "posts",
    defaultBlogPosts
  );

  // Final CTA Section
  const finalCTATitle = getContentValue(
    contentMap["home_final_cta_title"],
    "Ready to Begin Your Journey?"
  );
  const finalCTADescription = getContentValue(
    contentMap["home_final_cta_description"],
    "Whether you're seeking music therapy services, want to get involved, or have questions about our programs, we're here to help you take the next step."
  );
  const finalCTAPhoneLabel = getContentValue(
    contentMap["home_final_cta_phone_label"],
    "Prefer to talk? We're here to help"
  );
  const finalCTAHours = getContentValue(
    contentMap["home_final_cta_hours"],
    "Mon-Fri 9AM-5PM MST"
  );

  const scrollToSection = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      Music,
      GraduationCap,
      Users,
      Heart,
      Briefcase,
      UserPlus,
    };
    return icons[iconName] || Music;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-nmtsa-50 via-nmtsa-100 to-nmtsa-200">
        {/* Hero Content */}
        <div className="container-responsive text-center py-20">
          <h1 className="font-poppins font-bold text-gray-900 mb-6 leading-tight text-responsive-4xl">
            <span className="gradient-text">{heroTitle}</span>
          </h1>

          <p className="text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto text-responsive-lg">
            {heroSubtitle}
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
              <div key={stat.label || index} className="text-center">
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
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-gray-900 mb-6">
                {aboutPreviewHeading.split(" ").slice(0, -3).join(" ")}{" "}
                <span className="gradient-text">
                  {aboutPreviewHeading.split(" ").slice(-3).join(" ")}
                </span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-responsive-lg">
                {aboutPreviewDescription}
              </p>
              <Link
                href="/about"
                className="btn-primary text-white font-semibold px-6 py-3 rounded-full inline-flex items-center"
              >
                {aboutPreviewButtonText}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="glass-card overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-xl">
                <Image
                  src={aboutPreviewImage}
                  alt={getMetadataValue(
                    contentMap["home_about_preview_image"],
                    "alt",
                    "Music therapy session at NMTSA"
                  )}
                  width={getMetadataValue(
                    contentMap["home_about_preview_image"],
                    "width",
                    600
                  )}
                  height={getMetadataValue(
                    contentMap["home_about_preview_image"],
                    "height",
                    450
                  )}
                  className="w-full object-cover aspect-[4/3] h-96 transition-transform duration-300 hover:scale-[1.01]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Credibility Section */}
      <section className="py-16 bg-gradient-to-br from-nmtsa-600 to-nmtsa-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins text-white mb-4">
              {trustSectionTitle.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-nmtsa-200">
                {trustSectionTitle.split(" ").slice(-1)[0]}
              </span>
            </h2>
            <p className="text-nmtsa-100 text-lg max-w-2xl mx-auto">
              {trustSectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBuilders.map((item, index) => {
              const IconComponent =
                typeof item.icon === "string"
                  ? getIconComponent(item.icon)
                  : item.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-poppins">
                    {item.title}
                  </h3>
                  <p className="text-nmtsa-100">{item.description}</p>
                </div>
              );
            })}
          </div>

          {/* Additional Trust Signals */}
          <div className="mt-12 text-center">
            <p className="text-nmtsa-100 text-sm mb-4">{trustServingLabel}</p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {trustSignals.map((signal: any, index: number) => {
                const IconComponent =
                  typeof signal.icon === "string"
                    ? getIconComponent(signal.icon)
                    : signal.icon;
                return (
                  <div key={index} className="flex items-center text-white">
                    <IconComponent className="w-5 h-5 mr-2 text-nmtsa-200" />
                    <span className="font-semibold">{signal.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Overview Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-nmtsa-50 to-nmtsa-100">
        <div className="container-responsive">
          <header className="text-center mb-8 lg:mb-12">
            <h2 className="font-bold font-poppins text-gray-900 mb-4 text-2xl sm:text-3xl lg:text-4xl">
              {programsHeading.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="gradient-text">
                {programsHeading.split(" ").slice(-1)[0]}
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              {programsSubtitle}
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {programs.map((program, index) => {
              const IconComponent =
                typeof program.icon === "string"
                  ? getIconComponent(program.icon)
                  : program.icon;
              return (
                <article
                  key={program.title || index}
                  className="glass-card p-4 sm:p-6 rounded-xl text-center hover:shadow-xl transition-all duration-300 group"
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 ${
                      program.color || "bg-nmtsa-500"
                    } rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-[1.05]`}
                  >
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 font-poppins text-lg sm:text-xl">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
                    {program.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Process Section - NEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
              {processTitle.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="gradient-text">
                {processTitle.split(" ").slice(-1)[0]}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {processSubtitle}
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-nmtsa-200 via-nmtsa-400 to-nmtsa-200 transform -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative">
              {processSteps.map((step, index) => {
                const IconComponent =
                  typeof step.icon === "string"
                    ? getIconComponent(step.icon)
                    : step.icon;
                return (
                  <div key={index} className="relative flex">
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-nmtsa-100 hover:border-nmtsa-400 relative z-10 flex flex-col w-full">
                      <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-nmtsa-500 to-nmtsa-600 rounded-2xl mx-auto mb-4 shadow-lg">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-center mb-3">
                        <span className="text-4xl font-bold text-nmtsa-200 font-poppins">
                          {step.number}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 font-poppins text-center">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm text-center leading-relaxed flex-grow">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">{processCTAText}</p>
            <Link
              href="/contact"
              className="btn-primary text-white font-semibold px-8 py-4 rounded-full inline-flex items-center text-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Request Service Section - MOVED HERE */}
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
              {requestServiceHeading.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="gradient-text">
                {requestServiceHeading.split(" ").slice(-1)[0]}
              </span>
            </h2>
            <p
              className="text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed"
              style={{ fontSize: "clamp(1rem, 3vw, 1.25rem)" }}
            >
              {requestServiceIntro}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-600">
              {quickStats.map((stat: any, index: number) => {
                const IconComponent =
                  typeof stat.icon === "string"
                    ? getIconComponent(stat.icon)
                    : stat.icon;
                return (
                  <div key={index} className="flex items-center">
                    <IconComponent className="w-5 h-5 text-nmtsa-600 mr-2" />
                    <span>
                      <strong>{stat.label}</strong> {stat.description}
                    </span>
                  </div>
                );
              })}
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              role="group"
              aria-label="Get started actions"
            >
              <Link
                href="/contact"
                className="btn-primary text-white font-semibold px-8 py-4 rounded-full inline-flex items-center justify-center
                         focus:outline-none focus:ring-4 focus:ring-nmtsa-400 focus:ring-opacity-50
                         transition-all duration-250 touch-target-large shadow-lg hover:shadow-xl"
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                  minHeight: "48px",
                  minWidth: "200px",
                }}
                aria-describedby="request-service-description"
              >
                <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
                Schedule Free Consultation
              </Link>
              <div id="request-service-description" className="sr-only">
                Contact NMTSA to request music therapy services
              </div>

              <Link
                href="/programs"
                className="btn-secondary text-nmtsa-600 font-semibold px-8 py-4 rounded-full inline-flex items-center justify-center
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
                View All Programs
              </Link>
              <div id="view-programs-description" className="sr-only">
                Browse all available NMTSA programs and services
              </div>
            </div>

            {/* Contact Info */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-gray-600 mb-2">{requestServicePhoneLabel}</p>
              <a
                href={`tel:${getMetadataValue(
                  contentMap["home_request_service_phone"],
                  "raw",
                  "602-588-7631"
                )}`}
                className="text-2xl font-bold text-nmtsa-600 hover:text-nmtsa-700 inline-flex items-center"
              >
                <Phone className="w-6 h-6 mr-2" />
                {requestServicePhone}
              </a>
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
            <h2 className="font-bold font-poppins mb-4 text-2xl sm:text-3xl lg:text-4xl">
              {getInvolvedTitle.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-nmtsa-200">
                {getInvolvedTitle.split(" ").slice(-1)[0]}
              </span>
            </h2>
            <p className="text-nmtsa-100 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              {getInvolvedSubtitle}
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {getInvolvedOptions.map((option, index) => (
              <article
                key={option.title}
                className="get-involved-card p-6 sm:p-8 rounded-3xl text-center transition-all duration-500 ease-out group hover-lift flex flex-col"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white/30 to-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 ease-out group-hover:scale-[1.15] group-hover:from-white/40 group-hover:to-white/20 shadow-lg">
                  <option.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-sm" />
                </div>
                <h3 className="font-bold mb-4 font-poppins text-xl sm:text-2xl text-white drop-shadow-sm">
                  {option.title}
                </h3>
                <p className="text-nmtsa-100 mb-6 text-base sm:text-lg leading-relaxed flex-grow">
                  {option.description}
                </p>
                <div className="flex flex-col gap-3 mt-auto">
                  <Link
                    href={
                      option.title === "Volunteer"
                        ? "/get-involved#volunteer"
                        : option.title === "Internship"
                        ? "/get-involved#internship"
                        : option.title === "Employment"
                        ? "/get-involved#employment"
                        : "/get-involved"
                    }
                    className="form-btn-white text-nmtsa-600 font-semibold px-6 py-3 rounded-full text-base sm:text-lg group/btn inline-block"
                  >
                    Explore {option.title}
                  </Link>
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
                {donateTitle.split(" ").slice(0, -2).join(" ")}{" "}
                <span className="gradient-text">
                  {donateTitle.split(" ").slice(-2).join(" ")}
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                {donateDescription}
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
              {donateImpact.map((impact, index) => (
                <div
                  key={index}
                  className="glass-card p-4 sm:p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-nmtsa-600 font-poppins mb-2">
                    {impact.amount}
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {impact.description}
                  </p>
                </div>
              ))}

              {/* Additional info card spanning full width on mobile */}
              <div className="sm:col-span-2 bg-gradient-to-r from-nmtsa-500 to-nmtsa-600 p-4 sm:p-6 rounded-2xl text-white text-center">
                <h3 className="font-bold text-base sm:text-lg mb-2">
                  {whyChooseNMTSA}
                </h3>
                <p className="text-nmtsa-100 text-xs sm:text-sm">
                  {getMetadataValue(
                    contentMap["home_donate_why_choose"],
                    "features",
                    "40+ years of proven results • Evidence-based therapy • Board-certified therapists • Direct community impact"
                  )}
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
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
              {testimonialsHeading.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="gradient-text">
                {testimonialsHeading.split(" ").slice(-1)[0]}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {testimonialsSubtitle}
            </p>
            {/* Overall Rating */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(Math.floor(maxRating))].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-nmtsa-500 text-nmtsa-500"
                />
              ))}
              <span className="ml-2 text-2xl font-bold text-gray-900">
                {overallRating}
              </span>
              <span className="text-gray-600">
                out of {maxRating} ({reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Scrollable Testimonials Container */}
          <div className="relative mb-12">
            <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              <div className="flex gap-6 px-4">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="glass-card p-8 rounded-2xl hover:shadow-xl transition-all duration-300 flex-shrink-0 snap-start w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  >
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-nmtsa-500 text-nmtsa-500"
                        />
                      ))}
                    </div>

                    <Quote className="w-8 h-8 text-nmtsa-400 mb-4" />
                    <p className="text-gray-600 mb-6 italic leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-nmtsa-200 rounded-full flex items-center justify-center mr-4">
                        <span className="text-nmtsa-600 font-bold text-lg">
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

            {/* Scroll Indicator */}
            <div className="text-center mt-4">
              <p className="text-gray-500 text-sm">{testimonialsScrollHint}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-nmtsa-600 to-nmtsa-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
              {finalCTATitle.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-nmtsa-200">
                {finalCTATitle.split(" ").slice(-1)[0]}
              </span>
            </h2>
            <p className="text-xl text-nmtsa-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              {finalCTADescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/contact"
                className="bg-white text-nmtsa-600 font-semibold px-8 py-4 rounded-full inline-flex items-center justify-center text-lg hover:bg-nmtsa-50 transition-all shadow-lg hover:shadow-xl"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Free Consultation
              </Link>
              <Link
                href="/programs"
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full inline-flex items-center justify-center text-lg hover:bg-white hover:text-nmtsa-600 transition-all"
              >
                <Music className="w-5 h-5 mr-2" />
                Explore Programs
              </Link>
            </div>

            {/* Additional Contact Options */}
            <div className="pt-8 border-t border-white/30">
              <p className="text-nmtsa-100 mb-4">{finalCTAPhoneLabel}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={`tel:${getMetadataValue(
                    contentMap["home_request_service_phone"],
                    "raw",
                    "602-588-7631"
                  )}`}
                  className="flex items-center text-white hover:text-nmtsa-200 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  <span className="font-semibold text-lg">
                    {requestServicePhone}
                  </span>
                </a>
                <span className="hidden sm:block text-nmtsa-200">•</span>
                <div className="flex items-center text-nmtsa-100">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{finalCTAHours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
