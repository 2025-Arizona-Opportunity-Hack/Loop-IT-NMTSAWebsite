// Enhanced Volunteer Application Form Component
import { useState } from "react";
import { CheckCircle, X, User, Phone, Mail, MapPin, Heart, Users as UsersIcon, Calendar } from "lucide-react";
import { FormSection, TextInput, Textarea, Grid, SubmitButton, CheckboxGroup } from "@/components/programs";

export const VolunteerApplicationForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    
    // Address
    street: "",
    city: "",
    state: "",
    zip: "",
    
    // Emergency Contact
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelationship: "",
    
    // Skills & Interests
    skills: [] as string[],
    skillsOther: "",
    interests: [] as string[],
    interestsOther: "",
    
    // Availability
    availableDays: [] as string[],
    availableTimes: "",
    
    // Motivation
    reasonForVolunteering: "",
    previousExperience: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Prepare skills array
      const skills = [...formData.skills];
      if (formData.skillsOther && formData.skills.includes("other")) {
        skills.push(formData.skillsOther);
      }

      // Prepare interests array
      const interests = [...formData.interests];
      if (formData.interestsOther && formData.interests.includes("other")) {
        interests.push(formData.interestsOther);
      }

      const applicationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth || null,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
        },
        emergency_contact: {
          name: formData.emergencyName,
          phone: formData.emergencyPhone,
          relationship: formData.emergencyRelationship,
        },
        skills: skills.filter(s => s !== "other"),
        interests: interests.filter(i => i !== "other"),
        availability: {
          days: formData.availableDays,
          times: formData.availableTimes,
        },
        reason_for_volunteering: formData.reasonForVolunteering,
        previous_volunteer_experience: formData.previousExperience,
      };

      const response = await fetch("/api/volunteers/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit application");
      }

      setSubmitSuccess(true);

      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(
        error instanceof Error ? error.message : "An error occurred. Please try again."
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
            <h4 className="font-semibold text-green-900">Application Submitted!</h4>
            <p className="text-sm text-green-700">
              Thank you for your volunteer application! We&apos;ll review your information and contact you within 3-5 business days.
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

      {/* Personal Information */}
      <FormSection
        title="Personal Information"
        icon={User}
        iconColor="text-red-600"
        bgGradient="from-red-50 to-pink-50"
      >
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(value) => handleChange("name", value)}
          required
        />

        <Grid columns={3}>
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
          <TextInput
            label="Date of Birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(value) => handleChange("dateOfBirth", value)}
          />
        </Grid>
      </FormSection>

      {/* Address */}
      <FormSection
        title="Address"
        icon={MapPin}
        iconColor="text-blue-600"
        bgGradient="from-blue-50 to-indigo-50"
      >
        <TextInput
          label="Street Address"
          placeholder="123 Main Street"
          value={formData.street}
          onChange={(value) => handleChange("street", value)}
        />
        <Grid columns={3}>
          <TextInput
            label="City"
            placeholder="Phoenix"
            value={formData.city}
            onChange={(value) => handleChange("city", value)}
          />
          <TextInput
            label="State"
            placeholder="AZ"
            value={formData.state}
            onChange={(value) => handleChange("state", value)}
          />
          <TextInput
            label="ZIP Code"
            placeholder="85001"
            value={formData.zip}
            onChange={(value) => handleChange("zip", value)}
          />
        </Grid>
      </FormSection>

      {/* Emergency Contact */}
      <FormSection
        title="Emergency Contact"
        icon={Phone}
        iconColor="text-orange-600"
        bgGradient="from-orange-50 to-amber-50"
      >
        <Grid columns={3}>
          <TextInput
            label="Emergency Contact Name"
            placeholder="Full name"
            value={formData.emergencyName}
            onChange={(value) => handleChange("emergencyName", value)}
            required
          />
          <TextInput
            label="Phone Number"
            type="tel"
            placeholder="(602) 123-4567"
            value={formData.emergencyPhone}
            onChange={(value) => handleChange("emergencyPhone", value)}
            required
          />
          <TextInput
            label="Relationship"
            placeholder="e.g., Spouse, Parent"
            value={formData.emergencyRelationship}
            onChange={(value) => handleChange("emergencyRelationship", value)}
            required
          />
        </Grid>
      </FormSection>

      {/* Skills & Interests */}
      <FormSection
        title="Skills & Interests"
        icon={Heart}
        iconColor="text-purple-600"
        bgGradient="from-purple-50 to-pink-50"
      >
        <div className="space-y-4">
          <CheckboxGroup
            label="What skills can you offer?"
            options={[
              { value: "music", label: "Music/Musical Instruments" },
              { value: "admin", label: "Administrative Support" },
              { value: "event", label: "Event Planning" },
              { value: "marketing", label: "Marketing/Social Media" },
              { value: "fundraising", label: "Fundraising" },
              { value: "tech", label: "Technology/IT" },
              { value: "other", label: "Other" },
            ]}
            selectedValues={formData.skills}
            onChange={(values) => handleChange("skills", values)}
            columns={2}
          />

          {formData.skills.includes("other") && (
            <TextInput
              placeholder="Please specify other skills"
              value={formData.skillsOther}
              onChange={(value) => handleChange("skillsOther", value)}
            />
          )}

          <CheckboxGroup
            label="Areas of Interest"
            options={[
              { value: "client-interaction", label: "Client Interaction" },
              { value: "community-outreach", label: "Community Outreach" },
              { value: "office-support", label: "Office Support" },
              { value: "events", label: "Events & Programs" },
              { value: "research", label: "Research & Data" },
              { value: "other", label: "Other" },
            ]}
            selectedValues={formData.interests}
            onChange={(values) => handleChange("interests", values)}
            columns={2}
          />

          {formData.interests.includes("other") && (
            <TextInput
              placeholder="Please specify other interests"
              value={formData.interestsOther}
              onChange={(value) => handleChange("interestsOther", value)}
            />
          )}
        </div>
      </FormSection>

      {/* Availability */}
      <FormSection
        title="Availability"
        icon={Calendar}
        iconColor="text-green-600"
        bgGradient="from-green-50 to-emerald-50"
      >
        <CheckboxGroup
          label="Available Days"
          options={[
            { value: "monday", label: "Monday" },
            { value: "tuesday", label: "Tuesday" },
            { value: "wednesday", label: "Wednesday" },
            { value: "thursday", label: "Thursday" },
            { value: "friday", label: "Friday" },
            { value: "saturday", label: "Saturday" },
            { value: "sunday", label: "Sunday" },
          ]}
          selectedValues={formData.availableDays}
          onChange={(values) => handleChange("availableDays", values)}
          required
          columns={3}
        />

        <Textarea
          label="Preferred Times"
          placeholder="e.g., Mornings 9am-12pm, Evenings after 5pm"
          rows={2}
          value={formData.availableTimes}
          onChange={(value) => handleChange("availableTimes", value)}
          required
        />
      </FormSection>

      {/* Motivation */}
      <FormSection
        title="Tell Us About Yourself"
        icon={UsersIcon}
        iconColor="text-indigo-600"
        bgGradient="from-indigo-50 to-purple-50"
      >
        <Textarea
          label="Why do you want to volunteer with NMTSA?"
          placeholder="Share your motivation and what draws you to our mission..."
          rows={4}
          value={formData.reasonForVolunteering}
          onChange={(value) => handleChange("reasonForVolunteering", value)}
          required
        />

        <Textarea
          label="Do you have any previous volunteer experience?"
          placeholder="Describe any relevant volunteer work (optional)..."
          rows={3}
          value={formData.previousExperience}
          onChange={(value) => handleChange("previousExperience", value)}
        />
      </FormSection>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-900">
          <strong>Note:</strong> A background check will be required for all volunteers. We&apos;ll provide details about this process once your application is reviewed.
        </p>
      </div>

      <SubmitButton
        isSubmitting={isSubmitting}
        text="Submit Volunteer Application"
        submittingText="Submitting..."
      />
    </form>
  );
};
