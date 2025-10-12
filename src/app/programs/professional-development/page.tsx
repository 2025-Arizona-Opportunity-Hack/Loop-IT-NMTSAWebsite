"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  MessageSquare,
  Presentation,
  ArrowLeft,
  CheckCircle,
  Star,
  Clock,
  MapPin,
  Users,
  FileText,
  Send,
  X,
  Award,
  BookOpen,
  Target,
  TrendingUp,
  Lightbulb,
  Network,
} from "lucide-react";

const ProfessionalDevelopmentPage = () => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(
      "Thank you! Your professional development request has been submitted successfully. We will contact you within 24 hours."
    );
    setSelectedForm(null);
    setFormData({});
  };

  const closeForm = () => {
    setSelectedForm(null);
    setFormData({});
  };

  const subPrograms = [
    {
      id: "consultation",
      icon: MessageSquare,
      title: "Consultation",
      description:
        "Expert consultation services for individuals, families, and organizations seeking NMT guidance.",
      features: [
        "Individual case consultation",
        "Program development guidance",
        "Treatment planning assistance",
        "Professional mentorship",
        "Organizational training",
      ],
      color: "from-indigo-500 to-blue-600",
      formType: "consultation",
    },
    {
      id: "presentation",
      icon: Presentation,
      title: "NMT Presentation",
      description:
        "Educational presentations and workshops about neurologic music therapy for various audiences.",
      features: [
        "Public awareness presentations",
        "Educational workshops",
        "Conference presentations",
        "Community outreach programs",
        "Customized content delivery",
      ],
      color: "from-rose-500 to-pink-600",
      formType: "presentation",
    },
  ];

  const offerings = [
    {
      icon: BookOpen,
      title: "Continuing Education",
      description: "Structured courses for ongoing professional development",
      benefits: ["CEU credits", "Evidence-based practices", "Latest research"],
    },
    {
      icon: Award,
      title: "Certification Training",
      description: "Specialized certification programs in NMT techniques",
      benefits: [
        "Official certification",
        "Hands-on training",
        "Expert instruction",
      ],
    },
    {
      icon: Network,
      title: "Research Collaboration",
      description: "Partner with us on cutting-edge research projects",
      benefits: ["Publication opportunities", "Data access", "Peer networking"],
    },
    {
      icon: Target,
      title: "Best Practice Workshops",
      description: "Interactive workshops on current best practices",
      benefits: ["Practical skills", "Case studies", "Peer interaction"],
    },
  ];

  const targetAudiences = [
    {
      title: "Music Therapists",
      description:
        "Enhance your NMT skills and stay current with best practices",
      icon: "🎵",
    },
    {
      title: "Healthcare Professionals",
      description: "Learn how to integrate music therapy into your practice",
      icon: "🏥",
    },
    {
      title: "Educators",
      description: "Discover how music therapy can support educational goals",
      icon: "🎓",
    },
    {
      title: "Researchers",
      description: "Collaborate on groundbreaking music therapy research",
      icon: "🔬",
    },
  ];

  const achievements = [
    {
      number: "500+",
      label: "Professionals Trained",
      description: "Healthcare professionals and educators",
    },
    {
      number: "50+",
      label: "CEU Hours",
      description: "Available through our programs",
    },
    {
      number: "15+",
      label: "Research Papers",
      description: "Published in collaboration",
    },
    {
      number: "100%",
      label: "Satisfaction Rate",
      description: "From our training participants",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/programs"
            className="inline-flex items-center text-teal-600 hover:text-teal-800 mb-6 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Programs
          </Link>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold font-poppins text-gray-900 mb-6">
              Professional <span className="gradient-text">Development</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Advanced training and consultation services for healthcare
              professionals and organizations. Elevate your practice with
              evidence-based neurologic music therapy techniques.
            </p>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-gray-900 mb-6">
              Our <span className="gradient-text">Offerings</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive professional development opportunities designed for
              various experience levels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offerings.map((offering, index) => (
              <div
                key={offering.title}
                className="glass-card p-6 rounded-2xl text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <offering.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">
                  {offering.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {offering.description}
                </p>
                <div className="space-y-2">
                  {offering.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-xs text-gray-600"
                    >
                      <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audiences */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-gray-900 mb-6">
              Who We <span className="gradient-text">Serve</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our professional development programs are designed for various
              healthcare and education professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {targetAudiences.map((audience, index) => (
              <div
                key={audience.title}
                className="glass-card p-6 rounded-2xl text-center"
              >
                <div className="text-4xl mb-4">{audience.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-poppins">
                  {audience.title}
                </h3>
                <p className="text-gray-600 text-sm">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-gray-900 mb-6">
              Specialized <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our specialized consultation and presentation services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {subPrograms.map((program, index) => (
              <div
                key={program.id}
                className="glass-card p-8 rounded-2xl group"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${program.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <program.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                  {program.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {program.description}
                </p>

                <div className="space-y-3 mb-8">
                  {program.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    alert(
                      "Link generated! Your form access link has been created and will be available shortly."
                    );
                  }}
                  className={`w-full bg-gradient-to-r ${program.color} text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center`}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Access Form
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-gray-900 mb-6">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How we deliver exceptional professional development experiences
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Needs Assessment",
                description:
                  "We evaluate your specific learning goals and requirements",
                icon: Target,
              },
              {
                step: "02",
                title: "Custom Planning",
                description:
                  "Design tailored training programs or consultation services",
                icon: Lightbulb,
              },
              {
                step: "03",
                title: "Expert Delivery",
                description:
                  "Receive training from certified NMT professionals",
                icon: Award,
              },
              {
                step: "04",
                title: "Ongoing Support",
                description: "Continued mentorship and follow-up consultation",
                icon: TrendingUp,
              },
            ].map((process, index) => (
              <div key={process.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">
                    {process.step}
                  </span>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <process.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">
                  {process.title}
                </h3>
                <p className="text-gray-600 text-sm">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-poppins mb-4">Our Impact</h2>
            <p className="text-xl text-teal-100">
              Measuring success through professional growth and development
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={achievement.label} className="text-center">
                <div className="text-4xl font-bold font-poppins mb-2">
                  {achievement.number}
                </div>
                <div className="text-lg font-semibold mb-2">
                  {achievement.label}
                </div>
                <div className="text-sm text-teal-100">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forms Modal */}
      {selectedForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-2xl font-bold text-gray-900 font-poppins">
                {subPrograms.find((p) => p.formType === selectedForm)?.title}{" "}
                Request
              </h3>
              <button
                onClick={closeForm}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              {selectedForm === "consultation" && (
                <ConsultationForm
                  onSubmit={handleFormSubmit}
                  onChange={handleInputChange}
                />
              )}
              {selectedForm === "presentation" && (
                <PresentationForm
                  onSubmit={handleFormSubmit}
                  onChange={handleInputChange}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Form Components
const ConsultationForm = ({
  onSubmit,
  onChange,
}: {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <MessageSquare className="w-5 h-5 mr-2 text-indigo-600" />
        Consultation Request
      </h4>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          onChange={(e) => onChange("name", e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Organization (if applicable)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          onChange={(e) => onChange("organization", e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          onChange={(e) => onChange("phone", e.target.value)}
        />
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900">Consultation Type</h4>
      <div className="space-y-3">
        {[
          "Individual Case Consultation",
          "Program Development",
          "Treatment Planning",
          "Professional Mentorship",
        ].map((type) => (
          <label
            key={type}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <input
              type="radio"
              name="consultationType"
              className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              onChange={() => onChange("consultationType", type)}
            />
            <span className="text-gray-700">{type}</span>
          </label>
        ))}
      </div>
    </div>

    <textarea
      placeholder="Please provide details about your consultation needs and desired outcomes..."
      rows={5}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      onChange={(e) => onChange("details", e.target.value)}
      required
    />

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
    >
      <Send className="w-5 h-5 mr-2" />
      Request Consultation
    </button>
  </form>
);

const PresentationForm = ({
  onSubmit,
  onChange,
}: {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-xl">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Presentation className="w-5 h-5 mr-2 text-rose-600" />
        Presentation Request
      </h4>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Contact Name *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          onChange={(e) => onChange("name", e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Organization/Event *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          onChange={(e) => onChange("organization", e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Event Date"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          onChange={(e) => onChange("eventDate", e.target.value)}
        />
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900">
        Presentation Topics (Select all that apply)
      </h4>
      <div className="grid md:grid-cols-2 gap-3">
        {[
          "Introduction to Music Therapy",
          "Neurologic Music Therapy",
          "Benefits for Specific Conditions",
          "Case Studies",
        ].map((topic) => (
          <label
            key={topic}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <input
              type="checkbox"
              className="w-4 h-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
              onChange={(e) =>
                onChange(
                  `topic_${topic.toLowerCase().replace(" ", "_")}`,
                  e.target.checked
                )
              }
            />
            <span className="text-gray-700">{topic}</span>
          </label>
        ))}
      </div>
    </div>

    <textarea
      placeholder="Additional details about your presentation needs and audience..."
      rows={4}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
      onChange={(e) => onChange("details", e.target.value)}
    />

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
    >
      <Send className="w-5 h-5 mr-2" />
      Request Presentation
    </button>
  </form>
);

export default ProfessionalDevelopmentPage;
