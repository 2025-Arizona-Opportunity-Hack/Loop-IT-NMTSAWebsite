"use client";

import { useState } from "react";
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
} from "lucide-react";
import { ConsultationForm } from "./forms/ConsultationForm";
import { InternshipForm } from "./forms/InternshipForm";

const GetInvolvedPage = () => {
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [showInternshipModal, setShowInternshipModal] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<string | null>(null);

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
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6 border border-white/20">
            Join Our Mission
          </span>
          <h1 className="font-bold font-poppins mb-6 text-4xl sm:text-5xl lg:text-6xl">
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
                className="get-involved-card p-8 rounded-2xl transition-all duration-300 group hover:shadow-xl"
              >
                <div
                  onClick={() => setSelectedInfo(option.title)}
                  className="cursor-pointer"
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

                  <div className="space-y-4 mb-6">
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
                          setShowVolunteerModal(true);
                        } else if (option.title === "Internship") {
                          setShowInternshipModal(true);
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
            Ready to Get <span className="gradient-text">Started</span>?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg sm:text-xl mb-8">
            Take the first step towards making a difference. Contact us to learn
            more about current opportunities.
          </p>
          <Link href="/contact" className="btn-primary text-lg">
            Contact Us Today
          </Link>
        </div>
      </section>

      {/* Volunteer Application Modal */}
      {showVolunteerModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-poppins">
                  Volunteer Application
                </h3>
              </div>
              <button
                onClick={() => setShowVolunteerModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-600 leading-relaxed">
                  Thank you for your interest in volunteering with NMTSA! Please fill out this form 
                  to request a professional consultation, training, observation visit, or to learn more 
                  about volunteer opportunities. We&apos;ll review your application and get back to you 
                  within 2-3 business days.
                </p>
              </div>
              <ConsultationForm onSuccess={() => {
                setTimeout(() => setShowVolunteerModal(false), 3000);
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Internship Application Modal */}
      {showInternshipModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-poppins">
                  Internship Application
                </h3>
              </div>
              <button
                onClick={() => setShowInternshipModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-600 leading-relaxed">
                  Thank you for your interest in interning with NMTSA! Our internship program offers 
                  hands-on experience in music therapy, nonprofit operations, research, and more. 
                  Please complete this application and we&apos;ll review it within 3-5 business days.
                </p>
              </div>
              <InternshipForm onSuccess={() => {
                setTimeout(() => setShowInternshipModal(false), 3000);
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Information Modal */}
      {selectedInfo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {(() => {
              const option = getInvolvedOptions.find(opt => opt.title === selectedInfo);
              if (!option) return null;
              
              return (
                <>
                  <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl z-10">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center`}>
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
                              setShowVolunteerModal(true);
                            } else if (option.title === "Internship") {
                              setShowInternshipModal(true);
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
    </div>
  );
};

export default GetInvolvedPage;
