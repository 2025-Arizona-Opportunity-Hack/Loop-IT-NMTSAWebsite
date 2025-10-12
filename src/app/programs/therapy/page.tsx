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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare the submission data based on form type
      let submissionData;

      if (selectedForm === "request") {
        // For therapy service requests
        submissionData = {
          form_type: "service_request",
          name: `${formData.firstName || ""} ${formData.lastName || ""}`.trim(),
          email: formData.email,
          phone: formData.phone,
          message: formData.referralReason || "Therapy service request",
          metadata: {
            formType: "therapy_service_request",
            clientInfo: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              birthday: formData.birthday,
              address: formData.address,
            },
            guardianInfo: formData.guardianName ? {
              name: formData.guardianName,
              relationship: formData.guardianRelationship,
              phone: formData.guardianPhone,
              email: formData.guardianEmail,
              address: formData.guardianAddress,
            } : null,
            diagnoses: formData.diagnoses || [],
            diagnosisOther: formData.diagnosisOther,
            weeklyAvailability: formData.availability || {},
            deliveryMethods: formData.deliveryMethods || [],
            treatmentTypes: formData.treatmentTypes || [],
            treatmentOther: formData.treatmentOther,
            fundingSource: formData.fundingSource,
            fundingSourceOther: formData.fundingSourceOther,
            referralReason: formData.referralReason,
          },
        };
      } else if (selectedForm === "observation") {
        // For clinical observation requests
        submissionData = {
          form_type: "consultation",
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "",
          message: formData.purpose || "Clinical observation request",
          metadata: {
            formType: "clinical_observation_request",
            institution: formData.institution,
            role: formData.role,
            purpose: formData.purpose,
          },
        };
      }

      // Submit to API
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
        "Thank you! Your form has been submitted successfully. We will contact you within 24 hours."
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl z-10">
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
            <div className="p-6 max-h-[calc(90vh-100px)] overflow-y-auto">
              {selectedForm === "request" && (
                <RequestServiceForm
                  onSubmit={handleFormSubmit}
                  onChange={handleInputChange}
                  isSubmitting={isSubmitting}
                />
              )}
              {selectedForm === "observation" && (
                <ClinicalObservationForm
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
const RequestServiceForm = ({
  onSubmit,
  onChange,
  isSubmitting = false,
}: {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
  isSubmitting?: boolean;
}) => {
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<string[]>([]);
  const [selectedTreatmentTypes, setSelectedTreatmentTypes] = useState<string[]>([]);
  const [selectedDeliveryMethods, setSelectedDeliveryMethods] = useState<string[]>([]);
  const [weeklyAvailability, setWeeklyAvailability] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (category: string, value: string, checked: boolean) => {
    if (category === 'diagnosis') {
      const updated = checked 
        ? [...selectedDiagnoses, value]
        : selectedDiagnoses.filter(d => d !== value);
      setSelectedDiagnoses(updated);
      onChange('diagnoses', updated);
    } else if (category === 'treatment') {
      const updated = checked
        ? [...selectedTreatmentTypes, value]
        : selectedTreatmentTypes.filter(t => t !== value);
      setSelectedTreatmentTypes(updated);
      onChange('treatmentTypes', updated);
    } else if (category === 'delivery') {
      const updated = checked
        ? [...selectedDeliveryMethods, value]
        : selectedDeliveryMethods.filter(d => d !== value);
      setSelectedDeliveryMethods(updated);
      onChange('deliveryMethods', updated);
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
      {/* Client Information */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-green-600" />
          Client Information
        </h4>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Last Name *"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onChange={(e) => onChange("lastName", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="First Name *"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onChange={(e) => onChange("firstName", e.target.value)}
              required
            />
          </div>
          <input
            type="date"
            placeholder="Birthday *"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            onChange={(e) => onChange("birthday", e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address *"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            onChange={(e) => onChange("address", e.target.value)}
            required
          />
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="tel"
              placeholder="Phone Number *"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onChange={(e) => onChange("phone", e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email *"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onChange={(e) => onChange("email", e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      {/* Guardian Information */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-600" />
          Guardian Information (if applicable)
        </h4>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Guardian Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => onChange("guardianName", e.target.value)}
          />
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Relationship"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => onChange("guardianRelationship", e.target.value)}
            />
            <input
              type="tel"
              placeholder="Guardian Phone Number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => onChange("guardianPhone", e.target.value)}
            />
          </div>
          <input
            type="email"
            placeholder="Guardian Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => onChange("guardianEmail", e.target.value)}
          />
          <input
            type="text"
            placeholder="Guardian Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => onChange("guardianAddress", e.target.value)}
          />
        </div>
      </div>

      {/* Diagnosis */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-600" />
          Diagnosis (check all that apply)
        </h4>
        <div className="grid md:grid-cols-2 gap-3">
          {['ADHD', 'Autism', 'Cerebral Palsy', 'Down\'s Syndrome', 'Epilepsy', 
            'Neurodevelopmental Disorder', 'Parkinson\'s Disease', 'Stroke', 
            'Traumatic Brain Injury'].map((diagnosis) => (
            <label key={diagnosis} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-white/50 rounded-lg transition-colors">
              <input
                type="checkbox"
                className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                onChange={(e) => handleCheckboxChange('diagnosis', diagnosis, e.target.checked)}
              />
              <span className="text-gray-700">{diagnosis}</span>
            </label>
          ))}
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Other (please specify)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onChange={(e) => onChange("diagnosisOther", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Weekly Availability */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-orange-600" />
          Weekly Availability for 60-Minute Session
        </h4>
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

      {/* Treatment Type & Delivery Method */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-teal-600" />
          Treatment Type & Delivery Method
        </h4>
        
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">Delivery Method (Select all that apply):</p>
          <div className="space-y-2">
            {['In-clinic', 'Telehealth', 'Hybrid (In-clinic and Telehealth)'].map((method) => (
              <label key={method} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-white/50 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-2 focus:ring-teal-500"
                  onChange={(e) => handleCheckboxChange('delivery', method, e.target.checked)}
                />
                <span className="text-gray-700">{method}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">Treatment Type(s) (Select all that apply):</p>
          <div className="space-y-2">
            {[
              'Individual Neurologic Music Therapy Treatment',
              'Group Neurologic Music Therapy',
              'Home Program Development',
              'Speller Consultation',
              'Adaptive Lessons (30, 45, or 60 minutes)',
              'Connections Speller Group',
            ].map((treatment) => (
              <label key={treatment} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-white/50 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-2 focus:ring-teal-500"
                  onChange={(e) => handleCheckboxChange('treatment', treatment, e.target.checked)}
                />
                <span className="text-gray-700">{treatment}</span>
              </label>
            ))}
            <input
              type="text"
              placeholder="Other (please specify)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mt-2"
              onChange={(e) => onChange("treatmentOther", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Funding Source */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-indigo-600" />
          Funding Source
        </h4>
        <div className="space-y-2">
          {['Private Pay', 'ESA Account'].map((source) => (
            <label key={source} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-white/50 rounded-lg transition-colors">
              <input
                type="radio"
                name="fundingSource"
                className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => onChange("fundingSource", source)}
              />
              <span className="text-gray-700">{source}</span>
            </label>
          ))}
          <div className="flex items-center space-x-3 p-2">
            <input
              type="radio"
              name="fundingSource"
              className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => e.target.checked && onChange("fundingSource", "Other")}
            />
            <input
              type="text"
              placeholder="Other (please specify)"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onChange={(e) => onChange("fundingSourceOther", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Reason for Referral */}
      <div className="bg-gradient-to-r from-rose-50 to-red-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-rose-600" />
          Reason for Referral / Supporting Information
        </h4>
        <textarea
          placeholder="Please provide details about the reason for referral and any supporting information..."
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          onChange={(e) => onChange("referralReason", e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center ${
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
            Submit Service Request
          </>
        )}
      </button>
    </form>
  );
};

const ClinicalObservationForm = ({
  onSubmit,
  onChange,
  isSubmitting = false,
}: {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
  isSubmitting?: boolean;
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
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          onChange={(e) => onChange("phone", e.target.value)}
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
      disabled={isSubmitting}
      className={`w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-4 px-6 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center ${
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
          <Eye className="w-5 h-5 mr-2" />
          Request Clinical Observation
        </>
      )}
    </button>
  </form>
);

export default TherapyProgramPage;
