"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
  User,
  Mail,
  Phone,
  Calendar,
  Home,
  UserCircle,
  Sparkles,
  MessageSquare,
  Target,
  Volume2,
} from "lucide-react";

const MusicLessonsPage = () => {
  const searchParams = useSearchParams();
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check for form parameter in URL on component mount
  useEffect(() => {
    const formParam = searchParams.get("form");
    if (formParam && formParam === "music-lessons") {
      setSelectedForm(formParam);
    }
  }, [searchParams]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = {
        form_type: "music_lessons",
        name: `${formData.firstName || ""} ${formData.lastName || ""}`.trim(),
        email: formData.email,
        phone: formData.phone,
        message: formData.goals || "Adapted Music Lessons request",
        metadata: {
          formType: "adapted_music_lessons",
          studentInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            birthday: formData.birthday,
            address: formData.address,
            phone: formData.phone,
            email: formData.email,
          },
          guardianInfo: formData.guardianName ? {
            name: formData.guardianName,
            relationship: formData.guardianRelationship,
            phone: formData.guardianPhone,
            email: formData.guardianEmail,
          } : null,
          lessonInterest: {
            instruments: formData.instruments || [],
            instrumentOther: formData.instrumentOther,
            experienceLevel: formData.experienceLevel,
            lessonLength: formData.lessonLength,
            deliveryMethod: formData.deliveryMethod,
            desiredStartDate: formData.desiredStartDate,
            preferredInstructor: formData.preferredInstructor,
            lessonFrequency: formData.lessonFrequency,
            lessonType: formData.lessonType,
          },
          scheduleAvailability: formData.availability || {},
          participantDetails: {
            diagnoses: formData.diagnoses || [],
            diagnosisOther: formData.diagnosisOther,
            communicationPreferences: formData.communicationPreferences || [],
            communicationOther: formData.communicationOther,
            supportsAccommodations: formData.supportsAccommodations,
          },
          goalsInterests: {
            goals: formData.goals,
            musicPreferences: formData.musicPreferences,
            additionalNotes: formData.additionalNotes,
          },
        },
      };

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
        "Thank you! Your music lesson request has been submitted successfully. We will contact you within 24 hours."
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
      color: "from-pink-500 to-rose-600",
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
            className="inline-flex items-center text-pink-600 hover:text-purple-800 mb-6 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Programs
          </Link>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
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
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
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
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center mr-4">
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
                <div className="text-sm text-pink-600 font-medium">
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
                onClick={() => setSelectedForm("music-lessons")}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
              >
                <Music className="w-5 h-5 mr-2" />
                Access Form
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-600 text-white">
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl z-10">
              <h3 className="text-2xl font-bold text-gray-900 font-poppins">
                Adapted Music Lessons Request
              </h3>
              <button
                onClick={closeForm}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="p-6 max-h-[calc(90vh-100px)] overflow-y-auto">
              <MusicLessonsForm
                onSubmit={handleFormSubmit}
                onChange={handleInputChange}
                isSubmitting={isSubmitting}
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
  isSubmitting = false,
}: {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
  isSubmitting?: boolean;
}) => {
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<string[]>([]);
  const [selectedCommunication, setSelectedCommunication] = useState<string[]>([]);
  const [weeklyAvailability, setWeeklyAvailability] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (category: string, value: string, checked: boolean) => {
    if (category === 'instruments') {
      const updated = checked 
        ? [...selectedInstruments, value]
        : selectedInstruments.filter(i => i !== value);
      setSelectedInstruments(updated);
      onChange('instruments', updated);
    } else if (category === 'diagnosis') {
      const updated = checked
        ? [...selectedDiagnoses, value]
        : selectedDiagnoses.filter(d => d !== value);
      setSelectedDiagnoses(updated);
      onChange('diagnoses', updated);
    } else if (category === 'communication') {
      const updated = checked
        ? [...selectedCommunication, value]
        : selectedCommunication.filter(c => c !== value);
      setSelectedCommunication(updated);
      onChange('communicationPreferences', updated);
    }
  };

  const handleAvailabilityChange = (slot: string, checked: boolean) => {
    const updated = { ...weeklyAvailability, [slot]: checked };
    setWeeklyAvailability(updated);
    onChange('availability', updated);
  };

  const timeSlots = [
    '9:00-10:00 AM',
    '10:00-11:00 AM',
    '11:00 AM-12:00 PM',
    '12:00-1:00 PM',
    '1:00-2:00 PM',
    '2:00-3:00 PM',
    '3:00-4:00 PM',
    '4:00-5:00 PM',
    '5:00-6:00 PM',
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Section 1: Student Information */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-pink-600" />
          Student Information
        </h4>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-1 text-purple-500" />
                First Name *
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onChange={(e) => onChange("firstName", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-1 text-purple-500" />
                Last Name *
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onChange={(e) => onChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 mr-1 text-purple-500" />
              Birthday *
            </label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onChange={(e) => onChange("birthday", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Home className="w-4 h-4 mr-1 text-purple-500" />
              Address
            </label>
            <textarea
              placeholder="Street address, City, State, ZIP"
              rows={2}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onChange={(e) => onChange("address", e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-1 text-purple-500" />
                Phone Number *
              </label>
              <input
                type="tel"
                placeholder="(555) 123-4567"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onChange={(e) => onChange("phone", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-1 text-purple-500" />
                Email *
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onChange={(e) => onChange("email", e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Guardian Information */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <UserCircle className="w-5 h-5 mr-2 text-blue-600" />
          Guardian Information (if applicable)
        </h4>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <UserCircle className="w-4 h-4 mr-1 text-blue-500" />
                Guardian Name
              </label>
              <input
                type="text"
                placeholder="Guardian Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => onChange("guardianName", e.target.value)}
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 mr-1 text-blue-500" />
                Relationship to Student
              </label>
              <input
                type="text"
                placeholder="e.g., Parent, Legal Guardian"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => onChange("guardianRelationship", e.target.value)}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-1 text-blue-500" />
                Guardian Phone Number
              </label>
              <input
                type="tel"
                placeholder="(555) 123-4567"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => onChange("guardianPhone", e.target.value)}
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-1 text-blue-500" />
                Guardian Email
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => onChange("guardianEmail", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Lesson Interest */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Music className="w-5 h-5 mr-2 text-green-600" />
          Lesson Interest
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Which instrument(s) is the student interested in learning?
            </label>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { name: 'Piano', icon: Piano },
                { name: 'Guitar', icon: Guitar },
                { name: 'Drums', icon: Drum },
                { name: 'Voice', icon: Mic },
                { name: 'Ukulele', icon: Guitar },
                { name: 'Violin', icon: Music },
              ].map(({ name, icon: Icon }) => (
                <label key={name} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-white/50 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                    onChange={(e) => handleCheckboxChange('instruments', name, e.target.checked)}
                  />
                  <Icon className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">{name}</span>
                </label>
              ))}
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Other (please specify)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  onChange={(e) => onChange("instrumentOther", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Award className="w-4 h-4 mr-1 text-green-500" />
                Experience Level
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onChange={(e) => onChange("experienceLevel", e.target.value)}
              >
                <option value="">Select experience level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 mr-1 text-green-500" />
                Preferred Lesson Length
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onChange={(e) => onChange("lessonLength", e.target.value)}
              >
                <option value="">Select lesson length</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-1 text-green-500" />
                Preferred Delivery Method
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onChange={(e) => onChange("deliveryMethod", e.target.value)}
              >
                <option value="">Select delivery method</option>
                <option value="in-clinic">In-clinic</option>
                <option value="telehealth">Telehealth</option>
                <option value="hybrid">Hybrid (in-clinic and telehealth)</option>
              </select>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-1 text-green-500" />
                Desired Start Date
              </label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onChange={(e) => onChange("desiredStartDate", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-1 text-green-500" />
                Preferred Instructor (if known)
              </label>
              <input
                type="text"
                placeholder="Instructor name (optional)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onChange={(e) => onChange("preferredInstructor", e.target.value)}
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 mr-1 text-green-500" />
                Lesson Frequency
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onChange={(e) => onChange("lessonFrequency", e.target.value)}
              >
                <option value="">Select frequency</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Biweekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 mr-1 text-green-500" />
              Lesson Type
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onChange={(e) => onChange("lessonType", e.target.value)}
            >
              <option value="">Select lesson type</option>
              <option value="individual">Individual</option>
              <option value="group">Group</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 3: Schedule Availability */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-orange-600" />
          Schedule Availability
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          Please select all days and times you are available for a 60-minute lesson.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 bg-gray-100 p-2 text-left text-sm font-semibold text-gray-700">
                  Time
                </th>
                {days.map((day) => (
                  <th key={day} className="border border-gray-300 bg-gray-100 p-2 text-center text-sm font-semibold text-gray-700">
                    {day.slice(0, 3)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot) => (
                <tr key={slot}>
                  <td className="border border-gray-300 p-2 text-sm text-gray-700 whitespace-nowrap">
                    {slot}
                  </td>
                  {days.map((day) => {
                    const slotKey = `${day}-${slot}`;
                    return (
                      <td key={slotKey} className="border border-gray-300 p-2 text-center">
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
                          onChange={(e) => handleAvailabilityChange(slotKey, e.target.checked)}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 4: Participant Details */}
      <div className="bg-gradient-to-r from-rose-50 to-red-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-rose-600" />
          Participant Details
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Primary diagnosis or condition (check all that apply):
            </label>
            <div className="grid md:grid-cols-2 gap-3">
              {['ADHD', 'Autism', 'Cerebral Palsy', 'Down\'s Syndrome', 'Epilepsy', 
                'Neurodevelopmental Disorder', 'Parkinson\'s Disease', 'Stroke', 
                'Traumatic Brain Injury', 'None'].map((diagnosis) => (
                <label key={diagnosis} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-white/50 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-rose-600 border-gray-300 rounded focus:ring-2 focus:ring-rose-500"
                    onChange={(e) => handleCheckboxChange('diagnosis', diagnosis, e.target.checked)}
                  />
                  <span className="text-gray-700">{diagnosis}</span>
                </label>
              ))}
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Other (please specify)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  onChange={(e) => onChange("diagnosisOther", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <Volume2 className="w-4 h-4 mr-1 text-rose-500" />
              Communication preference:
            </label>
            <div className="space-y-2">
              {['Verbal', 'Nonverbal', 'Uses AAC Device', 'Speller'].map((pref) => (
                <label key={pref} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-white/50 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-rose-600 border-gray-300 rounded focus:ring-2 focus:ring-rose-500"
                    onChange={(e) => handleCheckboxChange('communication', pref, e.target.checked)}
                  />
                  <span className="text-gray-700">{pref}</span>
                </label>
              ))}
              <input
                type="text"
                placeholder="Other (please specify)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                onChange={(e) => onChange("communicationOther", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Sparkles className="w-4 h-4 mr-1 text-rose-500" />
              Supports, Accommodations, or Sensory Considerations
            </label>
            <textarea
              placeholder="Please describe any supports, accommodations, or sensory considerations helpful during lessons..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              onChange={(e) => onChange("supportsAccommodations", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Section 5: Goals & Interests */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-indigo-600" />
          Goals & Interests
        </h4>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Target className="w-4 h-4 mr-1 text-indigo-500" />
              Main Goals for Adapted Music Lessons *
            </label>
            <textarea
              placeholder="What are your main goals for participating in Adapted Music Lessons?"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onChange={(e) => onChange("goals", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Music className="w-4 h-4 mr-1 text-indigo-500" />
              Music Preferences
            </label>
            <textarea
              placeholder="What kind of music or artists does the student enjoy?"
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onChange={(e) => onChange("musicPreferences", e.target.value)}
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 mr-1 text-indigo-500" />
              Additional Notes
            </label>
            <textarea
              placeholder="Additional notes or information you'd like to share..."
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onChange={(e) => onChange("additionalNotes", e.target.value)}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center ${
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
            Submit Music Lesson Request
          </>
        )}
      </button>
    </form>
  );
};

// Wrapper component with Suspense boundary
export default function MusicLessonsPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <MusicLessonsPage />
    </Suspense>
  );
}
