"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  Presentation,
  ArrowLeft,
  CheckCircle,
  Star,
  Clock,
  MapPin,
  FileText,
  Send,
  X,
  Heart,
  Brain,
  Music,
  Target,
  Award,
  Lightbulb,
  Handshake,
  BookOpen,
} from "lucide-react";

const CommunityEducationPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(
      "Thank you! Your community education request has been submitted successfully. We will contact you within 24 hours."
    );
    setShowForm(false);
    setFormData({});
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({});
  };

  const programs = [
    {
      icon: Users,
      title: "Community Workshops",
      description:
        "Interactive workshops for community members to learn about music therapy benefits",
      features: [
        "Family education sessions",
        "Caregiver support groups",
        "Community wellness programs",
        "Awareness campaigns",
      ],
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: Presentation,
      title: "Public Speaking",
      description:
        "Educational presentations at community centers, libraries, and organizations",
      features: [
        "Health fairs participation",
        "Senior center presentations",
        "Library educational talks",
        "Community center events",
      ],
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Heart,
      title: "Awareness Campaigns",
      description:
        "Initiatives to increase understanding of neurologic music therapy in the community",
      features: [
        "Social media campaigns",
        "Educational materials",
        "Community partnerships",
        "Advocacy programs",
      ],
      color: "from-rose-500 to-pink-600",
    },
  ];

  const targetGroups = [
    {
      title: "Families & Caregivers",
      description:
        "Learn how music therapy can support your loved ones at home",
      icon: "👨‍👩‍👧‍👦",
      topics: [
        "Home activities",
        "Support strategies",
        "Understanding benefits",
      ],
    },
    {
      title: "Senior Communities",
      description: "Discover music therapy applications for healthy aging",
      icon: "👴👵",
      topics: ["Cognitive wellness", "Social engagement", "Physical activity"],
    },
    {
      title: "Community Organizations",
      description:
        "Partner with us to bring music therapy awareness to your members",
      icon: "🏢",
      topics: [
        "Program partnerships",
        "Educational events",
        "Resource sharing",
      ],
    },
    {
      title: "Healthcare Networks",
      description:
        "Understand integration opportunities in healthcare settings",
      icon: "🏥",
      topics: [
        "Referral processes",
        "Treatment integration",
        "Outcome measures",
      ],
    },
  ];

  const impactAreas = [
    {
      icon: Brain,
      title: "Neurological Conditions",
      description:
        "Education about music therapy for stroke, TBI, Parkinson's, and more",
      conditions: [
        "Stroke recovery",
        "Traumatic brain injury",
        "Parkinson's disease",
        "Dementia",
      ],
    },
    {
      icon: Music,
      title: "Developmental Support",
      description:
        "Understanding music therapy's role in developmental disabilities",
      conditions: [
        "Autism spectrum",
        "Cerebral palsy",
        "Down syndrome",
        "Learning disabilities",
      ],
    },
    {
      icon: Heart,
      title: "Mental Health",
      description:
        "Exploring music therapy benefits for emotional and psychological wellness",
      conditions: ["Depression", "Anxiety", "PTSD", "Grief support"],
    },
  ];

  const achievements = [
    {
      number: "2,500+",
      label: "Community Members Reached",
      description: "Through our education programs",
    },
    {
      number: "150+",
      label: "Community Events",
      description: "Presentations and workshops delivered",
    },
    {
      number: "50+",
      label: "Partner Organizations",
      description: "Community partnerships established",
    },
    {
      number: "95%",
      label: "Positive Feedback",
      description: "From community participants",
    },
  ];

  const testimonials = [
    {
      quote:
        "The workshop opened our eyes to how music could help my mother with dementia. We now use music daily and see remarkable improvements in her mood and memory.",
      author: "Sarah M.",
      role: "Family Caregiver",
      rating: 5,
    },
    {
      quote:
        "As a senior center director, partnering with NMTSA has been invaluable. Our residents love the sessions and we've seen improved social engagement across the board.",
      author: "Michael R.",
      role: "Senior Center Director",
      rating: 5,
    },
    {
      quote:
        "The presentation at our health fair was incredibly informative. Many families learned about resources they never knew existed.",
      author: "Dr. Lisa K.",
      role: "Community Health Coordinator",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/programs"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-800 mb-6 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Programs
          </Link>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold font-poppins text-gray-900 mb-6">
              Community <span className="gradient-text">Education</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Empowering communities through education and awareness about
              neurologic music therapy. Building understanding, fostering
              support, and creating connections.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-gray-900 mb-6">
              Education <span className="gradient-text">Programs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive community education initiatives designed to increase
              awareness and understanding
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div
                key={program.title}
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

                <div className="space-y-3">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Groups */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-gray-900 mb-6">
              Who We <span className="gradient-text">Serve</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our community education programs reach diverse groups across
              Arizona
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {targetGroups.map((group, index) => (
              <div
                key={group.title}
                className="glass-card p-6 rounded-2xl text-center"
              >
                <div className="text-4xl mb-4">{group.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-poppins">
                  {group.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {group.description}
                </p>
                <div className="space-y-2">
                  {group.topics.map((topic, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
                    >
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-gray-900 mb-6">
              Education <span className="gradient-text">Focus Areas</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key areas where we provide community education and awareness
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {impactAreas.map((area, index) => (
              <div key={area.title} className="glass-card p-8 rounded-2xl">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
                  <area.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-poppins">
                  {area.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {area.description}
                </p>

                <div className="space-y-2">
                  {area.conditions.map((condition, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 flex-shrink-0"></div>
                      {condition}
                    </div>
                  ))}
                </div>
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
              How We <span className="gradient-text">Engage</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our approach to community education and outreach
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Community Assessment",
                description:
                  "Identify specific education needs and opportunities in your community",
                icon: Target,
              },
              {
                step: "02",
                title: "Program Design",
                description:
                  "Develop customized educational content for your audience",
                icon: Lightbulb,
              },
              {
                step: "03",
                title: "Delivery & Engagement",
                description:
                  "Present engaging, interactive educational sessions",
                icon: Presentation,
              },
              {
                step: "04",
                title: "Follow-up Support",
                description:
                  "Provide resources and ongoing support after sessions",
                icon: Handshake,
              },
            ].map((process, index) => (
              <div key={process.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">
                    {process.step}
                  </span>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <process.icon className="w-6 h-6 text-emerald-600" />
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

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-gray-900 mb-6">
              Community <span className="gradient-text">Voices</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from community members who have participated in our education
              programs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Program */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold font-poppins mb-6">
            Bring Education to Your Community
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Partner with us to provide valuable music therapy education to your
            community members
          </p>
          <button
            onClick={() => {
              alert(
                "Link generated! Your form access link has been created and will be available shortly."
              );
            }}
            className="bg-white text-emerald-600 font-semibold py-4 px-8 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center"
          >
            <FileText className="w-5 h-5 mr-2" />
            Access Form
          </button>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-poppins mb-4">
              Our Community Impact
            </h2>
            <p className="text-xl text-gray-300">
              Measuring our reach and effectiveness in community education
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={achievement.label} className="text-center">
                <div className="text-4xl font-bold font-poppins mb-2 text-emerald-400">
                  {achievement.number}
                </div>
                <div className="text-lg font-semibold mb-2">
                  {achievement.label}
                </div>
                <div className="text-sm text-gray-400">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-2xl font-bold text-gray-900 font-poppins">
                Community Education Request
              </h3>
              <button
                onClick={closeForm}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <CommunityEducationForm
                onSubmit={handleFormSubmit}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Form Component
const CommunityEducationForm = ({
  onSubmit,
  onChange,
}: {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Users className="w-5 h-5 mr-2 text-emerald-600" />
        Contact Information
      </h4>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Contact Name *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          onChange={(e) => onChange("name", e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Organization/Community Group *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          onChange={(e) => onChange("organization", e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          onChange={(e) => onChange("phone", e.target.value)}
        />
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900">Program Type</h4>
      <div className="space-y-3">
        {[
          "Community Workshop",
          "Public Presentation",
          "Awareness Campaign",
          "Custom Program",
        ].map((type) => (
          <label
            key={type}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <input
              type="radio"
              name="programType"
              className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
              onChange={() => onChange("programType", type)}
            />
            <span className="text-gray-700">{type}</span>
          </label>
        ))}
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-900">
        Target Audience (Select all that apply)
      </h4>
      <div className="grid md:grid-cols-2 gap-3">
        {[
          "Families & Caregivers",
          "Senior Community",
          "Healthcare Professionals",
          "General Public",
        ].map((audience) => (
          <label
            key={audience}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <input
              type="checkbox"
              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              onChange={(e) =>
                onChange(
                  `audience_${audience.toLowerCase().replace(" ", "_")}`,
                  e.target.checked
                )
              }
            />
            <span className="text-gray-700">{audience}</span>
          </label>
        ))}
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <input
        type="date"
        placeholder="Preferred Date"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        onChange={(e) => onChange("preferredDate", e.target.value)}
      />
      <input
        type="number"
        placeholder="Expected Attendance"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        onChange={(e) => onChange("expectedAttendance", e.target.value)}
      />
    </div>

    <textarea
      placeholder="Please provide details about your community education needs, specific topics of interest, and any special considerations..."
      rows={5}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
      onChange={(e) => onChange("details", e.target.value)}
      required
    />

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
    >
      <Send className="w-5 h-5 mr-2" />
      Request Community Program
    </button>
  </form>
);

export default CommunityEducationPage;
