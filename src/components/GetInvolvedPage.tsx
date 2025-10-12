"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Heart,
  Briefcase,
  UserPlus,
  ArrowRight,
  CheckCircle,
  Users,
  Clock,
  Award,
  X,
  User,
  Building,
  Mail,
  Phone,
  FileText,
  Calendar,
  Info,
} from "lucide-react";
import {
  ProgramFormModal,
  FormSection,
  TextInput,
  Textarea,
  Select,
  RadioGroup,
  CheckboxGroup,
  SubmitButton,
  Grid,
} from "@/components/programs";

const GetInvolvedPage = () => {
  const searchParams = useSearchParams();
  const [selectedInfo, setSelectedInfo] = useState<string | null>(null);
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [showInternshipForm, setShowInternshipForm] = useState(false);

  // Check for form parameter in URL on component mount
  useEffect(() => {
    const formParam = searchParams.get("form");
    if (formParam === "volunteer") {
      setShowVolunteerForm(true);
    } else if (formParam === "internship") {
      setShowInternshipForm(true);
    }
  }, [searchParams]);

  const getInvolvedOptions = [
    {
      icon: Heart,
      title: "Volunteer",
      description:
        "Make a difference in our community through meaningful volunteer work",
      detailedDescription:
        "Join our volunteer team and help support music therapy sessions, community events, and administrative tasks. No prior experience required - we provide training and ongoing support.",
      requirements: [
        "Background check required",
        "Minimum 6-month commitment",
        "Flexible scheduling available",
        "Training provided",
      ],
      benefits: [
        "Gain valuable experience in healthcare",
        "Make meaningful connections",
        "Contribute to life-changing therapy",
        "Flexible volunteer hours",
      ],
      color: "from-red-500 to-pink-600",
      link: "#volunteer",
      showModal: true,
    },
    {
      icon: Briefcase,
      title: "Internship",
      description: "Gain hands-on experience in music therapy and healthcare",
      detailedDescription:
        "Our internship program offers students and recent graduates the opportunity to work alongside experienced music therapists and gain practical experience in neurologic music therapy.",
      requirements: [
        "Currently enrolled in or recent graduate of music therapy program",
        "GPA of 3.0 or higher",
        "Available for 15-20 hours per week",
        "Strong communication skills",
      ],
      benefits: [
        "Mentorship from certified music therapists",
        "Hands-on clinical experience",
        "Professional development opportunities",
        "Potential pathway to employment",
      ],
      color: "from-blue-500 to-indigo-600",
      link: "#internship",
      showModal: true,
    },
    {
      icon: UserPlus,
      title: "Employment",
      description: "Join our professional team of music therapists",
      detailedDescription:
        "We&apos;re always looking for passionate, qualified music therapists to join our team. We offer competitive compensation, comprehensive benefits, and a supportive work environment.",
      requirements: [
        "Master&apos;s degree in Music Therapy",
        "Board certification (MT-BC)",
        "Arizona state license preferred",
        "Experience with neurologic populations preferred",
      ],
      benefits: [
        "Competitive salary and benefits",
        "Professional development support",
        "Collaborative team environment",
        "Meaningful work with lasting impact",
      ],
      color: "from-green-500 to-emerald-600",
      link: "/contact?form=employment",
      showModal: false,
    },
  ];

  const impactStats = [
    { number: "500+", label: "Volunteers Trained", icon: Users },
    { number: "50+", label: "Interns Mentored", icon: Clock },
    { number: "25+", label: "Team Members", icon: UserPlus },
    { number: "40+", label: "Years of Excellence", icon: Award },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-nmtsa-600 via-nmtsa-650 to-nmtsa-700 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

        <div className="container-responsive relative text-center">
          <h1 className="font-bold font-poppins mb-6 text-4xl sm:text-5xl lg:text-6xl pt-[50px]">
            Get <span className="text-nmtsa-200">Involved</span>
          </h1>
          <p className="text-nmtsa-100 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed mb-8">
            Join NMTSA&apos;s mission to transform lives through music therapy.
            Whether you&apos;re looking to volunteer, gain experience, or build
            a career, we have opportunities for you to make a meaningful impact.
          </p>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {impactStats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="font-bold text-2xl sm:text-3xl font-poppins mb-1">
                  {stat.number}
                </div>
                <div className="text-nmtsa-200 text-sm sm:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-responsive">
          <header className="text-center mb-12 lg:mb-16">
            <h2 className="font-bold font-poppins text-gray-900 mb-6 text-3xl sm:text-4xl lg:text-5xl">
              Opportunities to{" "}
              <span className="gradient-text">Make a Difference</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg sm:text-xl">
              Choose the path that aligns with your goals and availability
            </p>
          </header>

          <div className="grid lg:grid-cols-3 gap-8">
            {getInvolvedOptions.map((option, index) => (
              <div
                key={option.title}
                className="get-involved-card p-8 rounded-2xl transition-all duration-300 group hover:shadow-xl flex flex-col"
              >
                <div
                  onClick={() => setSelectedInfo(option.title)}
                  className="cursor-pointer flex-grow flex flex-col"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-105 shadow-lg`}
                  >
                    <option.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="font-bold text-gray-900 mb-4 font-poppins text-2xl text-center">
                    {option.title}
                  </h3>

                  <p className="text-gray-600 mb-6 text-center leading-relaxed">
                    {option.description}
                  </p>

                  <div className="space-y-4 mb-6 flex-grow">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Key Requirements
                      </h4>
                      <ul className="space-y-2">
                        {option.requirements.slice(0, 3).map((req, idx) => (
                          <li
                            key={idx}
                            className="text-gray-600 text-sm flex items-start"
                          >
                            <span className="w-1.5 h-1.5 bg-nmtsa-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="text-center text-sm text-nmtsa-600 font-medium mb-4">
                    Click for more details
                  </div>
                </div>

                <div className="text-center mt-6">
                  {option.showModal ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (option.title === "Volunteer") {
                          setShowVolunteerForm(true);
                        } else if (option.title === "Internship") {
                          setShowInternshipForm(true);
                        }
                      }}
                      className="btn-primary inline-flex items-center group/btn w-full justify-center"
                    >
                      Apply for {option.title}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <Link
                      href={option.link}
                      className="btn-primary inline-flex items-center group/btn w-full justify-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Apply for {option.title}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join NMTSA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-nmtsa-50 to-nmtsa-100">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="font-bold font-poppins text-gray-900 mb-6 text-3xl sm:text-4xl lg:text-5xl">
              Why Join <span className="gradient-text">NMTSA</span>?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg sm:text-xl">
              Be part of a team that&apos;s making a real difference in the
              lives of individuals with neurologic impairments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-nmtsa-500 to-nmtsa-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Meaningful Work
              </h3>
              <p className="text-gray-600">
                Make a direct impact on the lives of individuals and families in
                our community.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Supportive Community
              </h3>
              <p className="text-gray-600">
                Join a team of dedicated professionals who support each
                other&apos;s growth and success.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Professional Growth
              </h3>
              <p className="text-gray-600">
                Develop your skills and advance your career in the field of
                music therapy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-responsive text-center">
          <h2 className="font-bold font-poppins text-gray-900 mb-6 text-3xl sm:text-4xl lg:text-5xl">
            Do You Have More <span className="gradient-text">Questions</span>?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg sm:text-xl mb-8">
            Contact us to get more information about our volunteer and
            internship opportunities.
          </p>
          <Link href="/contact" className="btn-primary text-lg">
            Contact Us Today
          </Link>
        </div>
      </section>

      {/* Information Modal */}
      {selectedInfo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {(() => {
              const option = getInvolvedOptions.find(
                (opt) => opt.title === selectedInfo
              );
              if (!option) return null;

              return (
                <>
                  <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl z-10">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center`}
                      >
                        <option.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 font-poppins">
                        {option.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedInfo(null)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-500" />
                    </button>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Description */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-3 text-lg">
                        About This Opportunity
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {option.detailedDescription}
                      </p>
                    </div>

                    {/* Requirements and Benefits */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-green-50 p-6 rounded-xl">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-lg">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          Requirements
                        </h4>
                        <ul className="space-y-3">
                          {option.requirements.map((req, idx) => (
                            <li
                              key={idx}
                              className="text-gray-600 text-sm flex items-start"
                            >
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-blue-50 p-6 rounded-xl">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center text-lg">
                          <Award className="w-5 h-5 text-blue-500 mr-2" />
                          Benefits
                        </h4>
                        <ul className="space-y-3">
                          {option.benefits.map((benefit, idx) => (
                            <li
                              key={idx}
                              className="text-gray-600 text-sm flex items-start"
                            >
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="text-center pt-4">
                      {option.showModal ? (
                        <button
                          onClick={() => {
                            setSelectedInfo(null);
                            if (option.title === "Volunteer") {
                              setShowVolunteerForm(true);
                            } else if (option.title === "Internship") {
                              setShowInternshipForm(true);
                            }
                          }}
                          className="btn-primary inline-flex items-center group/btn text-lg px-8 py-4"
                        >
                          Apply for {option.title}
                          <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      ) : (
                        <Link
                          href={option.link}
                          className="btn-primary inline-flex items-center group/btn text-lg px-8 py-4"
                        >
                          Apply for {option.title}
                          <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Volunteer Application Form Modal */}
      <ProgramFormModal
        isOpen={showVolunteerForm}
        onClose={() => setShowVolunteerForm(false)}
        title="Volunteer Application"
        maxWidth="3xl"
      >
        <VolunteerApplicationForm onClose={() => setShowVolunteerForm(false)} />
      </ProgramFormModal>

      {/* Internship Application Form Modal */}
      <ProgramFormModal
        isOpen={showInternshipForm}
        onClose={() => setShowInternshipForm(false)}
        title="Internship Application"
        maxWidth="4xl"
      >
        <InternshipApplicationForm
          onClose={() => setShowInternshipForm(false)}
        />
      </ProgramFormModal>
    </div>
  );
};

// Volunteer Application Form Component
const VolunteerApplicationForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    jobTitle: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/volunteers/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          metadata: {
            organization: formData.organization,
            jobTitle: formData.jobTitle,
          },
          status: "pending",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      setSubmitSuccess(true);

      // Close modal after 2 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
        setFormData({
          fullName: "",
          organization: "",
          jobTitle: "",
          email: "",
          phone: "",
        });
      }, 2000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-green-900">Success!</h4>
            <p className="text-sm text-green-700">
              Thank you for your volunteer application! We&apos;ll review your
              information and get back to you within 2-3 business days.
            </p>
          </div>
        </div>
      )}

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <X className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-red-900">Error</h4>
            <p className="text-sm text-red-700">{submitError}</p>
          </div>
        </div>
      )}

      <FormSection
        title="Contact Information"
        icon={User}
        iconColor="text-red-600"
        bgGradient="from-red-50 to-pink-50"
      >
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(value) => handleChange("fullName", value)}
          required
        />

        <TextInput
          label="Organization / Institution"
          placeholder="Enter your organization or institution"
          value={formData.organization}
          onChange={(value) => handleChange("organization", value)}
          required
        />

        <TextInput
          label="Job Title or Role"
          placeholder="Enter your job title or role (optional)"
          value={formData.jobTitle}
          onChange={(value) => handleChange("jobTitle", value)}
        />

        <Grid columns={2}>
          <TextInput
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(value) => handleChange("email", value)}
            required
          />

          <TextInput
            label="Phone Number"
            type="tel"
            placeholder="(602) 123-4567"
            value={formData.phone}
            onChange={(value) => handleChange("phone", value)}
            required
          />
        </Grid>
      </FormSection>

      <SubmitButton
        isSubmitting={isSubmitting}
        text="Submit Application"
        submittingText="Submitting..."
      />
    </form>
  );
};

// Internship Application Form Component
const InternshipApplicationForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    // Section 1: Personal Information
    fullName: "",
    email: "",
    phone: "",
    address: "",
    universityName: "",
    major: "",
    academicYear: "",
    academicYearOther: "",

    // Section 2: Internship Details
    internshipTypes: [] as string[],
    internshipTypeOther: "",
    internshipTerm: "",
    startDate: "",
    endDate: "",
    hoursRequired: "",

    // Section 3: Experience & Goals
    whyInterested: "",
    learningGoals: "",
    relevantExperience: "",
    priorExperience: "",

    // Section 4: Availability & Logistics
    weeklyAvailability: "",
    academicCredit: "",
    siteAgreement: "",

    // Section 5: Consent & Signature
    consentToContact: false,
    electronicSignature: "",
    signatureDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (field: string, value: string | string[] | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/interns/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address ? { full: formData.address } : null,
          school_name: formData.universityName,
          major: formData.major,
          desired_position: formData.internshipTypes.join(", "),
          preferred_start_date: formData.startDate || null,
          preferred_end_date: formData.endDate || null,
          hours_per_week: formData.hoursRequired ? parseInt(formData.hoursRequired) : null,
          seeking_academic_credit: formData.academicCredit === "yes",
          cover_letter: formData.whyInterested,
          relevant_coursework: formData.learningGoals,
          previous_internships: formData.relevantExperience,
          work_experience: formData.priorExperience,
          metadata: {
            academicYear: formData.academicYear,
            academicYearOther: formData.academicYearOther,
            internshipTypes: formData.internshipTypes,
            internshipTypeOther: formData.internshipTypeOther,
            internshipTerm: formData.internshipTerm,
            weeklyAvailability: formData.weeklyAvailability,
            siteAgreement: formData.siteAgreement,
            consentToContact: formData.consentToContact,
            electronicSignature: formData.electronicSignature,
            signatureDate: formData.signatureDate,
          },
          status: "pending",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      setSubmitSuccess(true);

      // Close modal after 2 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          universityName: "",
          major: "",
          academicYear: "",
          academicYearOther: "",
          internshipTypes: [],
          internshipTypeOther: "",
          internshipTerm: "",
          startDate: "",
          endDate: "",
          hoursRequired: "",
          whyInterested: "",
          learningGoals: "",
          relevantExperience: "",
          priorExperience: "",
          weeklyAvailability: "",
          academicCredit: "",
          siteAgreement: "",
          consentToContact: false,
          electronicSignature: "",
          signatureDate: "",
        });
      }, 2000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-green-900">Success!</h4>
            <p className="text-sm text-green-700">
              Thank you for your internship application! We&apos;ll review your
              information and get back to you within 2-3 business days.
            </p>
          </div>
        </div>
      )}

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <X className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-red-900">Error</h4>
            <p className="text-sm text-red-700">{submitError}</p>
          </div>
        </div>
      )}

      {/* Section 1: Personal Information */}
      <FormSection
        title="Personal Information"
        icon={User}
        iconColor="text-blue-600"
        bgGradient="from-blue-50 to-indigo-50"
      >
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(value) => handleChange("fullName", value)}
          required
        />

        <Grid columns={2}>
          <TextInput
            label="Email Address"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(value) => handleChange("email", value)}
            required
          />

          <TextInput
            label="Phone Number"
            type="tel"
            placeholder="(602) 123-4567"
            value={formData.phone}
            onChange={(value) => handleChange("phone", value)}
            required
          />
        </Grid>

        <Textarea
          label="Address"
          placeholder="Enter your full address (optional)"
          rows={2}
          value={formData.address}
          onChange={(value) => handleChange("address", value)}
        />

        <Grid columns={2}>
          <TextInput
            label="University or School Name"
            placeholder="Enter your school name"
            value={formData.universityName}
            onChange={(value) => handleChange("universityName", value)}
            required
          />

          <TextInput
            label="Major / Program of Study"
            placeholder="Enter your major"
            value={formData.major}
            onChange={(value) => handleChange("major", value)}
            required
          />
        </Grid>

        <div className="space-y-4">
          <Select
            label="Academic Year"
            value={formData.academicYear}
            onChange={(value) => handleChange("academicYear", value)}
            options={[
              { value: "freshman", label: "Freshman" },
              { value: "sophomore", label: "Sophomore" },
              { value: "junior", label: "Junior" },
              { value: "senior", label: "Senior" },
              { value: "graduate", label: "Graduate" },
              { value: "other", label: "Other" },
            ]}
            placeholder="Select your academic year"
            required
          />

          {formData.academicYear === "other" && (
            <TextInput
              placeholder="Please specify your academic year"
              value={formData.academicYearOther}
              onChange={(value) => handleChange("academicYearOther", value)}
              required
            />
          )}
        </div>
      </FormSection>

      {/* Section 2: Internship Details */}
      <FormSection
        title="Internship Details"
        icon={Briefcase}
        iconColor="text-purple-600"
        bgGradient="from-purple-50 to-pink-50"
      >
        <div className="space-y-4">
          <CheckboxGroup
            label="Internship Type or Focus Area (check all that apply)"
            options={[
              { value: "music-therapy", label: "Music Therapy" },
              { value: "psychology", label: "Psychology / Neuroscience" },
              { value: "communications", label: "Communications / Marketing" },
              { value: "nonprofit-admin", label: "Nonprofit Administration" },
              { value: "research", label: "Research & Data Collection" },
              { value: "other", label: "Other" },
            ]}
            selectedValues={formData.internshipTypes}
            onChange={(values) => handleChange("internshipTypes", values)}
            required
            columns={2}
          />

          {formData.internshipTypes.includes("other") && (
            <TextInput
              placeholder="Please specify the internship type"
              value={formData.internshipTypeOther}
              onChange={(value) => handleChange("internshipTypeOther", value)}
              required
            />
          )}
        </div>

        <RadioGroup
          label="Desired Internship Term"
          options={[
            { value: "spring", label: "Spring" },
            { value: "summer", label: "Summer" },
            { value: "fall", label: "Fall" },
            { value: "winter", label: "Winter" },
            { value: "year-round", label: "Year-round" },
          ]}
          selectedValue={formData.internshipTerm}
          onChange={(value) => handleChange("internshipTerm", value)}
          required
          columns={3}
        />

        <Grid columns={3}>
          <TextInput
            label="Start Date (estimated)"
            type="date"
            value={formData.startDate}
            onChange={(value) => handleChange("startDate", value)}
          />

          <TextInput
            label="Expected End Date"
            type="date"
            value={formData.endDate}
            onChange={(value) => handleChange("endDate", value)}
          />

          <TextInput
            label="Number of Hours Required (if applicable)"
            placeholder="e.g., 120 hours"
            value={formData.hoursRequired}
            onChange={(value) => handleChange("hoursRequired", value)}
          />
        </Grid>
      </FormSection>

      {/* Section 3: Experience & Goals */}
      <FormSection
        title="Experience & Goals"
        icon={Award}
        iconColor="text-green-600"
        bgGradient="from-green-50 to-emerald-50"
      >
        <Textarea
          label="Why are you interested in interning with NMTSA?"
          placeholder="Share your motivation and interest in this internship..."
          rows={4}
          value={formData.whyInterested}
          onChange={(value) => handleChange("whyInterested", value)}
          required
        />

        <Textarea
          label="What specific skills or learning goals do you hope to gain?"
          placeholder="Describe what you hope to learn and achieve during this internship..."
          rows={4}
          value={formData.learningGoals}
          onChange={(value) => handleChange("learningGoals", value)}
          required
        />

        <Textarea
          label="List any relevant coursework, certifications, or experience"
          placeholder="Share your relevant background and qualifications (optional)..."
          rows={3}
          value={formData.relevantExperience}
          onChange={(value) => handleChange("relevantExperience", value)}
        />

        <RadioGroup
          label="Do you have prior experience working with individuals with disabilities or neurological conditions?"
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "some", label: "Some experience / observation only" },
          ]}
          selectedValue={formData.priorExperience}
          onChange={(value) => handleChange("priorExperience", value)}
          required
          columns={3}
        />
      </FormSection>

      {/* Section 4: Availability & Logistics */}
      <FormSection
        title="Availability & Logistics"
        icon={Clock}
        iconColor="text-orange-600"
        bgGradient="from-orange-50 to-amber-50"
      >
        <Textarea
          label="Weekly Availability (days/times)"
          placeholder="e.g., Mondays and Wednesdays 9am-12pm, Fridays 2pm-5pm"
          rows={3}
          value={formData.weeklyAvailability}
          onChange={(value) => handleChange("weeklyAvailability", value)}
          required
        />

        <RadioGroup
          label="Will you be receiving academic credit for this internship?"
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "unsure", label: "Unsure" },
          ]}
          selectedValue={formData.academicCredit}
          onChange={(value) => handleChange("academicCredit", value)}
          required
          columns={3}
        />

        <RadioGroup
          label="Does your school require a site agreement or supervisor signature?"
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "not-sure", label: "Not sure" },
          ]}
          selectedValue={formData.siteAgreement}
          onChange={(value) => handleChange("siteAgreement", value)}
          required
          columns={3}
        />
      </FormSection>

      {/* Section 5: Consent & Signature */}
      <FormSection
        title="Consent & Signature"
        icon={FileText}
        iconColor="text-red-600"
        bgGradient="from-red-50 to-rose-50"
      >
        <div className="space-y-4">
          <label className="flex items-start space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={formData.consentToContact}
              onChange={(e) =>
                handleChange("consentToContact", e.target.checked)
              }
              className="mt-1 w-5 h-5 text-nmtsa-500 border-gray-300 rounded focus:ring-nmtsa-500"
              required
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-900">
                Consent to Contact <span className="text-red-500">*</span>
              </span>
              <p className="text-sm text-gray-600 mt-1">
                I authorize NMTSA staff to contact me about internship
                opportunities.
              </p>
            </div>
          </label>
        </div>

        <Grid columns={2}>
          <TextInput
            label="Electronic Signature (type full name)"
            placeholder="Type your full name"
            value={formData.electronicSignature}
            onChange={(value) => handleChange("electronicSignature", value)}
            required
          />

          <TextInput
            label="Date"
            type="date"
            value={formData.signatureDate}
            onChange={(value) => handleChange("signatureDate", value)}
            required
          />
        </Grid>
      </FormSection>

      <SubmitButton
        isSubmitting={isSubmitting}
        text="Submit Internship Application"
        submittingText="Submitting..."
      />
    </form>
  );
};

// Wrapper component with Suspense boundary
export default function GetInvolvedPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <GetInvolvedPage />
    </Suspense>
  );
}
