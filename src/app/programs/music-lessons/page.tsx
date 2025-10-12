"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Music,
  ArrowLeft,
  CheckCircle,
  Star,
  Clock,
  MapPin,
  Users,
  FileText,
  Send,
  X,
  Guitar,
  Piano,
  Mic,
  Drum,
  Heart,
  Award,
  Play,
} from "lucide-react";

const MusicLessonsPage = () => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(
      "Thank you! Your music lesson request has been submitted successfully. We will contact you within 24 hours."
    );
    setSelectedForm(null);
    setFormData({});
  };

  const closeForm = () => {
    setSelectedForm(null);
    setFormData({});
  };

  const instruments = [
    {
      icon: Piano,
      name: "Piano",
      description: "Adaptive piano lessons with specialized techniques",
      color: "from-blue-500 to-indigo-600",
      features: [
        "Large key keyboards",
        "One-handed techniques",
        "Visual learning aids",
      ],
    },
    {
      icon: Guitar,
      name: "Guitar",
      description: "Modified guitar instruction for all abilities",
      color: "from-green-500 to-emerald-600",
      features: ["Adaptive picks", "Simplified chords", "Visual tablature"],
    },
    {
      icon: Mic,
      name: "Voice/Singing",
      description: "Vocal training adapted for communication goals",
      color: "from-purple-500 to-pink-600",
      features: [
        "Breathing techniques",
        "Speech integration",
        "Performance skills",
      ],
    },
    {
      icon: Drum,
      name: "Percussion",
      description: "Rhythm and percussion for motor development",
      color: "from-orange-500 to-red-600",
      features: ["Hand-eye coordination", "Motor planning", "Adaptive mallets"],
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Emotional Expression",
      description:
        "Music provides a powerful outlet for emotions and creativity",
    },
    {
      icon: Users,
      title: "Social Skills",
      description:
        "Group lessons and performances build confidence and social connections",
    },
    {
      icon: Award,
      title: "Achievement",
      description: "Celebrate progress with recitals and milestone recognition",
    },
    {
      icon: Play,
      title: "Fun & Engagement",
      description: "Learn through play with games and interactive activities",
    },
  ];

  const successStories = [
    {
      name: "Sarah, Age 12",
      condition: "Autism Spectrum",
      story:
        "Started with simple rhythms, now plays piano beautifully and has improved communication skills.",
      progress: "18 months of lessons",
    },
    {
      name: "Michael, Age 8",
      condition: "Cerebral Palsy",
      story:
        "Adapted guitar techniques helped improve fine motor skills and boosted confidence.",
      progress: "2 years of lessons",
    },
    {
      name: "Emma, Age 15",
      condition: "Down Syndrome",
      story:
        "Voice lessons enhanced speech clarity and she now performs in community concerts.",
      progress: "3 years of lessons",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/programs"
            className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Programs
          </Link>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Music className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold font-poppins text-gray-900 mb-6">
              Adapted Music <span className="gradient-text">Lessons</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Specialized private music lessons designed for individuals with
              disabilities and special needs. Experience the joy of music while
              developing skills in a supportive, adaptive environment.
            </p>
          </div>
        </div>
      </section>

      {/* Instruments */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-gray-900 mb-6">
              Choose Your <span className="gradient-text">Instrument</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer adaptive instruction for a variety of instruments, each
              tailored to your unique needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {instruments.map((instrument, index) => (
              <div
                key={instrument.name}
                className="glass-card p-6 rounded-2xl text-center group"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${instrument.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <instrument.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">
                  {instrument.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {instrument.description}
                </p>
                <div className="space-y-2">
                  {instrument.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-xs text-gray-600"
                    >
                      <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-gray-900 mb-6">
              Benefits of <span className="gradient-text">Music Lessons</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our adapted music lessons provide far more than just musical
              skills
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={benefit.title} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-poppins">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-gray-900 mb-6">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our adapted music lessons have transformed lives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={story.name} className="glass-card p-6 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mr-4">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{story.name}</h3>
                    <p className="text-sm text-gray-500">{story.condition}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  &ldquo;{story.story}&rdquo;
                </p>
                <div className="text-sm text-purple-600 font-medium">
                  {story.progress}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lesson Details */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold font-poppins text-gray-900 mb-6">
                Lesson <span className="gradient-text">Details</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Duration & Frequency
                    </h3>
                    <p className="text-gray-600">
                      30-45 minute sessions, typically weekly or bi-weekly
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Users className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Age Range
                    </h3>
                    <p className="text-gray-600">
                      Ages 5 and up - lessons adapted for all skill levels
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Location
                    </h3>
                    <p className="text-gray-600">
                      In-person at our facility or virtual lessons available
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FileText className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Progress Tracking
                    </h3>
                    <p className="text-gray-600">
                      Regular assessments and family updates on progress
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-poppins text-center">
                Ready to Start?
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Begin your musical journey with our specialized adaptive music
                lessons
              </p>
              <button
                onClick={() => {
                  alert(
                    "Link generated! Your form access link has been created and will be available shortly."
                  );
                }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
              >
                <Music className="w-5 h-5 mr-2" />
                Access Form
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "200+", label: "Students Taught" },
              { number: "4", label: "Instruments Offered" },
              { number: "100%", label: "Adaptive Approach" },
              { number: "5★", label: "Parent Rating" },
            ].map((stat, index) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-4xl font-bold font-poppins">
                  {stat.number}
                </div>
                <div className="text-purple-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Modal */}
      {selectedForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-2xl font-bold text-gray-900 font-poppins">
                Music Lessons Request
              </h3>
              <button
                onClick={closeForm}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <MusicLessonsForm
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

const MusicLessonsForm = ({
  onSubmit,
  onChange,
}: {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Music className="w-5 h-5 mr-2 text-purple-600" />
        Student Information
      </h4>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Student Name *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          onChange={(e) => onChange("studentName", e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          min="5"
          max="100"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          onChange={(e) => onChange("age", e.target.value)}
        />
        <input
          type="text"
          placeholder="Parent/Guardian Name *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          onChange={(e) => onChange("parentName", e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Contact Email *"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          onChange={(e) => onChange("instrument", e.target.value)}
        >
          <option value="">Preferred Instrument *</option>
          <option value="piano">Piano</option>
          <option value="guitar">Guitar</option>
          <option value="voice">Voice/Singing</option>
          <option value="drums">Drums/Percussion</option>
          <option value="other">Other</option>
        </select>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          onChange={(e) => onChange("experience", e.target.value)}
        >
          <option value="">Experience Level</option>
          <option value="beginner">Beginner</option>
          <option value="some">Some Experience</option>
          <option value="intermediate">Intermediate</option>
        </select>
      </div>
      <textarea
        placeholder="Please describe any accommodations needed or special considerations..."
        rows={3}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        onChange={(e) => onChange("accommodations", e.target.value)}
      />
    </div>

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
    >
      <Send className="w-5 h-5 mr-2" />
      Request Music Lessons
    </button>
  </form>
);

export default MusicLessonsPage;
