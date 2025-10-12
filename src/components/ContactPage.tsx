"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  Send,
  Check,
  UserPlus,
  Briefcase,
} from "lucide-react";

const ContactPage = () => {
  const [formType, setFormType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    formType: "general",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    // Get form type from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get("form");
    if (type && ["volunteer", "internship", "employment"].includes(type)) {
      setFormType(type);
      setFormData((prev) => ({
        ...prev,
        formType: type,
        subject: `${type.charAt(0).toUpperCase() + type.slice(1)} Application`,
        message: `I am interested in the ${type} opportunities at NMTSA. Please provide me with more information about the application process.`,
      }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Determine the appropriate API endpoint and submission data
      let apiUrl = '/api/forms';
      let submissionData: any;

      if (formType === 'employment') {
        // Use employee applications API
        apiUrl = '/api/employees/applications';
        submissionData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          position_applied_for: formData.subject || "General Position",
          cover_letter: formData.message,
          metadata: {
            submittedFrom: 'contact_page',
            submissionDate: new Date().toISOString(),
          },
          status: 'pending',
        };
      } else if (formType === 'volunteer') {
        // Use volunteer applications API
        apiUrl = '/api/volunteers/applications';
        submissionData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          reason_for_volunteering: formData.message,
          metadata: {
            subject: formData.subject,
            submittedFrom: 'contact_page',
            submissionDate: new Date().toISOString(),
          },
          status: 'pending',
        };
      } else if (formType === 'internship') {
        // Use intern applications API
        apiUrl = '/api/interns/applications';
        submissionData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          school_name: "Not specified",
          major: "Not specified",
          desired_position: formData.subject || "General Internship",
          cover_letter: formData.message,
          metadata: {
            submittedFrom: 'contact_page',
            submissionDate: new Date().toISOString(),
          },
          status: 'pending',
        };
      } else {
        // Use general forms API for contact forms
        submissionData = {
          form_type: 'contact',
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message,
          metadata: {
            subject: formData.subject,
            formType: formData.formType,
            submittedFrom: 'contact_page',
            submissionDate: new Date().toISOString(),
          },
        };
      }

      // Submit to API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      // Success!
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          formType: formType || "general",
        });
      }, 3000);

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Failed to submit form. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: ["3221 N 16th Street, Suite 201", "Phoenix, AZ 85016"],
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["(602) 840-6410"],
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@nmtsa.org"],
      color: "from-orange-500 to-red-600",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: [
        "Monday - Friday: 8:00 AM - 5:00 PM",
        "Saturday: By appointment only",
      ],
      color: "from-purple-500 to-pink-600",
    },
  ];

  const subjects = [
    "General Inquiry",
    "Schedule Assessment",
    "Program Information",
    "Insurance/Billing",
    "Volunteer Opportunities",
    "Professional Development",
    "Employment Opportunities",
    "Media/Press",
    "Other",
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
              {formType ? (
                <>
                  Join Our <span className="gradient-text">Team</span>
                </>
              ) : (
                <>
                  Get in <span className="gradient-text">Touch</span>
                </>
              )}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              {formType === "volunteer" &&
                "Thank you for your interest in volunteering with NMTSA! Help us make a difference in the lives of individuals with neurologic impairments."}
              {formType === "internship" &&
                "Gain valuable hands-on experience in music therapy with our internship program. Join our team and learn from experienced professionals."}
              {formType === "employment" &&
                "Join our professional team at NMTSA! We're always looking for passionate music therapists to help us serve our community."}
              {!formType &&
                "Ready to learn more about our services or how you can get involved? We'd love to hear from you and answer any questions you may have."}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={info.title}
                className="glass-card p-6 rounded-2xl text-center"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-poppins">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
                Let&apos;s Start a{" "}
                <span className="gradient-text">Conversation</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Whether you&apos;re interested in our services, want to
                volunteer, or have questions about music therapy, we&apos;re
                here to help. Our team typically responds within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-nmtsa-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Quick Response
                    </h3>
                    <p className="text-gray-600">
                      We respond to all inquiries within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-nmtsa-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Free Consultations
                    </h3>
                    <p className="text-gray-600">
                      Initial consultations are always complimentary
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-nmtsa-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Flexible Scheduling
                    </h3>
                    <p className="text-gray-600">
                      We work around your schedule and availability
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-nmtsa-500 to-nmtsa-600 rounded-2xl text-white">
                <div className="flex items-center mb-4">
                  <Heart className="w-6 h-6 mr-3" />
                  <h3 className="font-semibold font-poppins">
                    Ready to Donate?
                  </h3>
                </div>
                <p className="text-nmtsa-100 mb-4">
                  Support our mission and help us reach more families in need.
                </p>
                <button className="bg-white text-nmtsa-600 font-semibold px-6 py-3 rounded-full hover:bg-nmtsa-50 transition-colors">
                  Donate Now
                </button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nmtsa-500 bg-white/80 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nmtsa-500 bg-white/80 transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nmtsa-500 bg-white/80 transition-all"
                      placeholder="(Optional)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nmtsa-500 bg-white/80 transition-all"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nmtsa-500 bg-white/80 resize-none transition-all"
                    placeholder="Tell us about your needs, questions, or how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full text-white font-semibold px-8 py-4 rounded-full inline-flex items-center justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  disabled={isSubmitted || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              {isSubmitted && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl animate-fade-in">
                  <div className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-green-800 text-sm">
                      Thank you for your message! We&apos;ve received your inquiry and will get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-red-800 text-sm font-semibold mb-1">
                        Submission Failed
                      </p>
                      <p className="text-red-700 text-sm">
                        {submitError}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins text-gray-900 mb-6">
              Visit Our <span className="gradient-text">Location</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Located in the heart of Phoenix, Arizona, we&apos;re easily
              accessible and offer ample parking
            </p>
          </div>

          <div className="glass-card p-4 rounded-2xl overflow-hidden">
            <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
              <iframe
                title="Google Maps - NMTSA Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.8755448887434!2d-112.04890842346476!3d33.47937097334283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b0d7c8d8c8c8d%3A0x1234567890abcdef!2s3221%20N%2016th%20St%20Suite%20201%2C%20Phoenix%2C%20AZ%2085016!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
