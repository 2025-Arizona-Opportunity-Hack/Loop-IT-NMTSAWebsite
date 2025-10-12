"use client";

import { useState } from 'react';
import { User, Briefcase, MessageSquare, Info } from 'lucide-react';
import { FormWrapper, Input, Select, Textarea, FormSection } from './FormComponents';
import { consultationFormSchema, ConsultationFormData } from '@/lib/forms/schemas';
import { submitConsultationForm } from '@/lib/forms/actions';

const consultationTypes = [
  { value: 'training', label: 'Professional Training or Workshop' },
  { value: 'observation', label: 'Clinical Observation Visit' },
  { value: 'lecture', label: 'Guest Lecture / Presentation' },
  { value: 'research', label: 'Research Collaboration' },
  { value: 'other', label: 'Other' },
];

const formatOptions = [
  { value: 'in-person', label: 'In-person (at NMTSA)' },
  { value: 'virtual', label: 'Virtual (Zoom/Teams)' },
  { value: 'either', label: 'Either' },
];

const previousAttendanceOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

const howDidYouHearOptions = [
  { value: 'website', label: 'NMTSA Website' },
  { value: 'referral', label: 'Referral / Colleague' },
  { value: 'university', label: 'University Program' },
  { value: 'social-media', label: 'Social Media' },
  { value: 'other', label: 'Other' },
];

interface ConsultationFormProps {
  onSuccess?: () => void;
}

export function ConsultationForm({ onSuccess }: ConsultationFormProps = {}) {
  const [consultationType, setConsultationType] = useState('');
  const [howDidYouHear, setHowDidYouHear] = useState('');

  const handleSubmit = async (data: ConsultationFormData) => {
    await submitConsultationForm(data);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <FormWrapper
      schema={consultationFormSchema}
      onSubmit={handleSubmit}
      successMessage="Thank you for your volunteer application! We'll review your information and get back to you within 2-3 business days."
    >
      {(form) => (
        <>
          {/* Section 1: Contact Information */}
          <FormSection
            title="Contact Information"
            description="Please provide your contact details"
            icon={<User className="w-5 h-5 text-nmtsa-500" />}
          >
            <Input
              label="Full Name"
              {...form.register('fullName')}
              error={form.formState.errors.fullName?.message}
              required
              placeholder="John Doe"
            />

            <Input
              label="Organization / Institution"
              {...form.register('organization')}
              error={form.formState.errors.organization?.message}
              required
              placeholder="Arizona State University"
            />

            <Input
              label="Job Title or Role"
              {...form.register('jobTitle')}
              error={form.formState.errors.jobTitle?.message}
              placeholder="Graduate Student, Faculty, Clinical Supervisor, etc."
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                {...form.register('email')}
                error={form.formState.errors.email?.message}
                required
                placeholder="john@example.com"
              />
              <Input
                label="Phone Number"
                type="tel"
                {...form.register('phone')}
                error={form.formState.errors.phone?.message}
                required
                placeholder="(602) 123-4567"
              />
            </div>
          </FormSection>

          {/* Section 2: Consultation Details */}
          <FormSection
            title="Consultation Details"
            description="Tell us about what you're looking for"
            icon={<Briefcase className="w-5 h-5 text-nmtsa-500" />}
          >
            <div className="space-y-4">
              <Select
                label="Type of Consultation Requested"
                {...form.register('consultationType')}
                error={form.formState.errors.consultationType?.message}
                options={consultationTypes}
                required
                onChange={(e) => {
                  form.register('consultationType').onChange(e);
                  setConsultationType(e.target.value);
                }}
              />

              {consultationType === 'other' && (
                <Input
                  label="Please specify the type of consultation"
                  {...form.register('consultationTypeOther')}
                  error={form.formState.errors.consultationTypeOther?.message}
                  placeholder="Describe the type of consultation you need"
                />
              )}
            </div>

            <Textarea
              label="Briefly describe what you are seeking to learn or accomplish through this consultation"
              {...form.register('description')}
              error={form.formState.errors.description?.message}
              required
              rows={5}
              placeholder="Please provide details about your learning objectives, goals, or what you hope to accomplish..."
            />

            <Select
              label="Preferred format"
              {...form.register('preferredFormat')}
              error={form.formState.errors.preferredFormat?.message}
              options={formatOptions}
              required
            />

            <Input
              label="Preferred date(s) or time frame for consultation"
              {...form.register('preferredDates')}
              error={form.formState.errors.preferredDates?.message}
              placeholder="e.g., Week of January 15th, 2024 or Flexible - Tuesdays/Thursdays"
            />

            <Input
              label="Estimated number of participants (if group)"
              {...form.register('estimatedParticipants')}
              error={form.formState.errors.estimatedParticipants?.message}
              placeholder="e.g., 5-10 graduate students"
            />
          </FormSection>

          {/* Section 3: Additional Information */}
          <FormSection
            title="Additional Information"
            description="Help us better understand your needs"
            icon={<Info className="w-5 h-5 text-nmtsa-500" />}
          >
            <Select
              label="Have you previously attended any NMTSA trainings or events?"
              {...form.register('previousAttendance')}
              error={form.formState.errors.previousAttendance?.message}
              options={previousAttendanceOptions}
              required
            />

            <div className="space-y-4">
              <Select
                label="How did you hear about this consultation opportunity?"
                {...form.register('howDidYouHear')}
                error={form.formState.errors.howDidYouHear?.message}
                options={howDidYouHearOptions}
                required
                onChange={(e) => {
                  form.register('howDidYouHear').onChange(e);
                  setHowDidYouHear(e.target.value);
                }}
              />

              {howDidYouHear === 'other' && (
                <Input
                  label="Please specify how you heard about us"
                  {...form.register('howDidYouHearOther')}
                  error={form.formState.errors.howDidYouHearOther?.message}
                  placeholder="Tell us how you found out about this opportunity"
                />
              )}
            </div>

            <Textarea
              label="Additional notes or questions"
              {...form.register('additionalNotes')}
              error={form.formState.errors.additionalNotes?.message}
              rows={4}
              placeholder="Any other information, specific requests, or questions you'd like to share..."
            />
          </FormSection>
        </>
      )}
    </FormWrapper>
  );
}
