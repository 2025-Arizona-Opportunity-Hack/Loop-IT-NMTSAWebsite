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
  User,
  Building,
  Briefcase,
  Mail,
  Phone,
  Calendar,
  UserCheck,
  Info,
} from "lucide-react";

const ProfessionalDevelopmentPage = () => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let submissionData;

      if (selectedForm === "consultation") {
        submissionData = {
          form_type: "consultation",
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          message: formData.consultationDescription || "Professional development consultation request",
          metadata: {
            formType: "professional_development_consultation",
            contactInfo: {
              fullName: formData.fullName,
              organization: formData.organization,
              jobTitle: formData.jobTitle,
              email: formData.email,
              phone: formData.phone,
            },
            consultationDetails: {
              consultationType: formData.consultationType,
              consultationTypeOther: formData.consultationTypeOther,
              description: formData.consultationDescription,
              preferredFormat: formData.preferredFormat,
              preferredDates: formData.preferredDates,
              numberOfParticipants: formData.numberOfParticipants,
            },
            additionalInfo: {
              previouslyAttended: formData.previouslyAttended,
              howDidYouHear: formData.howDidYouHear,
              howDidYouHearOther: formData.howDidYouHearOther,
              additionalNotes: formData.additionalNotes,
            },
          },
        };
      } else if (selectedForm === "presentation") {
        submissionData = {
          form_type: "consultation",
          name: formData.contactPersonName,
          email: formData.email,
          phone: formData.phone,
          message: formData.specificGoals || "NMT Presentation request",
          metadata: {
            formType: "nmt_presentation_request",
            contactInfo: {
              organizationName: formData.organizationName,
              contactPersonName: formData.contactPersonName,
              titleRole: formData.titleRole,
              email: formData.email,
              phone: formData.phone,
              organizationWebsite: formData.organizationWebsite,
            },
            presentationDetails: {
              presentationType: formData.presentationType,
              presentationTypeCustom: formData.presentationTypeCustom,
              preferredFormat: formData.preferredFormat,
              preferredDates: formData.preferredDates,
              preferredTimeOfDay: formData.preferredTimeOfDay,
              presentationLength: formData.presentationLength,
              presentationLengthOther: formData.presentationLengthOther,
              expectedAudienceSize: formData.expectedAudienceSize,
              audienceTypes: formData.audienceTypes || [],
              audienceTypeOther: formData.audienceTypeOther,
            },
            locationLogistics: {
              presentationLocation: formData.presentationLocation,
              address: formData.address,
              availableEquipment: formData.availableEquipment || [],
              availableEquipmentOther: formData.availableEquipmentOther,
            },
            additionalInfo: {
              specificGoals: formData.specificGoals,
              howDidYouHear: formData.howDidYouHearPresentation,
              howDidYouHearOther: formData.howDidYouHearPresentationOther,
              budgetHonorarium: formData.budgetHonorarium,
            },
            consent: {
              consentToContact: formData.consentToContact,
              electronicSignature: formData.electronicSignature,
              date: formData.signatureDate || new Date().toISOString().split('T')[0],
            },
          },
        };
      }

      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit form");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);

      alert(
        "Thank you! Your professional development request has been submitted successfully. We will contact you within 24 hours."
      );
      setSelectedForm(null);
      setFormData({});
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        error instanceof Error
          ? `Error: ${error.message}`
          : "Failed to submit form. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
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
                  onClick={() => setSelectedForm(program.formType)}
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl z-10">
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
            <div className="p-6 max-h-[calc(90vh-100px)] overflow-y-auto">
              {selectedForm === "consultation" && (
                <ConsultationForm
                  onSubmit={handleFormSubmit}
                  onChange={handleInputChange}
                  isSubmitting={isSubmitting}
                />
              )}
              {selectedForm === "presentation" && (
                <PresentationForm
                  onSubmit={handleFormSubmit}
                  onChange={handleInputChange}
                  isSubmitting={isSubmitting}
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
  isSubmitting = false,
}: {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
  isSubmitting?: boolean;
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Section 1: Contact Information */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-indigo-600" />
          Contact Information
        </h4>
        <div className="space-y-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-1 text-indigo-500" />
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onChange={(e) => onChange("fullName", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Building className="w-4 h-4 mr-1 text-indigo-500" />
              Organization / Institution *
            </label>
            <input
              type="text"
              placeholder="Organization or Institution"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onChange={(e) => onChange("organization", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="w-4 h-4 mr-1 text-indigo-500" />
              Job Title or Role
            </label>
            <input
              type="text"
              placeholder="Job Title or Role (Optional)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onChange={(e) => onChange("jobTitle", e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-1 text-indigo-500" />
                Email *
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={(e) => onChange("email", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-1 text-indigo-500" />
                Phone Number *
              </label>
              <input
                type="tel"
                placeholder="(555) 123-4567"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={(e) => onChange("phone", e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Consultation Details */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
          Consultation Details
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <FileText className="w-4 h-4 mr-1 text-green-500" />
              Type of Consultation Requested *
            </label>
            <div className="space-y-2">
              {[
                'Professional Training or Workshop',
                'Clinical Observation Visit',
                'Guest Lecture / Presentation',
                'Research Collaboration',
              ].map((type) => (
                <label key={type} className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-white/50 rounded-lg transition-colors">
                  <input
                    type="radio"
                    name="consultationType"
                    className="w-5 h-5 text-green-600 border-gray-300 focus:ring-2 focus:ring-green-500"
                    onChange={() => onChange("consultationType", type)}
                  />
                  <span className="text-gray-700">{type}</span>
                </label>
              ))}
              <div className="flex items-center space-x-3 p-3">
                <input
                  type="radio"
                  name="consultationType"
                  className="w-5 h-5 text-green-600 border-gray-300 focus:ring-2 focus:ring-green-500"
                  onChange={() => onChange("consultationType", "Other")}
                />
                <input
                  type="text"
                  placeholder="Other (please specify)"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  onChange={(e) => onChange("consultationTypeOther", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Target className="w-4 h-4 mr-1 text-green-500" />
              Consultation Description *
            </label>
            <textarea
              placeholder="Briefly describe what you are seeking to learn or accomplish through this consultation..."
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onChange={(e) => onChange("consultationDescription", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <MapPin className="w-4 h-4 mr-1 text-green-500" />
              Preferred Format *
            </label>
            <div className="space-y-2">
              {[
                'In-person (at NMTSA)',
                'Virtual (Zoom/Teams)',
                'Either',
              ].map((format) => (
                <label key={format} className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-white/50 rounded-lg transition-colors">
                  <input
                    type="radio"
                    name="preferredFormat"
                    className="w-5 h-5 text-green-600 border-gray-300 focus:ring-2 focus:ring-green-500"
                    onChange={() => onChange("preferredFormat", format)}
                  />
                  <span className="text-gray-700">{format}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 mr-1 text-green-500" />
              Preferred Date(s) or Time Frame
            </label>
            <input
              type="text"
              placeholder="e.g., Week of March 15th, Flexible in April, etc."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onChange={(e) => onChange("preferredDates", e.target.value)}
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 mr-1 text-green-500" />
              Estimated Number of Participants (if group)
            </label>
            <input
              type="text"
              placeholder="e.g., 10-15 participants"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onChange={(e) => onChange("numberOfParticipants", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Section 3: Additional Information */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Info className="w-5 h-5 mr-2 text-purple-600" />
          Additional Information
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <UserCheck className="w-4 h-4 mr-1 text-purple-500" />
              Have you previously attended any NMTSA trainings or events? *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-white/50 rounded-lg transition-colors flex-1">
                <input
                  type="radio"
                  name="previouslyAttended"
                  className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-2 focus:ring-purple-500"
                  onChange={() => onChange("previouslyAttended", "Yes")}
                />
                <span className="text-gray-700">Yes</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-white/50 rounded-lg transition-colors flex-1">
                <input
                  type="radio"
                  name="previouslyAttended"
                  className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-2 focus:ring-purple-500"
                  onChange={() => onChange("previouslyAttended", "No")}
                />
                <span className="text-gray-700">No</span>
              </label>
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <Lightbulb className="w-4 h-4 mr-1 text-purple-500" />
              How did you hear about this consultation opportunity? *
            </label>
            <div className="space-y-2">
              {[
                'NMTSA Website',
                'Referral / Colleague',
                'University Program',
                'Social Media',
              ].map((source) => (
                <label key={source} className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-white/50 rounded-lg transition-colors">
                  <input
                    type="radio"
                    name="howDidYouHear"
                    className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-2 focus:ring-purple-500"
                    onChange={() => onChange("howDidYouHear", source)}
                  />
                  <span className="text-gray-700">{source}</span>
                </label>
              ))}
              <div className="flex items-center space-x-3 p-3">
                <input
                  type="radio"
                  name="howDidYouHear"
                  className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-2 focus:ring-purple-500"
                  onChange={() => onChange("howDidYouHear", "Other")}
                />
                <input
                  type="text"
                  placeholder="Other (please specify)"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onChange={(e) => onChange("howDidYouHearOther", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 mr-1 text-purple-500" />
              Additional Notes or Questions
            </label>
            <textarea
              placeholder="Any additional notes or questions..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onChange={(e) => onChange("additionalNotes", e.target.value)}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center ${
          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Submit Consultation Request
          </>
        )}
      </button>
    </form>
  );
};

const PresentationForm = ({
  onSubmit,
  onChange,
  isSubmitting = false,
}: {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
  isSubmitting?: boolean;
}) => {
  const [selectedAudienceTypes, setSelectedAudienceTypes] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  const handleCheckboxChange = (category: string, value: string, checked: boolean) => {
    if (category === 'audienceType') {
      const updated = checked 
        ? [...selectedAudienceTypes, value]
        : selectedAudienceTypes.filter(t => t !== value);
      setSelectedAudienceTypes(updated);
      onChange('audienceTypes', updated);
    } else if (category === 'equipment') {
      const updated = checked
        ? [...selectedEquipment, value]
        : selectedEquipment.filter(e => e !== value);
      setSelectedEquipment(updated);
      onChange('availableEquipment', updated);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Section 1: Contact Information */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Building className="w-5 h-5 mr-2 text-rose-600" />
          Contact Information
        </h4>
        <div className="space-y-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Building className="w-4 h-4 mr-1 text-rose-500" />
              Organization / Group Name *
            </label>
            <input
              type="text"
              placeholder="Organization or Group Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              onChange={(e) => onChange("organizationName", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-1 text-rose-500" />
              Contact Person&apos;s Full Name *
            </label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              onChange={(e) => onChange("contactPersonName", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="w-4 h-4 mr-1 text-rose-500" />
              Title / Role
            </label>
            <input
              type="text"
              placeholder="Title or Role (Optional)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              onChange={(e) => onChange("titleRole", e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-1 text-rose-500" />
                Email Address *
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                onChange={(e) => onChange("email", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-1 text-rose-500" />
                Phone Number *
              </label>
              <input
                type="tel"
                placeholder="(555) 123-4567"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                onChange={(e) => onChange("phone", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Network className="w-4 h-4 mr-1 text-rose-500" />
              Organization Website or Social Media
            </label>
            <input
              type="text"
              placeholder="https://example.com or @socialmedia"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              onChange={(e) => onChange("organizationWebsite", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Presentation Details */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Presentation className="w-5 h-5 mr-2 text-blue-600" />
          Presentation Details
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <FileText className="w-4 h-4 mr-1 text-blue-500" />
              Type of Presentation Requested *
            </label>
            <div className="space-y-2">
              {[
                'Introduction to Neurologic Music Therapy',
                'Autism & Communication Through Music',
                'NMT for Stroke and Brain Injury Rehabilitation',
                'NMT in Schools / Inclusive Classrooms',
                'Adaptive Music Lessons Overview',
              ].map((type) => (
                <label key={type} className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-white/50 rounded-lg transition-colors">
                  <input
                    type="radio"
                    name="presentationType"
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                    onChange={() => onChange("presentationType", type)}
                  />
                  <span className="text-gray-700">{type}</span>
                </label>
              ))}
              <div className="flex items-center space-x-3 p-3">
                <input
                  type="radio"
                  name="presentationType"
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  onChange={() => onChange("presentationType", "Custom Topic")}
                />
                <input
                  type="text"
                  placeholder="Custom Topic (please specify)"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={(e) => onChange("presentationTypeCustom", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                Preferred Format *
              </label>
              <div className="space-y-2">
                {['In-person', 'Virtual (Zoom/Teams)', 'Either'].map((format) => (
                  <label key={format} className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-white/50 rounded-lg transition-colors">
                    <input
                      type="radio"
                      name="preferredFormat"
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                      onChange={() => onChange("preferredFormat", format)}
                    />
                    <span className="text-gray-700">{format}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                <Clock className="w-4 h-4 mr-1 text-blue-500" />
                Preferred Time of Day *
              </label>
              <div className="space-y-2">
                {['Morning', 'Afternoon', 'Evening', 'Flexible'].map((time) => (
                  <label key={time} className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-white/50 rounded-lg transition-colors">
                    <input
                      type="radio"
                      name="preferredTimeOfDay"
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                      onChange={() => onChange("preferredTimeOfDay", time)}
                    />
                    <span className="text-gray-700">{time}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 mr-1 text-blue-500" />
              Preferred Date(s) or Time Frame *
            </label>
            <input
              type="text"
              placeholder="e.g., Week of March 15th, April 10-20, Flexible in May"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => onChange("preferredDates", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <Clock className="w-4 h-4 mr-1 text-blue-500" />
              Presentation Length Requested *
            </label>
            <div className="space-y-2">
              {['30 minutes', '45 minutes', '60 minutes'].map((length) => (
                <label key={length} className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-white/50 rounded-lg transition-colors">
                  <input
                    type="radio"
                    name="presentationLength"
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                    onChange={() => onChange("presentationLength", length)}
                  />
                  <span className="text-gray-700">{length}</span>
                </label>
              ))}
              <div className="flex items-center space-x-3 p-3">
                <input
                  type="radio"
                  name="presentationLength"
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  onChange={() => onChange("presentationLength", "Other")}
                />
                <input
                  type="text"
                  placeholder="Other (please specify)"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={(e) => onChange("presentationLengthOther", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 mr-1 text-blue-500" />
              Expected Audience Size
            </label>
            <input
              type="text"
              placeholder="e.g., 20-30 people, 100+, etc."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => onChange("expectedAudienceSize", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Users className="w-4 h-4 mr-1 text-blue-500" />
              Audience Type (check all that apply)
            </label>
            <div className="space-y-2">
              {[
                'Educators / School Staff',
                'Healthcare Professionals',
                'University / Students',
                'Parents / Caregivers',
                'Community Organization',
              ].map((type) => (
                <label key={type} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-white/50 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => handleCheckboxChange('audienceType', type, e.target.checked)}
                  />
                  <span className="text-gray-700">{type}</span>
                </label>
              ))}
              <input
                type="text"
                placeholder="Other (please specify)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
                onChange={(e) => onChange("audienceTypeOther", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Location & Logistics */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-green-600" />
          Location & Logistics
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 mr-1 text-green-500" />
              Presentation Location *
            </label>
            <input
              type="text"
              placeholder="Venue name or virtual platform (e.g., Zoom, Microsoft Teams)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onChange={(e) => onChange("presentationLocation", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Building className="w-4 h-4 mr-1 text-green-500" />
              Address (if in-person)
            </label>
            <textarea
              placeholder="Street address, City, State, ZIP"
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onChange={(e) => onChange("address", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Award className="w-4 h-4 mr-1 text-green-500" />
              Available Equipment or A/V Resources
            </label>
            <div className="space-y-2">
              {[
                'Projector / Screen',
                'Speakers / Sound System',
                'Microphone',
                'Piano / Keyboard',
                'None',
              ].map((equipment) => (
                <label key={equipment} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-white/50 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                    onChange={(e) => handleCheckboxChange('equipment', equipment, e.target.checked)}
                  />
                  <span className="text-gray-700">{equipment}</span>
                </label>
              ))}
              <input
                type="text"
                placeholder="Other (please specify)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mt-2"
                onChange={(e) => onChange("availableEquipmentOther", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Additional Information */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Info className="w-5 h-5 mr-2 text-purple-600" />
          Additional Information
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Target className="w-4 h-4 mr-1 text-purple-500" />
              Specific Goals or Topics You&apos;d Like Covered
            </label>
            <textarea
              placeholder="Please describe any specific goals or topics you'd like covered in the presentation..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onChange={(e) => onChange("specificGoals", e.target.value)}
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <Lightbulb className="w-4 h-4 mr-1 text-purple-500" />
              How did you hear about NMTSA or our presentations? *
            </label>
            <div className="space-y-2">
              {['Website', 'Referral / Colleague', 'Social Media', 'Past Training'].map((source) => (
                <label key={source} className="flex items-center space-x-3 cursor-pointer p-3 hover:bg-white/50 rounded-lg transition-colors">
                  <input
                    type="radio"
                    name="howDidYouHearPresentation"
                    className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-2 focus:ring-purple-500"
                    onChange={() => onChange("howDidYouHearPresentation", source)}
                  />
                  <span className="text-gray-700">{source}</span>
                </label>
              ))}
              <div className="flex items-center space-x-3 p-3">
                <input
                  type="radio"
                  name="howDidYouHearPresentation"
                  className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-2 focus:ring-purple-500"
                  onChange={() => onChange("howDidYouHearPresentation", "Other")}
                />
                <input
                  type="text"
                  placeholder="Other (please specify)"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onChange={(e) => onChange("howDidYouHearPresentationOther", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 mr-1 text-purple-500" />
              Budget or Honorarium (if applicable)
            </label>
            <input
              type="text"
              placeholder="e.g., $500, Volunteer, To be discussed"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onChange={(e) => onChange("budgetHonorarium", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Section 5: Consent & Submission */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <UserCheck className="w-5 h-5 mr-2 text-orange-600" />
          Consent & Submission
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-start space-x-3 cursor-pointer p-3 bg-white rounded-lg">
              <input
                type="checkbox"
                className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-2 focus:ring-orange-500 mt-0.5"
                onChange={(e) => onChange("consentToContact", e.target.checked)}
                required
              />
              <span className="text-gray-700 text-sm">
                <strong>Consent to Contact:</strong> I authorize NMTSA staff to contact me to schedule this presentation. *
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-1 text-orange-500" />
              Electronic Signature (type full name) *
            </label>
            <input
              type="text"
              placeholder="Type your full name as signature"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              onChange={(e) => onChange("electronicSignature", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 mr-1 text-orange-500" />
              Date *
            </label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              onChange={(e) => onChange("signatureDate", e.target.value)}
              defaultValue={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center ${
          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Submit Presentation Request
          </>
        )}
      </button>
    </form>
  );
};

export default ProfessionalDevelopmentPage;
