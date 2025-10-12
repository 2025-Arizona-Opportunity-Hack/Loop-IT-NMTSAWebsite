"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Phone,
  Eye,
  ArrowLeft,
  CheckCircle,
  Star,
  Clock,
  MapPin,
  Users,
  FileText,
  Send,
  X,
  Heart,
  Brain,
  Zap,
} from "lucide-react";

const TherapyProgramPage = () => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(
      "Thank you! Your form has been submitted successfully. We will contact you within 24 hours."
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
      id: "request",
      icon: Phone,
      title: "Request Service",
      description:
        "Start your journey with NMTSA by requesting our specialized music therapy services.",
      features: [
        "Initial consultation scheduling",
        "Service needs assessment",
        "Insurance verification assistance",
        "Flexible scheduling options",
        "Comprehensive intake process",
      ],
      color: "from-green-500 to-emerald-600",
      formType: "request",
    },
    {
      id: "observation",
      icon: Eye,
      title: "Clinical Observation",
      description:
        "Professional observation opportunities for students, researchers, and healthcare professionals.",
      features: [
        "Supervised clinical observations",
        "Educational shadowing experiences",
        "Research collaboration opportunities",
        "Professional development credit",
        "Certificate of completion provided",
      ],
      color: "from-orange-500 to-red-600",
      formType: "observation",
    },
  ];

  const therapyTypes = [
    {
      icon: User,
      title: "Individual Therapy",
      description: "One-on-one personalized sessions",
      benefits: [
        "Customized treatment plans",
        "Direct therapist attention",
        "Privacy and comfort",
      ],
    },
    {
      icon: Users,
      title: "Group Therapy",
      description: "Community-based therapeutic sessions",
      benefits: ["Social interaction", "Peer support", "Shared experiences"],
    },
    {
      icon: Heart,
      title: "Family Therapy",
      description: "Involving family members in treatment",
      benefits: [
        "Family bonding",
        "Support system building",
        "Home practice strategies",
      ],
    },
  ];

  const conditions = [
    { name: "Stroke/Brain Injury", icon: Brain, color: "text-blue-500" },
    { name: "Parkinson's Disease", icon: Zap, color: "text-purple-500" },
    { name: "Autism Spectrum", icon: Heart, color: "text-green-500" },
    { name: "Cerebral Palsy", icon: User, color: "text-orange-500" },
    { name: "Multiple Sclerosis", icon: Brain, color: "text-red-500" },
    { name: "Alzheimer's/Dementia", icon: Brain, color: "text-indigo-500" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/programs"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Programs
          </Link>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold font-poppins text-gray-900 mb-6">
              Therapy <span className="gradient-text">Program</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive neurologic music therapy sessions tailored to
              individual needs and conditions. Our evidence-based approach helps
              improve motor, cognitive, and communication skills.
            </p>
          </div>
        </div>
      </section>

      {/* Therapy Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-gray-900 mb-6">
              Types of <span className="gradient-text">Therapy</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer various therapy formats to meet your unique needs and
              preferences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {therapyTypes.map((type, index) => (
              <div
                key={type.title}
                className="glass-card p-8 rounded-2xl text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <type.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-poppins">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <div className="space-y-3">
                  {type.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions We Treat */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-gray-900 mb-6">
              Conditions We <span className="gradient-text">Treat</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our specialized therapy programs address a wide range of
              neurological conditions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conditions.map((condition, index) => (
              <div
                key={condition.name}
                className="glass-card p-6 rounded-xl flex items-center space-x-4"
              >
                <condition.icon className={`w-8 h-8 ${condition.color}`} />
                <span className="font-semibold text-gray-900">
                  {condition.name}
                </span>
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
              Get <span className="gradient-text">Started</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose how you&apos;d like to begin your therapy journey with us
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

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Clients Served" },
              { number: "15+", label: "Years Experience" },
              { number: "95%", label: "Success Rate" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-4xl font-bold font-poppins">
                  {stat.number}
                </div>
                <div className="text-blue-100">{stat.label}</div>
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
                Form
              </h3>
              <button
                onClick={closeForm}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              {selectedForm === "request" && (
                <RequestServiceForm
                  onSubmit={handleFormSubmit}
                  onChange={handleInputChange}
                />
              )}
              {selectedForm === "observation" && (
                <ClinicalObservationForm
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

// Form Components (simplified versions)
const RequestServiceForm = ({
  onSubmit,
  onChange,
}: {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Phone className="w-5 h-5 mr-2 text-green-600" />
        Service Request Information
      </h4>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          onChange={(e) => onChange("name", e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          onChange={(e) => onChange("phone", e.target.value)}
          required
        />
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          onChange={(e) => onChange("urgency", e.target.value)}
        >
          <option value="">Request Urgency</option>
          <option value="immediate">Immediate (Within 1 Week)</option>
          <option value="soon">Soon (Within 2-4 Weeks)</option>
          <option value="flexible">Flexible Timeline</option>
        </select>
      </div>
    </div>

    <textarea
      placeholder="Additional details about your service request..."
      rows={4}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      onChange={(e) => onChange("details", e.target.value)}
    />

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
    >
      <Send className="w-5 h-5 mr-2" />
      Submit Service Request
    </button>
  </form>
);

const ClinicalObservationForm = ({
  onSubmit,
  onChange,
}: {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Eye className="w-5 h-5 mr-2 text-orange-600" />
        Observer Information
      </h4>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          onChange={(e) => onChange("name", e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Institution/Organization"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          onChange={(e) => onChange("institution", e.target.value)}
        />
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          onChange={(e) => onChange("role", e.target.value)}
        >
          <option value="">Your Role *</option>
          <option value="student">Student</option>
          <option value="researcher">Researcher</option>
          <option value="therapist">Music Therapist</option>
          <option value="healthcare">Healthcare Professional</option>
        </select>
      </div>
    </div>

    <textarea
      placeholder="Purpose of observation and any specific learning objectives..."
      rows={4}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      onChange={(e) => onChange("purpose", e.target.value)}
    />

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
    >
      <Eye className="w-5 h-5 mr-2" />
      Request Clinical Observation
    </button>
  </form>
);

export default TherapyProgramPage;
