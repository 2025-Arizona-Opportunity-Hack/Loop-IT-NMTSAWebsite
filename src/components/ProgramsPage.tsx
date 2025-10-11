"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  User,
  Users,
  HeartHandshake,
  Music,
  GraduationCap,
  BookOpen,
  Phone,
  Clock,
  MapPin,
  CheckCircle,
} from "lucide-react";

const ProgramsPage = () => {
  const programs = [
    {
      icon: User,
      title: "Individual Therapy",
      description:
        "One-on-one sessions tailored to specific neurologic conditions and personal goals.",
      features: [
        "Personalized treatment plans",
        "Evidence-based interventions",
        "Progress tracking and assessment",
        "Family consultation included",
      ],
      color: "from-blue-500 to-purple-600",
      ageRange: "18 months - 90+ years",
      duration: "30-60 minutes",
      frequency: "Weekly sessions",
    },
    {
      icon: Users,
      title: "Group Sessions",
      description:
        "Community-based group therapy fostering social interaction and peer support.",
      features: [
        "Social skill development",
        "Peer interaction and support",
        "Shared musical experiences",
        "Cost-effective therapy option",
      ],
      color: "from-green-500 to-emerald-600",
      ageRange: "Various age groups",
      duration: "45-90 minutes",
      frequency: "Weekly or bi-weekly",
    },
    {
      icon: HeartHandshake,
      title: "Family Support",
      description:
        "Resources and training for families to continue therapeutic benefits at home.",
      features: [
        "Parent/caregiver training",
        "Home practice strategies",
        "Educational workshops",
        "Support group access",
      ],
      color: "from-orange-500 to-red-600",
      ageRange: "All family members",
      duration: "60-120 minutes",
      frequency: "Monthly workshops",
    },
    {
      icon: Music,
      title: "Adapted Music Lessons",
      description:
        "Specialized private music lessons for individuals with disabilities.",
      features: [
        "Instrument-specific instruction",
        "Adaptive techniques",
        "Performance opportunities",
        "Recreational music making",
      ],
      color: "from-purple-500 to-pink-600",
      ageRange: "5 years and up",
      duration: "30-45 minutes",
      frequency: "Weekly lessons",
    },
    {
      icon: GraduationCap,
      title: "Professional Development",
      description:
        "Consultation and collaboration opportunities for other therapy professionals.",
      features: [
        "Continuing education courses",
        "Consultation services",
        "Research collaboration",
        "Best practice sharing",
      ],
      color: "from-teal-500 to-cyan-600",
      ageRange: "Healthcare professionals",
      duration: "Variable",
      frequency: "On-demand",
    },
    {
      icon: BookOpen,
      title: "Community Education",
      description:
        "Training related to positive behavioral and communication supports.",
      features: [
        "Public awareness programs",
        "Educational presentations",
        "Community workshops",
        "Advocacy training",
      ],
      color: "from-rose-500 to-pink-600",
      ageRange: "General public",
      duration: "60-180 minutes",
      frequency: "Quarterly events",
    },
  ];

  const conditions = [
    "Stroke/Brain Injury",
    "Parkinson's Disease",
    "Multiple Sclerosis",
    "Autism Spectrum Disorder",
    "Cerebral Palsy",
    "Alzheimer's/Dementia",
    "Developmental Delays",
    "Spinal Cord Injury",
    "Traumatic Brain Injury",
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-nmtsa-100 text-nmtsa-700 rounded-full text-sm font-semibold mb-6">
              Our Programs
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold font-poppins text-gray-900 mb-6">
              Comprehensive{" "}
              <span className="gradient-text">Therapy Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Evidence-based neurologic music therapy programs designed to meet
              diverse needs and goals. From individual sessions to community
              education, we offer comprehensive support for individuals with
              neurologic impairments and their families.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                className="glass-card p-8 rounded-2xl group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${program.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <program.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-poppins">
                  {program.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {program.description}
                </p>

                <div className="space-y-3 mb-6">
                  {program.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-2" />
                    {program.ageRange}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    {program.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    {program.frequency}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions We Treat */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
              Conditions We <span className="gradient-text">Treat</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced music therapists work with individuals across a
              wide range of neurologic conditions
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {conditions.map((condition, index) => (
              <motion.div
                key={condition}
                className="glass-card p-6 rounded-xl text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="font-semibold text-gray-900">{condition}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
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
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How we create personalized music therapy experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Initial Assessment",
                description: "Comprehensive evaluation of needs and goals",
              },
              {
                step: "02",
                title: "Treatment Planning",
                description: "Customized therapy plan development",
              },
              {
                step: "03",
                title: "Active Therapy",
                description: "Regular sessions with progress monitoring",
              },
              {
                step: "04",
                title: "Ongoing Support",
                description: "Continued care and family training",
              },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-nmtsa-500 to-nmtsa-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">
                    {process.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">
                  {process.title}
                </h3>
                <p className="text-gray-600">{process.description}</p>
              </motion.div>
            ))}
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-nmtsa-100 mb-8 leading-relaxed">
              Contact us today to learn more about our programs and how we can
              help you or your loved one achieve therapeutic goals through
              music.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary bg-white text-nmtsa-600 font-semibold px-8 py-4 rounded-full inline-flex items-center justify-center text-lg hover:bg-nmtsa-50 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Schedule Consultation
              </Link>
              <Link
                href="/about"
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full inline-flex items-center justify-center text-lg hover:bg-white hover:text-nmtsa-600 transition-colors"
              >
                Learn More About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage;
