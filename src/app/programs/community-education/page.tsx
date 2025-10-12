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
  Heart,
  Brain,
  Music,
  Target,
  Award,
  Lightbulb,
  Handshake,
  BookOpen,
} from "lucide-react";
import {
  ProgramFormModal,
  FormSection,
  TextInput,
  RadioGroup,
  CheckboxGroup,
  Textarea,
  SubmitButton,
  Grid,
} from "@/components/programs";

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
      <ProgramFormModal
        isOpen={showForm}
        onClose={closeForm}
        title="Community Education Request"
        maxWidth="2xl"
      >
        <CommunityEducationForm
          onSubmit={handleFormSubmit}
          onChange={handleInputChange}
        />
      </ProgramFormModal>
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
}) => {
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [programType, setProgramType] = useState("");

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <FormSection
        title="Contact Information"
        icon={Users}
        iconColor="text-emerald-600"
        bgGradient="from-emerald-50 to-teal-50"
      >
        <Grid columns={2}>
          <TextInput
            placeholder="Contact Name *"
            onChange={(value) => onChange("name", value)}
            required
          />
          <TextInput
            placeholder="Organization/Community Group *"
            onChange={(value) => onChange("organization", value)}
            required
          />
          <TextInput
            type="email"
            placeholder="Email Address *"
            onChange={(value) => onChange("email", value)}
            required
          />
          <TextInput
            type="tel"
            placeholder="Phone Number"
            onChange={(value) => onChange("phone", value)}
          />
        </Grid>
      </FormSection>

      <RadioGroup
        label="Program Type"
        options={[
          { value: "workshop", label: "Community Workshop" },
          { value: "presentation", label: "Public Presentation" },
          { value: "campaign", label: "Awareness Campaign" },
          { value: "custom", label: "Custom Program" },
        ]}
        selectedValue={programType}
        onChange={(value) => {
          setProgramType(value);
          onChange("programType", value);
        }}
        required
      />

      <CheckboxGroup
        label="Target Audience (Select all that apply)"
        options={[
          { value: "families", label: "Families & Caregivers" },
          { value: "seniors", label: "Senior Community" },
          { value: "healthcare", label: "Healthcare Professionals" },
          { value: "public", label: "General Public" },
        ]}
        selectedValues={selectedAudiences}
        onChange={(values) => {
          setSelectedAudiences(values);
          onChange("audiences", values);
        }}
        columns={2}
      />

      <Grid columns={2}>
        <TextInput
          type="date"
          label="Preferred Date"
          onChange={(value) => onChange("preferredDate", value)}
        />
        <TextInput
          type="number"
          label="Expected Attendance"
          placeholder="Number of attendees"
          onChange={(value) => onChange("expectedAttendance", value)}
        />
      </Grid>

      <Textarea
        placeholder="Please provide details about your community education needs, specific topics of interest, and any special considerations..."
        rows={5}
        onChange={(value) => onChange("details", value)}
        required
      />

      <SubmitButton text="Request Community Program" />
    </form>
  );
};

export default CommunityEducationPage;
