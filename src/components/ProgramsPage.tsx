"use client";

import { useState } from "react";
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
  Send,
  Calendar,
  FileText,
  Eye,
  Briefcase,
  MessageSquare,
  Presentation,
  School,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const ProgramsPage = () => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [expandedPrograms, setExpandedPrograms] = useState<
    Record<string, boolean>
  >({});

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
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

  const toggleProgram = (programId: string) => {
    setExpandedPrograms((prev) => ({
      ...prev,
      [programId]: !prev[programId],
    }));
  };
  const programs = [
    {
      id: "therapy",
      icon: User,
      title: "Therapy Program",
      description:
        "Comprehensive neurologic music therapy sessions tailored to individual needs and conditions.",
      features: [
        "Individual & group therapy sessions",
        "Evidence-based NMT interventions",
        "Personalized treatment plans",
        "Progress tracking and assessment",
        "Family consultation included",
      ],
      color: "from-blue-600 to-purple-600",
      ageRange: "18 months - 90+ years",
      duration: "30-90 minutes",
      frequency: "Weekly or bi-weekly",
      hasSubPrograms: true,
      subPrograms: [
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
          color: "from-blue-500 to-indigo-600",
          ageRange: "All ages welcome",
          duration: "Variable",
          frequency: "As needed",
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
          color: "from-amber-500 to-orange-600",
          ageRange: "Students & professionals",
          duration: "2-8 hours",
          frequency: "Scheduled sessions",
          formType: "observation",
        },
      ],
    },
    {
      id: "lessons",
      icon: Music,
      title: "Adapted Music Lessons",
      description:
        "Specialized private music lessons designed for individuals with disabilities and special needs.",
      features: [
        "Instrument-specific instruction",
        "Adaptive learning techniques",
        "Performance opportunities",
        "Recreational music making",
        "Individual & group options",
      ],
      color: "from-pink-500 to-rose-600",
      ageRange: "5 years and up",
      duration: "30-45 minutes",
      frequency: "Weekly lessons",
      formType: "lessons",
      hasSubPrograms: false,
    },
    {
      id: "professional",
      icon: GraduationCap,
      title: "Professional Development Opportunities",
      description:
        "Advanced training and consultation services for healthcare professionals and organizations.",
      features: [
        "Continuing education courses",
        "Professional consultation services",
        "Certification training programs",
        "Research collaboration",
        "Best practice workshops",
      ],
      color: "from-emerald-600 to-teal-600",
      ageRange: "Healthcare professionals",
      duration: "Variable",
      frequency: "On-demand",
      hasSubPrograms: true,
      subPrograms: [
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
          color: "from-indigo-600 to-blue-700",
          ageRange: "All stakeholders",
          duration: "60-120 minutes",
          frequency: "As requested",
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
          color: "from-violet-600 to-purple-700",
          ageRange: "General public",
          duration: "60-180 minutes",
          frequency: "Scheduled events",
          formType: "presentation",
        },
      ],
    },
    {
      id: "community",
      icon: School,
      title: "Community Education Program",
      description:
        "Comprehensive community education focused on positive behavioral and communication supports.",
      features: [
        "Community workshops",
        "Public awareness campaigns",
        "Advocacy training sessions",
        "Family education programs",
        "Professional networking events",
      ],
      color: "from-green-600 to-lime-600",
      ageRange: "Community members",
      duration: "2-6 hours",
      frequency: "Monthly programs",
      formType: "community",
      hasSubPrograms: false,
    },
  ];

  const conditions = [
    "ADHD",
    "Autism",
    "Cerebral Palsy",
    "Down's Syndrome",
    "Epilepsy",
    "Neurodevelopmental Disorder",
    "Parkinson's Disease",
    "Stroke",
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
          <div>
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
          </div>
        </div>
      </section>

      {/* Programs Hierarchical Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {programs.map((program, index) => (
              <div key={program.id} className="space-y-4">
                {/* Main Program Card */}
                <div className="glass-card p-8 rounded-2xl group relative">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-6">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${program.color} rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <program.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 font-poppins">
                            {program.title}
                          </h3>
                          {program.hasSubPrograms && (
                            <p className="text-sm text-gray-500 mt-1">
                              Click to view sub-programs
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {program.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-3">
                          {program.features.slice(0, 3).map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                        <div className="space-y-3">
                          {program.features.slice(3).map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4 mb-6">
                        <div className="grid md:grid-cols-3 gap-4">
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
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Link
                      href={`/programs/${
                        program.id === "therapy"
                          ? "therapy"
                          : program.id === "lessons"
                          ? "music-lessons"
                          : program.id === "professional"
                          ? "professional-development"
                          : "community-education"
                      }`}
                      className={`flex-1 bg-gradient-to-r ${program.color} text-white font-semibold py-3 px-6 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center text-center`}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View {program.title}
                    </Link>
                  </div>
                </div>

                {/* Sub-Programs */}
                {program.hasSubPrograms && expandedPrograms[program.id] && (
                  <div className="ml-8 space-y-4 animate-in slide-in-from-top-4 duration-300">
                    <div className="grid md:grid-cols-2 gap-6">
                      {program.subPrograms?.map((subProgram, subIndex) => (
                        <div
                          key={subProgram.id}
                          className="glass-card p-6 rounded-xl border-l-4 border-l-gray-300 hover:border-l-gray-500 transition-all duration-300"
                        >
                          <div className="flex items-center mb-4">
                            <div
                              className={`w-12 h-12 bg-gradient-to-r ${subProgram.color} rounded-xl flex items-center justify-center mr-3`}
                            >
                              <subProgram.icon className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 font-poppins">
                              {subProgram.title}
                            </h4>
                          </div>

                          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                            {subProgram.description}
                          </p>

                          <div className="space-y-2 mb-4">
                            {subProgram.features
                              .slice(0, 3)
                              .map((feature, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center text-xs text-gray-600"
                                >
                                  <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                  {feature}
                                </div>
                              ))}
                          </div>

                          <div className="border-t border-gray-200 pt-3 mb-4">
                            <div className="space-y-1">
                              <div className="flex items-center text-xs text-gray-500">
                                <User className="w-3 h-3 mr-2" />
                                {subProgram.ageRange}
                              </div>
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="w-3 h-3 mr-2" />
                                {subProgram.duration}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              alert(
                                "Link generated! Your form access link has been created and will be available shortly."
                              );
                            }}
                            className={`w-full bg-gradient-to-r ${subProgram.color} text-white font-medium py-2 px-4 rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105 flex items-center justify-center text-sm`}
                          >
                            <FileText className="w-3 h-3 mr-2" />
                            Access Form
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions We Treat */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
              Conditions We <span className="gradient-text">Treat</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced music therapists work with individuals across a
              wide range of neurologic conditions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {conditions.map((condition, index) => (
              <div
                key={condition}
                className="glass-card p-6 rounded-xl text-center"
              >
                <h3 className="font-semibold text-gray-900">{condition}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How we create personalized music therapy experiences
            </p>
          </div>

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
              <div key={process.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-nmtsa-500 to-nmtsa-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">
                    {process.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">
                  {process.title}
                </h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-nmtsa-500 to-nmtsa-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
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
                className="btn-primary bg-white text-black-600 font-semibold px-8 py-4 rounded-full inline-flex items-center justify-center text-lg hover:bg-nmtsa-50 transition-colors"
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
          </div>
        </div>
      </section>

      {/* Dynamic Forms Modal */}
      {selectedForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-2xl font-bold text-gray-900 font-poppins">
                {programs.find((p) => p.formType === selectedForm)?.title} Form
              </h3>
              <button
                onClick={closeForm}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {selectedForm === "therapy" && (
                <TherapyForm
                  onSubmit={handleFormSubmit}
                  onChange={handleInputChange}
                />
              )}
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
              {selectedForm === "lessons" && (
                <MusicLessonsForm
                  onSubmit={handleFormSubmit}
                  onChange={handleInputChange}
                />
              )}
              {selectedForm === "professional" && (
                <ProfessionalDevForm
                  onSubmit={handleFormSubmit}
                  onChange={handleInputChange}
                />
              )}
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
              {selectedForm === "community" && (
                <CommunityEducationForm
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

// Creative Form Components
const TherapyForm = ({
  onSubmit,
  onChange,
}: {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <User className="w-5 h-5 mr-2 text-blue-600" />
        Personal Information
      </h4>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("name", e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date of Birth"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("dob", e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("phone", e.target.value)}
          required
        />
      </div>
    </div>

    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <HeartHandshake className="w-5 h-5 mr-2 text-purple-600" />
        Therapy Needs
      </h4>
      <div className="space-y-4">
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("therapyType", e.target.value)}
        >
          <option value="">Select Therapy Type *</option>
          <option value="individual">Individual Therapy</option>
          <option value="group">Group Therapy</option>
          <option value="family">Family Therapy</option>
        </select>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("condition", e.target.value)}
        >
          <option value="">Primary Condition/Diagnosis</option>
          <option value="adhd">ADHD</option>
          <option value="autism">Autism</option>
          <option value="cerebral-palsy">Cerebral Palsy</option>
          <option value="downs-syndrome">Down&apos;s Syndrome</option>
          <option value="epilepsy">Epilepsy</option>
          <option value="neurodevelopmental">
            Neurodevelopmental Disorder
          </option>
          <option value="parkinsons">Parkinson&apos;s Disease</option>
          <option value="stroke">Stroke</option>
          <option value="tbi">Traumatic Brain Injury</option>
          <option value="other">Other</option>
        </select>
        <textarea
          placeholder="Describe your therapy goals and any specific needs..."
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("goals", e.target.value)}
        />
      </div>
    </div>

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
    >
      <Send className="w-5 h-5 mr-2" />
      Submit Therapy Request
    </button>
  </form>
);

const RequestServiceForm = ({
  onSubmit,
  onChange,
}: {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Phone className="w-5 h-5 mr-2 text-blue-600" />
        Service Request Information
      </h4>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("name", e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("phone", e.target.value)}
          required
        />
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("urgency", e.target.value)}
        >
          <option value="">Request Urgency</option>
          <option value="immediate">Immediate (Within 1 Week)</option>
          <option value="soon">Soon (Within 2-4 Weeks)</option>
          <option value="flexible">Flexible Timeline</option>
        </select>
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">
        Services Needed (Check all that apply)
      </h4>
      <div className="grid md:grid-cols-2 gap-3">
        {[
          "Individual Therapy",
          "Group Therapy",
          "Music Lessons",
          "Assessment",
          "Consultation",
          "Family Support",
        ].map((service) => (
          <label
            key={service}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <input
              type="checkbox"
              className="w-4 h-4 text-nmtsa-600 border-gray-300 rounded focus:ring-blue-500"
              onChange={(e) =>
                onChange(
                  `service_${service.toLowerCase().replace(" ", "_")}`,
                  e.target.checked
                )
              }
            />
            <span className="text-gray-700">{service}</span>
          </label>
        ))}
      </div>
    </div>

    <textarea
      placeholder="Additional details about your service request..."
      rows={4}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      onChange={(e) => onChange("details", e.target.value)}
    />

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
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
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Eye className="w-5 h-5 mr-2 text-amber-600" />
        Observer Information
      </h4>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("name", e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Institution/Organization"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("institution", e.target.value)}
        />
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("role", e.target.value)}
        >
          <option value="">Your Role *</option>
          <option value="student">Student</option>
          <option value="researcher">Researcher</option>
          <option value="therapist">Music Therapist</option>
          <option value="healthcare">Healthcare Professional</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900">
        Observation Preferences
      </h4>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="date"
          placeholder="Preferred Date"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("preferredDate", e.target.value)}
        />
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("duration", e.target.value)}
        >
          <option value="">Observation Duration</option>
          <option value="2hours">2 Hours</option>
          <option value="4hours">4 Hours</option>
          <option value="fullday">Full Day (8 Hours)</option>
        </select>
      </div>
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">
          Areas of Interest (Check all that apply)
        </label>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            "Individual Therapy",
            "Group Sessions",
            "Assessment",
            "Family Counseling",
            "Documentation",
            "Treatment Planning",
          ].map((area) => (
            <label
              key={area}
              className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-blue-500"
                onChange={(e) =>
                  onChange(
                    `interest_${area.toLowerCase().replace(" ", "_")}`,
                    e.target.checked
                  )
                }
              />
              <span className="text-sm text-gray-700">{area}</span>
            </label>
          ))}
        </div>
      </div>
    </div>

    <textarea
      placeholder="Purpose of observation and any specific learning objectives..."
      rows={4}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      onChange={(e) => onChange("purpose", e.target.value)}
    />

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
    >
      <Eye className="w-5 h-5 mr-2" />
      Request Clinical Observation
    </button>
  </form>
);

const MusicLessonsForm = ({
  onSubmit,
  onChange,
}: {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Music className="w-5 h-5 mr-2 text-pink-600" />
        Student Information
      </h4>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Student Name *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("studentName", e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          min="5"
          max="100"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("age", e.target.value)}
        />
        <input
          type="text"
          placeholder="Parent/Guardian Name *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("parentName", e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Contact Email *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900">
        Lesson Preferences
      </h4>
      <div className="grid md:grid-cols-2 gap-4">
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("instrument", e.target.value)}
        >
          <option value="">Preferred Instrument *</option>
          <option value="piano">Piano</option>
          <option value="guitar">Guitar</option>
          <option value="voice">Voice/Singing</option>
          <option value="drums">Drums/Percussion</option>
          <option value="ukulele">Ukulele</option>
          <option value="other">Other</option>
        </select>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("experience", e.target.value)}
        >
          <option value="">Experience Level</option>
          <option value="beginner">Beginner</option>
          <option value="some">Some Experience</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">
          Any disabilities or special needs we should know about?
        </label>
        <textarea
          placeholder="Please describe any accommodations needed..."
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("accommodations", e.target.value)}
        />
      </div>
    </div>

    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">
        Preferred Lesson Times (Check all that apply)
      </label>
      <div className="grid md:grid-cols-4 gap-3">
        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((day) => (
          <label
            key={day}
            className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <input
              type="checkbox"
              className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-blue-500"
              onChange={(e) =>
                onChange(`day_${day.toLowerCase()}`, e.target.checked)
              }
            />
            <span className="text-sm text-gray-700">{day}</span>
          </label>
        ))}
      </div>
    </div>

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
    >
      <Music className="w-5 h-5 mr-2" />
      Request Music Lessons
    </button>
  </form>
);

const ProfessionalDevForm = ({
  onSubmit,
  onChange,
}: {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Briefcase className="w-5 h-5 mr-2 text-emerald-600" />
        Professional Information
      </h4>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("name", e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Professional Title *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("title", e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Organization/Institution"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("organization", e.target.value)}
        />
        <input
          type="email"
          placeholder="Professional Email *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900">Areas of Interest</h4>
      <div className="grid md:grid-cols-2 gap-3">
        {[
          "Continuing Education",
          "Certification Training",
          "Research Collaboration",
          "Consultation Services",
          "Workshop Facilitation",
          "Mentorship",
        ].map((area) => (
          <label
            key={area}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <input
              type="checkbox"
              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-blue-500"
              onChange={(e) =>
                onChange(
                  `interest_${area.toLowerCase().replace(" ", "_")}`,
                  e.target.checked
                )
              }
            />
            <span className="text-gray-700">{area}</span>
          </label>
        ))}
      </div>
    </div>

    <div className="space-y-4">
      <select
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={(e) => onChange("experience", e.target.value)}
      >
        <option value="">Years of Experience</option>
        <option value="0-2">0-2 Years</option>
        <option value="3-5">3-5 Years</option>
        <option value="6-10">6-10 Years</option>
        <option value="10+">10+ Years</option>
      </select>
      <textarea
        placeholder="Describe your professional development goals and interests..."
        rows={4}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={(e) => onChange("goals", e.target.value)}
      />
    </div>

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
    >
      <GraduationCap className="w-5 h-5 mr-2" />
      Request Professional Development
    </button>
  </form>
);

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
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("name", e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Organization (if applicable)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("organization", e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          "Organizational Training",
        ].map((type) => (
          <label
            key={type}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <input
              type="radio"
              name="consultationType"
              className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-blue-500"
              onChange={() => onChange("consultationType", type)}
            />
            <span className="text-gray-700">{type}</span>
          </label>
        ))}
      </div>
    </div>

    <div className="space-y-4">
      <select
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={(e) => onChange("urgency", e.target.value)}
      >
        <option value="">Timeline Needed</option>
        <option value="immediate">Within 1 Week</option>
        <option value="soon">Within 2-4 Weeks</option>
        <option value="flexible">Flexible</option>
      </select>
      <textarea
        placeholder="Please provide details about your consultation needs, specific challenges, and desired outcomes..."
        rows={5}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={(e) => onChange("details", e.target.value)}
        required
      />
    </div>

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-indigo-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
    >
      <MessageSquare className="w-5 h-5 mr-2" />
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
    <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-xl">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Presentation className="w-5 h-5 mr-2 text-violet-600" />
        Presentation Request
      </h4>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Contact Name *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("name", e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Organization/Event *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("organization", e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("phone", e.target.value)}
        />
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900">Event Details</h4>
      <div className="grid md:grid-cols-3 gap-4">
        <input
          type="date"
          placeholder="Event Date"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("eventDate", e.target.value)}
        />
        <input
          type="time"
          placeholder="Start Time"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("startTime", e.target.value)}
        />
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("duration", e.target.value)}
        >
          <option value="">Duration</option>
          <option value="30min">30 Minutes</option>
          <option value="1hour">1 Hour</option>
          <option value="90min">90 Minutes</option>
          <option value="2hours">2 Hours</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Event Location/Venue"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={(e) => onChange("location", e.target.value)}
      />
      <input
        type="number"
        placeholder="Expected Audience Size"
        min="1"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={(e) => onChange("audienceSize", e.target.value)}
      />
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
          "Research Findings",
          "Career in Music Therapy",
        ].map((topic) => (
          <label
            key={topic}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <input
              type="checkbox"
              className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-blue-500"
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
      placeholder="Additional details about your presentation needs, audience demographics, and specific requests..."
      rows={4}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      onChange={(e) => onChange("details", e.target.value)}
    />

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
    >
      <Presentation className="w-5 h-5 mr-2" />
      Request Presentation
    </button>
  </form>
);

const CommunityEducationForm = ({
  onSubmit,
  onChange,
}: {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div className="bg-gradient-to-r from-green-50 to-lime-50 p-6 rounded-xl">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <School className="w-5 h-5 mr-2 text-green-600" />
        Community Education Program
      </h4>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Contact Name *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("name", e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Organization/Group *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("organization", e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onChange("phone", e.target.value)}
        />
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900">Program Type</h4>
      <div className="space-y-3">
        {[
          "Community Workshop",
          "Public Awareness Campaign",
          "Advocacy Training",
          "Family Education Program",
          "Professional Networking Event",
        ].map((type) => (
          <label
            key={type}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <input
              type="radio"
              name="programType"
              className="w-4 h-4 text-green-600 border-gray-300 focus:ring-blue-500"
              onChange={() => onChange("programType", type)}
            />
            <span className="text-gray-700">{type}</span>
          </label>
        ))}
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900">Target Audience</h4>
      <div className="grid md:grid-cols-3 gap-3">
        {[
          "Families",
          "Caregivers",
          "Healthcare Workers",
          "Educators",
          "Community Leaders",
          "General Public",
        ].map((audience) => (
          <label
            key={audience}
            className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <input
              type="checkbox"
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-blue-500"
              onChange={(e) =>
                onChange(
                  `audience_${audience.toLowerCase().replace(" ", "_")}`,
                  e.target.checked
                )
              }
            />
            <span className="text-sm text-gray-700">{audience}</span>
          </label>
        ))}
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <input
        type="number"
        placeholder="Expected Participants"
        min="1"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={(e) => onChange("participants", e.target.value)}
      />
      <select
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={(e) => onChange("timeline", e.target.value)}
      >
        <option value="">Preferred Timeline</option>
        <option value="immediate">Within 1 Month</option>
        <option value="soon">Within 3 Months</option>
        <option value="flexible">Flexible</option>
      </select>
    </div>

    <textarea
      placeholder="Describe your community education goals, specific topics of interest, and any special requirements..."
      rows={5}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      onChange={(e) => onChange("details", e.target.value)}
      required
    />

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-green-600 to-lime-600 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
    >
      <School className="w-5 h-5 mr-2" />
      Request Community Education Program
    </button>
  </form>
);

export default ProgramsPage;
